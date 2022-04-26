import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from 'src/model/user.entity';
import { Nft, NftDocument } from '../model/nft.entity';
import { CreateNftInput } from './input/create-nft.input';
import { GetNftsInput } from './input/get-nfts.input';

@Resolver(() => Nft)
export class NftResolver {
  constructor(
    @InjectModel(Nft.name) private nfts: Model<NftDocument>,
    @InjectModel(User.name) private users: Model<UserDocument>,
  ) {}

  @Query(() => Nft)
  async getNft(@Args('id') id: string): Promise<Nft> {
    const found = await this.nfts
      .findById(id)
      .populate('bids')
      .populate('author')
      .exec();
    if (!found) {
      throw new NotFoundException(`Couldn't find entity with id ${id}`);
    }
    return found;
  }

  @Query(() => [Nft])
  getNfts(
    @Args('filter', { nullable: true }) filter: GetNftsInput = {},
  ): Promise<Nft[]> {
    return this.nfts.find(filter).populate('bids').populate('author').exec();
  }

  @Mutation(() => Nft)
  async createNft(
    @Args('data') { authorAccount, startingPrice, ...data }: CreateNftInput,
  ): Promise<Nft> {
    const user = await this.ensureUser(authorAccount);
    return this.nfts.create({
      ...data,
      startingPrice: startingPrice ?? 0,
      _id: new Types.ObjectId(),
      author: user._id,
    });
  }

  private async ensureUser(account: string): Promise<User> {
    const user = await this.users.findOne({ account });
    if (user) return user;
    return await this.users.create({
      _id: new Types.ObjectId(),
      account,
    });
  }
}
