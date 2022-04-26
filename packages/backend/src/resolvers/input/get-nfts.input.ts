import { Field, InputType } from '@nestjs/graphql';
import { Category } from '../../model/category.enum';

@InputType()
export class GetNftsInput {
  @Field(() => Category, { nullable: true })
  category?: Category;
}
