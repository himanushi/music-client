import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** An ISO 8601-encoded datetime */
  ISO8601DateTime: any;
  /** 正の整数 */
  PositiveNumber: any;
  /** Hex Timestamps and crypt Table name ID */
  TTID: any;
};

/** アルバム */
export type Album = {
   __typename?: 'Album';
  /** Apple Music アルバム */
  appleMusicAlbum?: Maybe<AppleMusicAlbum>;
  /** 大型アートワーク */
  artworkL?: Maybe<Artwork>;
  /** 中型アートワーク */
  artworkM?: Maybe<Artwork>;
  /** 追加日 */
  createdAt: Scalars['ISO8601DateTime'];
  /** ID */
  id: Scalars['TTID'];
  /** タイトル */
  name: Scalars['String'];
  /** 発売日 */
  releaseDate: Scalars['ISO8601DateTime'];
  /** Spotify アルバム */
  spotifyAlbum?: Maybe<SpotifyAlbum>;
  /** トラック数 */
  totalTracks: Scalars['PositiveNumber'];
};

export enum AlbumsQueryOrder {
  /** 名前順 */
  Name = 'NAME',
  /** 新しい順 */
  New = 'NEW'
}

/** Apple Music アルバム */
export type AppleMusicAlbum = {
   __typename?: 'AppleMusicAlbum';
  /** Apple Music ID */
  appleMusicId: Scalars['String'];
  /** ID */
  id: Scalars['TTID'];
  /** タイトル */
  name: Scalars['String'];
};

/** アートワーク */
export type Artwork = {
   __typename?: 'Artwork';
  /** 高さ */
  height?: Maybe<Scalars['PositiveNumber']>;
  /** URL */
  url?: Maybe<Scalars['String']>;
  /** 幅 */
  width?: Maybe<Scalars['PositiveNumber']>;
};



export type Query = {
   __typename?: 'Query';
  /** アルバム一覧取得 */
  albums: Array<Album>;
};


export type QueryAlbumsArgs = {
  first?: Maybe<Scalars['PositiveNumber']>;
  offset?: Maybe<Scalars['PositiveNumber']>;
  asc?: Maybe<Scalars['Boolean']>;
  order: AlbumsQueryOrder;
};

/** Spotify アルバム */
export type SpotifyAlbum = {
   __typename?: 'SpotifyAlbum';
  /** ID */
  id: Scalars['TTID'];
  /** タイトル */
  name: Scalars['String'];
  /** Spotify ID */
  spotifyId: Scalars['String'];
};


export type AlbumsQueryVariables = {};


export type AlbumsQuery = (
  { __typename?: 'Query' }
  & { albums: Array<(
    { __typename?: 'Album' }
    & Pick<Album, 'id' | 'totalTracks' | 'name' | 'releaseDate'>
    & { artworkL?: Maybe<(
      { __typename?: 'Artwork' }
      & Pick<Artwork, 'url' | 'width' | 'height'>
    )>, artworkM?: Maybe<(
      { __typename?: 'Artwork' }
      & Pick<Artwork, 'url' | 'width' | 'height'>
    )>, appleMusicAlbum?: Maybe<(
      { __typename?: 'AppleMusicAlbum' }
      & Pick<AppleMusicAlbum, 'id' | 'appleMusicId'>
    )>, spotifyAlbum?: Maybe<(
      { __typename?: 'SpotifyAlbum' }
      & Pick<SpotifyAlbum, 'id' | 'spotifyId'>
    )> }
  )> }
);


export const AlbumsDocument = gql`
    query Albums {
  albums(order: NEW, first: 100, asc: true) {
    id
    totalTracks
    name
    releaseDate
    artworkL {
      url
      width
      height
    }
    artworkM {
      url
      width
      height
    }
    appleMusicAlbum {
      id
      appleMusicId
    }
    spotifyAlbum {
      id
      spotifyId
    }
  }
}
    `;
export type AlbumsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<AlbumsQuery, AlbumsQueryVariables>, 'query'>;

    export const AlbumsComponent = (props: AlbumsComponentProps) => (
      <ApolloReactComponents.Query<AlbumsQuery, AlbumsQueryVariables> query={AlbumsDocument} {...props} />
    );
    
export type AlbumsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<AlbumsQuery, AlbumsQueryVariables>
    } & TChildProps;
export function withAlbums<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AlbumsQuery,
  AlbumsQueryVariables,
  AlbumsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, AlbumsQuery, AlbumsQueryVariables, AlbumsProps<TChildProps, TDataName>>(AlbumsDocument, {
      alias: 'albums',
      ...operationOptions
    });
};
export type AlbumsQueryResult = ApolloReactCommon.QueryResult<AlbumsQuery, AlbumsQueryVariables>;