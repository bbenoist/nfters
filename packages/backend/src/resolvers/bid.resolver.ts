import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose';
import { DateTime } from 'luxon';
import { Model, Types } from 'mongoose';
import { Bid, BidDocument } from '../model/bid.entity';
import { Nft, NftDocument } from '../model/nft.entity';

@Resolver(() => Bid)
export class BidResolver {
  constructor(
    @InjectModel(Bid.name) private bids: Model<BidDocument>,
    @InjectModel(Nft.name) private nfts: Model<NftDocument>,
  ) {}

  @Query(() => Bid)
  async getBid(@Args('id') id: string): Promise<Bid> {
    const found = await this.bids.findById(id).exec();
    if (!found) {
      throw new NotFoundException(`Couldn't find entity with id ${id}`);
    }
    return found;
  }

  @Query(() => [Bid])
  async getBids(): Promise<Bid[]> {
    return this.bids.find().exec();
  }

  @Mutation(() => Bid)
  async placeBid(
    @Args('nft') nftId: string,
    @Args('value') newValue: number,
  ): Promise<Bid> {
    const nft = await this.nfts.findById(nftId).populate('bids');
    if (!nft) {
      throw new BadRequestException(`Couldn't find NFT with id ${nftId}`);
    }
    const isClosed = DateTime.fromJSDate(nft.end).diffNow().toMillis() <= 0;
    if (isClosed) {
      throw new BadRequestException('Bids are closed for this NFT');
    }
    const currentValue = nft.bids.reduce(
      (max, { value }) => (value > max ? value : max),
      nft.startingPrice ?? 0,
    );
    if (currentValue >= newValue) {
      const msg = `Bid value should be greater than ${currentValue}`;
      throw new ForbiddenException(msg);
    }
    const bid = await this.bids.create({
      _id: new Types.ObjectId(),
      nft: new Types.ObjectId(nftId),
      value: newValue,
    });
    const result = await this.nfts.updateOne(
      { _id: nftId },
      { $push: { bids: new Types.ObjectId(bid._id) } },
    );
    if (result.modifiedCount === 0) {
      throw new Error(`Couldn't update nft ${nftId}`);
    }
    return bid;
  }
}
