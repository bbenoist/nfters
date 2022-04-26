import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../model/user.entity';

@Resolver(() => User)
export class UserResolver {
  constructor(@InjectModel(User.name) private user: Model<UserDocument>) {}

  @Query(() => User)
  async getUser(@Args('id') id: string): Promise<User> {
    const found = await this.user.findById(id).exec();
    if (!found) {
      throw new NotFoundException(`Couldn't find entity with id ${id}`);
    }
    return found;
  }

  @Query(() => [User])
  getUsers(): Promise<User[]> {
    return this.user.find().populate('bids').exec();
  }
}
