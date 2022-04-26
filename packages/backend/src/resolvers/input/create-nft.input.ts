import { Field, InputType, PickType } from '@nestjs/graphql';
import { Nft } from '../../model/nft.entity';

@InputType()
export class CreateNftInput extends PickType(
  Nft,
  ['title', 'imageUrl', 'category', 'startingPrice', 'end'] as const,
  InputType,
) {
  @Field({ nullable: true })
  startingPrice?: number;

  @Field()
  authorAccount!: string;
}
