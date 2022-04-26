import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Min } from 'class-validator';
import { Document } from 'mongoose';

@ObjectType()
@Schema()
export class Bid {
  @Field()
  @Prop()
  _id!: string;

  @Field()
  @Prop({ required: true })
  @Min(0)
  value!: number;
}

export type BidDocument = Bid & Document;

export const BidSchema = SchemaFactory.createForClass(Bid);
