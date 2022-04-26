import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsDate, IsNotEmpty, IsUrl, Min } from 'class-validator';
import { Document, Types } from 'mongoose';
import { Bid } from './bid.entity';
import { Category } from './category.enum';
import { User } from './user.entity';

@ObjectType()
@Schema()
export class Nft {
  @Field()
  @Prop()
  _id!: string;

  @Field()
  @Prop({ required: true })
  @IsNotEmpty()
  title!: string;

  @Field(() => User)
  @Prop({ required: true, type: Types.ObjectId, ref: User.name })
  author!: User;

  @Field(() => Date)
  @Prop({ required: true })
  @IsDate()
  end!: Date;

  @Field()
  @Prop({ required: true })
  @IsUrl()
  imageUrl!: string;

  @Field(() => Category)
  @Prop({ required: true })
  category!: Category;

  @Field({ nullable: true })
  @Min(0)
  @Prop()
  startingPrice?: number;

  @Field(() => [Bid])
  @Prop({ required: true, type: [Types.ObjectId], ref: Bid.name })
  bids!: Bid[];
}

export type NftDocument = Nft & Document;

export const NftSchema = SchemaFactory.createForClass(Nft);
