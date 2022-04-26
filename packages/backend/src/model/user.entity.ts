import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEthereumAddress, IsUrl } from 'class-validator';

@ObjectType()
@Schema()
export class User {
  @Field()
  @Prop()
  _id!: string;

  @Field()
  @Prop({ required: true })
  @IsEthereumAddress()
  account!: string;

  @Field({ nullable: true })
  @Prop()
  name?: string;

  @Field({ nullable: true })
  @Prop()
  @IsUrl()
  image?: string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
