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

export type AlbumsConditions = {
  /** アーティストID */
  artists?: Maybe<IdInputObject>;
};

export enum AlbumsQueryOrder {
  /** 名前順 */
  Name = 'NAME',
  /** 新しい順 */
  New = 'NEW',
  /** 発売日順 */
  Release = 'RELEASE',
  /** 人気順 */
  Popularity = 'POPULARITY',
  /** トラック数順 */
  TotalTracks = 'TOTAL_TRACKS'
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

/** Apple Music アーティスト */
export type AppleMusicArtist = {
   __typename?: 'AppleMusicArtist';
  /** Apple Music ID */
  appleMusicId: Scalars['String'];
  /** ID */
  id: Scalars['TTID'];
  /** タイトル */
  name: Scalars['String'];
};

/** アーティスト */
export type Artist = {
   __typename?: 'Artist';
  /** 関連アルバム */
  albums?: Maybe<Array<Album>>;
  /** Apple Music アルバム */
  appleMusicArtists?: Maybe<Array<AppleMusicArtist>>;
  /** 大型アートワーク */
  artworkL: Artwork;
  /** 中型アートワーク */
  artworkM: Artwork;
  /** 追加日 */
  createdAt: Scalars['ISO8601DateTime'];
  /** ID */
  id: Scalars['TTID'];
  /** 名前 */
  name: Scalars['String'];
  /** 発売日 */
  releaseDate: Scalars['ISO8601DateTime'];
  /** Spotify アルバム */
  spotifyArtists?: Maybe<Array<AppleMusicAlbum>>;
  /** 関連曲 */
  tracks?: Maybe<Array<Track>>;
};

export enum ArtistsQueryOrder {
  /** 新しい順 */
  New = 'NEW',
  /** 人気順 */
  Popularity = 'POPULARITY'
}

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


export type IdInputObject = {
  /** ID */
  id?: Maybe<Array<Scalars['TTID']>>;
};


export type Query = {
   __typename?: 'Query';
  /** アルバム情報取得 */
  album?: Maybe<Album>;
  /** アルバム一覧取得 */
  albums: Array<Album>;
  /** アーティスト取得 */
  artist?: Maybe<Artist>;
  /** アーティスト一覧取得 */
  artists: Array<Artist>;
};


export type QueryAlbumArgs = {
  id: Scalars['TTID'];
};


export type QueryAlbumsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['PositiveNumber']>;
  asc?: Maybe<Scalars['Boolean']>;
  conditions?: Maybe<AlbumsConditions>;
  order: AlbumsQueryOrder;
};


export type QueryArtistArgs = {
  id: Scalars['TTID'];
};


export type QueryArtistsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['PositiveNumber']>;
  asc?: Maybe<Scalars['Boolean']>;
  order?: Maybe<ArtistsQueryOrder>;
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
  conditions?: Maybe<AlbumsConditions>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['PositiveNumber']>;
  order: AlbumsQueryOrder;
  asc?: Maybe<Scalars['Boolean']>;
};


export type AlbumsQuery = (
  { __typename?: 'Query' }
  & { items: Array<(
    { __typename?: 'Album' }
    & Pick<Album, 'id'>
    & { artworkM: (
      { __typename?: 'Artwork' }
      & Pick<Artwork, 'url' | 'width' | 'height'>
    ), appleMusicAlbum?: Maybe<(
      { __typename?: 'AppleMusicAlbum' }
      & Pick<AppleMusicAlbum, 'id'>
    )>, itunesAlbum?: Maybe<(
      { __typename?: 'AppleMusicAlbum' }
      & Pick<AppleMusicAlbum, 'id'>
    )>, spotifyAlbum?: Maybe<(
      { __typename?: 'SpotifyAlbum' }
      & Pick<SpotifyAlbum, 'id'>
    )> }
  )> }
);

export type ArtistQueryVariables = {
  id: Scalars['TTID'];
};


export type ArtistQuery = (
  { __typename?: 'Query' }
  & { artist?: Maybe<(
    { __typename?: 'Artist' }
    & Pick<Artist, 'id' | 'name'>
    & { appleMusicArtists?: Maybe<Array<(
      { __typename?: 'AppleMusicArtist' }
      & Pick<AppleMusicArtist, 'id'>
    )>>, spotifyArtists?: Maybe<Array<(
      { __typename?: 'AppleMusicAlbum' }
      & Pick<AppleMusicAlbum, 'id'>
    )>>, artworkL: (
      { __typename?: 'Artwork' }
      & Pick<Artwork, 'url' | 'width' | 'height'>
    ) }
  )> }
);

export type ArtistsQueryVariables = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['PositiveNumber']>;
  order: ArtistsQueryOrder;
  asc?: Maybe<Scalars['Boolean']>;
};


export type ArtistsQuery = (
  { __typename?: 'Query' }
  & { items: Array<(
    { __typename?: 'Artist' }
    & Pick<Artist, 'id' | 'name'>
    & { artworkL: (
      { __typename?: 'Artwork' }
      & Pick<Artwork, 'url' | 'width' | 'height'>
    ), artworkM: (
      { __typename?: 'Artwork' }
      & Pick<Artwork, 'url' | 'width' | 'height'>
    ) }
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
    query Albums($conditions: AlbumsConditions, $offset: Int, $limit: PositiveNumber, $order: AlbumsQueryOrder!, $asc: Boolean) {
  items: albums(conditions: $conditions, offset: $offset, limit: $limit, order: $order, asc: $asc) {
    id
    artworkM {
      url
      width
      height
    }
    appleMusicAlbum {
      id
    }
    itunesAlbum {
      id
    }
    spotifyAlbum {
      id
    }
  }
}
    `;
export type AlbumsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<AlbumsQuery, AlbumsQueryVariables>, 'query'> & ({ variables: AlbumsQueryVariables; skip?: boolean; } | { skip: boolean; });

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
export const ArtistDocument = gql`
    query Artist($id: TTID!) {
  artist(id: $id) {
    id
    name
    appleMusicArtists {
      id
    }
    spotifyArtists {
      id
    }
    artworkL {
      url
      width
      height
    }
  }
}
    `;
export type ArtistComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<ArtistQuery, ArtistQueryVariables>, 'query'> & ({ variables: ArtistQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const ArtistComponent = (props: ArtistComponentProps) => (
      <ApolloReactComponents.Query<ArtistQuery, ArtistQueryVariables> query={ArtistDocument} {...props} />
    );
    
export type ArtistProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<ArtistQuery, ArtistQueryVariables>
    } & TChildProps;
export function withArtist<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ArtistQuery,
  ArtistQueryVariables,
  ArtistProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, ArtistQuery, ArtistQueryVariables, ArtistProps<TChildProps, TDataName>>(ArtistDocument, {
      alias: 'artist',
      ...operationOptions
    });
};
export type ArtistQueryResult = ApolloReactCommon.QueryResult<ArtistQuery, ArtistQueryVariables>;
export const ArtistsDocument = gql`
    query Artists($offset: Int, $limit: PositiveNumber, $order: ArtistsQueryOrder!, $asc: Boolean) {
  items: artists(offset: $offset, limit: $limit, order: $order, asc: $asc) {
    id
    name
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
  }
}
    `;
export type ArtistsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<ArtistsQuery, ArtistsQueryVariables>, 'query'> & ({ variables: ArtistsQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const ArtistsComponent = (props: ArtistsComponentProps) => (
      <ApolloReactComponents.Query<ArtistsQuery, ArtistsQueryVariables> query={ArtistsDocument} {...props} />
    );
    
export type ArtistsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<ArtistsQuery, ArtistsQueryVariables>
    } & TChildProps;
export function withArtists<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ArtistsQuery,
  ArtistsQueryVariables,
  ArtistsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, ArtistsQuery, ArtistsQueryVariables, ArtistsProps<TChildProps, TDataName>>(ArtistsDocument, {
      alias: 'artists',
      ...operationOptions
    });
};
export type ArtistsQueryResult = ApolloReactCommon.QueryResult<ArtistsQuery, ArtistsQueryVariables>;