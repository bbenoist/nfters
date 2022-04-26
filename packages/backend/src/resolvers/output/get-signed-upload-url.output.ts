import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GetSignedUploadUrlOutput {
  @Field()
  uploadUrl!: string;

  @Field()
  downloadUrl!: string;
}
