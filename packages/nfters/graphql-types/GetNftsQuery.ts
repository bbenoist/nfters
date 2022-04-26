/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Category } from './globalTypes';

// ====================================================
// GraphQL query operation: GetNftsQuery
// ====================================================

export interface GetNftsQuery_getNfts_author {
  name: string | null;
  image: string | null;
  account: string;
}

export interface GetNftsQuery_getNfts_bids {
  value: number;
}

export interface GetNftsQuery_getNfts {
  _id: string;
  imageUrl: string;
  title: string;
  author: GetNftsQuery_getNfts_author;
  end: any;
  startingPrice: number | null;
  bids: GetNftsQuery_getNfts_bids[];
}

export interface GetNftsQuery {
  getNfts: GetNftsQuery_getNfts[];
}

export interface GetNftsQueryVariables {
  category?: Category | null;
}
