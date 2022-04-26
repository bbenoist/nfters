import { Field, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { IsNotEmpty, IsPositive, IsUrl } from 'class-validator';
import { User } from './user.entity';
import { Nft } from './nft.entity';

@ObjectType()
export class Collection {
  @Field()
  @Prop()
  _id!: string;

  @Field()
  @IsNotEmpty()
  name!: string;

  @Field()
  @IsUrl()
  image!: string;

  @Field()
  verified?: boolean;

  @Field()
  @IsPositive()
  value!: number;

  @Field()
  evolution!: number;

  @Field(() => [Nft], { nullable: true, defaultValue: [] })
  nfts!: Nft[];

  @Field()
  owner!: User;
}
