import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.entity';
import { Bid, BidSchema } from './bid.entity';
import { Collection } from './collection.entity';
import { Nft, NftSchema } from './nft.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Nft.name, schema: NftSchema },
      { name: Bid.name, schema: BidSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [Bid, Collection, User, Nft],
  exports: [MongooseModule],
})
export class ModelModule {}
