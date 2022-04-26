import { Module } from '@nestjs/common';
import { ModelModule } from '../model/model.module';
import { S3Resolver } from './s3.resolver';
import { NftResolver } from './nft.resolver';
import { BidResolver } from './bid.resolver';

@Module({
  imports: [ModelModule],
  providers: [NftResolver, BidResolver, S3Resolver],
})
export class ResolversModule {}
