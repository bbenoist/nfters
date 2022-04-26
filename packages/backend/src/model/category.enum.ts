import { registerEnumType } from '@nestjs/graphql';

export enum Category {
  art = 'art',
  celebrities = 'celebrities',
  gaming = 'gaming',
  sport = 'sport',
  music = 'music',
  crypto = 'crypto',
}

registerEnumType(Category, { name: 'Category' });
