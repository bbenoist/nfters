import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Mutation, Resolver } from '@nestjs/graphql';
import { v4 as uuid } from 'uuid';
import { GetSignedUploadUrlOutput } from './output/get-signed-upload-url.output';

const S3_REGION = process.env.S3_REGION || 'eu-west-3';

const S3_BUCKET = process.env.S3_BUCKET || 'nfters';

@Resolver('S3')
export class S3Resolver {
  // Create an Amazon S3 service client object.
  private s3 = new S3Client({ region: S3_REGION });

  @Mutation(() => GetSignedUploadUrlOutput)
  async getSignedUploadUrl(): Promise<GetSignedUploadUrlOutput> {
    const key = uuid();
    const command = new PutObjectCommand({ Bucket: S3_BUCKET, Key: key });
    const uploadUrl = await getSignedUrl(this.s3, command, {
      expiresIn: 3600,
    });
    const downloadUrl = `https://${S3_BUCKET}.s3.amazonaws.com/${key}`;
    return { uploadUrl, downloadUrl };
  }
}
