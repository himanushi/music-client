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
  /** Table id and hex Timestamp and hex ID */
  TTID: any;
};

/** アルバム */
export type Album = {
   __typename?: 'Album';
  /** Apple Music アルバム */
  appleMusicAlbum?: Maybe<AppleMusicAlbum>;
  /** 大型アートワーク */
  artworkL: Artwork;
  /** 中型アートワーク */
  artworkM: Artwork;
  /** 追加日 */
  createdAt: Scalars['ISO8601DateTime'];
  /** ID */
  id: Scalars['TTID'];
  /** iTunes アルバム */
  itunesAlbum?: Maybe<AppleMusicAlbum>;
  /** タイトル */
  name: Scalars['String'];
  /** 発売日 */
  releaseDate: Scalars['ISO8601DateTime'];
  /** Spotify アルバム */
  spotifyAlbum?: Maybe<SpotifyAlbum>;
  /** トラック数 */
  totalTracks: Scalars['PositiveNumber'];
  /** トラック */
  tracks?: Maybe<Array<Track>>;
};

export enum AlbumsQueryOrder {
  /** 名前順 */
  Name = 'NAME',
  /** 新しい順 */
  New = 'NEW',
  /** 発売日順 */
  Release = 'RELEASE'
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
  /** アルバム情報取得 */
  album?: Maybe<Album>;
  /** アルバム一覧取得 */
  albums: Array<Album>;
};


export type QueryAlbumArgs = {
  id: Scalars['TTID'];
};


export type QueryAlbumsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['PositiveNumber']>;
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


/** トラック */
export type Track = {
   __typename?: 'Track';
  /** ID */
  id: Scalars['TTID'];
  /** 国際標準レコーディングコード */
  isrc: Scalars['String'];
  /** タイトル */
  name: Scalars['String'];
};

export type AlbumQueryVariables = {
  id: Scalars['TTID'];
};


export type AlbumQuery = (
  { __typename?: 'Query' }
  & { album?: Maybe<(
    { __typename?: 'Album' }
    & Pick<Album, 'id' | 'totalTracks' | 'name' | 'releaseDate'>
    & { artworkL: (
      { __typename?: 'Artwork' }
      & Pick<Artwork, 'url' | 'width' | 'height'>
    ), artworkM: (
      { __typename?: 'Artwork' }
      & Pick<Artwork, 'url' | 'width' | 'height'>
    ), appleMusicAlbum?: Maybe<(
      { __typename?: 'AppleMusicAlbum' }
      & Pick<AppleMusicAlbum, 'id' | 'appleMusicId'>
    )>, itunesAlbum?: Maybe<(
      { __typename?: 'AppleMusicAlbum' }
      & Pick<AppleMusicAlbum, 'id' | 'appleMusicId'>
    )>, spotifyAlbum?: Maybe<(
      { __typename?: 'SpotifyAlbum' }
      & Pick<SpotifyAlbum, 'id' | 'spotifyId'>
    )> }
  )> }
);

export type AlbumsQueryVariables = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['PositiveNumber']>;
};


export type AlbumsQuery = (
  { __typename?: 'Query' }
  & { albums: Array<(
    { __typename?: 'Album' }
    & Pick<Album, 'id' | 'totalTracks' | 'name' | 'releaseDate'>
    & { artworkL: (
      { __typename?: 'Artwork' }
      & Pick<Artwork, 'url' | 'width' | 'height'>
    ), artworkM: (
      { __typename?: 'Artwork' }
      & Pick<Artwork, 'url' | 'width' | 'height'>
    ), appleMusicAlbum?: Maybe<(
      { __typename?: 'AppleMusicAlbum' }
      & Pick<AppleMusicAlbum, 'id' | 'appleMusicId'>
    )>, itunesAlbum?: Maybe<(
      { __typename?: 'AppleMusicAlbum' }
      & Pick<AppleMusicAlbum, 'id' | 'appleMusicId'>
    )>, spotifyAlbum?: Maybe<(
      { __typename?: 'SpotifyAlbum' }
      & Pick<SpotifyAlbum, 'id' | 'spotifyId'>
    )> }
  )> }
);


export const AlbumDocument = gql`
    query Album($id: TTID!) {
  album(id: $id) {
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
    itunesAlbum {
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
export type AlbumComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<AlbumQuery, AlbumQueryVariables>, 'query'> & ({ variables: AlbumQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const AlbumComponent = (props: AlbumComponentProps) => (
      <ApolloReactComponents.Query<AlbumQuery, AlbumQueryVariables> query={AlbumDocument} {...props} />
    );
    
export type AlbumProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<AlbumQuery, AlbumQueryVariables>
    } & TChildProps;
export function withAlbum<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AlbumQuery,
  AlbumQueryVariables,
  AlbumProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, AlbumQuery, AlbumQueryVariables, AlbumProps<TChildProps, TDataName>>(AlbumDocument, {
      alias: 'album',
      ...operationOptions
    });
};
export type AlbumQueryResult = ApolloReactCommon.QueryResult<AlbumQuery, AlbumQueryVariables>;
export const AlbumsDocument = gql`
    query Albums($offset: Int, $limit: PositiveNumber) {
  albums(offset: $offset, limit: $limit, order: RELEASE, asc: true) {
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
    itunesAlbum {
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