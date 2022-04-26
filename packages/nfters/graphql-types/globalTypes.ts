/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum Category {
  art = 'art',
  celebrities = 'celebrities',
  crypto = 'crypto',
  gaming = 'gaming',
  music = 'music',
  sport = 'sport'
}

export interface CreateNftInput {
  title: string;
  end: any;
  imageUrl: string;
  category: Category;
  startingPrice?: number | null;
  authorAccount: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
