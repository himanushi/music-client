import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
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
  /** Table id, hex Timestamp, ID */
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
  /** ステータス */
  status: StatusEnum;
  /** トラック数 */
  totalTracks: Scalars['PositiveNumber'];
  /** トラック */
  tracks: Array<Track>;
};

export type AlbumsConditionsInputObject = {
  /** アーティストID */
  artists?: Maybe<IdInputObject>;
  /** 表示ステータス */
  status?: Maybe<Array<StatusEnum>>;
};

export enum AlbumsQueryOrderEnum {
  /** 追加順 */
  New = 'NEW',
  /** 発売日順 */
  Release = 'RELEASE',
  /** 人気順 */
  Popularity = 'POPULARITY'
}

export type AlbumsSortInputObject = {
  /** 並び順対象 */
  order?: Maybe<AlbumsQueryOrderEnum>;
  /** 並び順 */
  type?: Maybe<SortEnum>;
};

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
  /** 名前 */
  name: Scalars['String'];
};

/** アーティスト */
export type Artist = {
   __typename?: 'Artist';
  /** 関連アルバム */
  albums?: Maybe<Array<Album>>;
  /** Apple Music アーティスト */
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
  /** Spotify アーティスト */
  spotifyArtists?: Maybe<Array<SpotifyArtist>>;
  /** ステータス */
  status: StatusEnum;
  /** 関連曲 */
  tracks?: Maybe<Array<Track>>;
};

export type ArtistsConditionsInputObject = {
  /** アルバムID */
  albums?: Maybe<IdInputObject>;
  /** 表示ステータス */
  status?: Maybe<Array<StatusEnum>>;
};

export enum ArtistsQueryOrderEnum {
  /** 名前順 */
  Name = 'NAME',
  /** 追加順 */
  New = 'NEW',
  /** 人気順 */
  Popularity = 'POPULARITY'
}

export type ArtistsSortInputObject = {
  /** ソート対象 */
  order?: Maybe<ArtistsQueryOrderEnum>;
  /** 並び順 */
  type?: Maybe<SortEnum>;
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

/** Autogenerated input type of ChangeStatus */
export type ChangeStatusInput = {
  /** 変更したいアーティストID */
  artistId?: Maybe<Scalars['TTID']>;
  /** 変更したいアルバムID */
  albumId?: Maybe<Scalars['TTID']>;
  /** 変更したいトラックID */
  trackId?: Maybe<Scalars['TTID']>;
  /** 変更したいステータス */
  status: StatusEnum;
  /** true の場合は関連のステータスは変更しない。デフォルトは false。アーティスト限定 */
  only?: Maybe<Scalars['Boolean']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of ChangeStatus */
export type ChangeStatusPayload = {
   __typename?: 'ChangeStatusPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  error?: Maybe<Scalars['String']>;
  /** 変更されたステータスを持ったモデル */
  model?: Maybe<ModelHasStatusUnion>;
};

/** Autogenerated input type of ClearCache */
export type ClearCacheInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of ClearCache */
export type ClearCachePayload = {
   __typename?: 'ClearCachePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  error?: Maybe<Scalars['String']>;
  results?: Maybe<Array<Scalars['String']>>;
};

/** Autogenerated input type of CompactAlbum */
export type CompactAlbumInput = {
  /** 統合後のアルバム名。 */
  name: Scalars['String'];
  /** 統合したいアルバムID。Apple Music アルバムのみ統合される。指定した順番通りに統合する。 */
  albumIdsForAppleMusic?: Maybe<Array<Scalars['TTID']>>;
  /** 統合したいアルバムID。Spotify アルバムのみ統合される。指定した順番通りに統合する。 */
  albumIdsForSpotify?: Maybe<Array<Scalars['TTID']>>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CompactAlbum */
export type CompactAlbumPayload = {
   __typename?: 'CompactAlbumPayload';
  /** 統合されたアルバム */
  album?: Maybe<Album>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  error?: Maybe<Scalars['String']>;
};

/** カレントユーザー */
export type CurrentUser = {
   __typename?: 'CurrentUser';
  /** ID */
  id: Scalars['TTID'];
  /** 名前 */
  name: Scalars['String'];
  /** ロール */
  role: Role;
  /** ユーザー名 */
  username: Scalars['String'];
};

export type CursorInputObject = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['PositiveNumber']>;
};


export type IdInputObject = {
  /** ID */
  id?: Maybe<Array<Scalars['TTID']>>;
};

/** Autogenerated input type of MixAlbum */
export type MixAlbumInput = {
  /** 混合したいアルバムID */
  albumIds: Array<Scalars['TTID']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of MixAlbum */
export type MixAlbumPayload = {
   __typename?: 'MixAlbumPayload';
  /** 混合されたアルバム */
  album?: Maybe<Album>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  error?: Maybe<Scalars['String']>;
};

/** Autogenerated input type of MixArtist */
export type MixArtistInput = {
  /** メインアーティストID */
  mainArtistId: Scalars['TTID'];
  /** サブアーティストID */
  subArtistId: Scalars['TTID'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of MixArtist */
export type MixArtistPayload = {
   __typename?: 'MixArtistPayload';
  /** 混合されたアーティスト */
  artist?: Maybe<Artist>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  error?: Maybe<Scalars['String']>;
};

/** ステータスをもつモデルのいずれか */
export type ModelHasStatusUnion = Album | Artist | Track;

export type Mutation = {
   __typename?: 'Mutation';
  /** ステータス変更。関連するアルバム, トラック, 各音楽サービスアルバム、各音楽サービストラックも同じステータスで更新される。 */
  changeStatus?: Maybe<ChangeStatusPayload>;
  /** 検索結果キャッシュをリセットする */
  clearCache?: Maybe<ClearCachePayload>;
  /** 複数アルバムを単一アルバムに統合する。統合前の複数アルバムは全て IGNORE される。 */
  compactAlbum?: Maybe<CompactAlbumPayload>;
  /**
   * アルバムを混合する。
   * 同じアルバムのはずが各音楽サービスで別のアルバムと認識される場合がある。
   * その場合に使用する。曲数が多いアルバムを正とする。
   */
  mixAlbum?: Maybe<MixAlbumPayload>;
  /**
   * アーティストを混合する。
   * 混合後は修正不可のため注意して使用すること。
   */
  mixArtist?: Maybe<MixArtistPayload>;
  /** サインイン */
  signin?: Maybe<SigninPayload>;
  /** 統合したアルバムを元に戻す。統合された単一アルバムは削除される。 */
  uncompactAlbum?: Maybe<UncompactAlbumPayload>;
  /** アルバムの混合を解除する。アルバムと曲数に相違がある音楽サービスアルバムを分離する。 */
  unmixAlbum?: Maybe<UnmixAlbumPayload>;
  /** カレントユーザー情報更新 */
  updateMe?: Maybe<UpdateMePayload>;
  /** アルバムを最新の状態にする */
  upsertAlbum?: Maybe<UpsertAlbumPayload>;
  /** アーティストを最新の状態にする */
  upsertArtist?: Maybe<UpsertArtistPayload>;
};


export type MutationChangeStatusArgs = {
  input: ChangeStatusInput;
};


export type MutationClearCacheArgs = {
  input: ClearCacheInput;
};


export type MutationCompactAlbumArgs = {
  input: CompactAlbumInput;
};


export type MutationMixAlbumArgs = {
  input: MixAlbumInput;
};


export type MutationMixArtistArgs = {
  input: MixArtistInput;
};


export type MutationSigninArgs = {
  input: SigninInput;
};


export type MutationUncompactAlbumArgs = {
  input: UncompactAlbumInput;
};


export type MutationUnmixAlbumArgs = {
  input: UnmixAlbumInput;
};


export type MutationUpdateMeArgs = {
  input: UpdateMeInput;
};


export type MutationUpsertAlbumArgs = {
  input: UpsertAlbumInput;
};


export type MutationUpsertArtistArgs = {
  input: UpsertArtistInput;
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
  /** カレントユーザー情報取得 */
  me: CurrentUser;
};


export type QueryAlbumArgs = {
  id: Scalars['TTID'];
};


export type QueryAlbumsArgs = {
  cursor?: Maybe<CursorInputObject>;
  sort?: Maybe<AlbumsSortInputObject>;
  conditions?: Maybe<AlbumsConditionsInputObject>;
};


export type QueryArtistArgs = {
  id: Scalars['TTID'];
};


export type QueryArtistsArgs = {
  cursor?: Maybe<CursorInputObject>;
  sort?: Maybe<ArtistsSortInputObject>;
  conditions?: Maybe<ArtistsConditionsInputObject>;
};

/** ロール */
export type Role = {
   __typename?: 'Role';
  /** 出来ること一覧 */
  allowedActions: Array<Scalars['String']>;
  /** 説明 */
  description: Scalars['String'];
  /** ID */
  id: Scalars['TTID'];
  /** 名前 */
  name: Scalars['String'];
};

/** Autogenerated input type of Signin */
export type SigninInput = {
  username?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of Signin */
export type SigninPayload = {
   __typename?: 'SigninPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  currentUser?: Maybe<CurrentUser>;
  error?: Maybe<Scalars['String']>;
};

export enum SortEnum {
  /** 昇順 */
  Asc = 'ASC',
  /** 降順 */
  Desc = 'DESC'
}

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

/** Spotify アーティスト */
export type SpotifyArtist = {
   __typename?: 'SpotifyArtist';
  /** ID */
  id: Scalars['TTID'];
  /** 名前 */
  name: Scalars['String'];
  /** Spotify ID */
  spotifyId: Scalars['String'];
};

export enum StatusEnum {
  /** 保留 : デフォルトの検索結果に表示されない */
  Pending = 'PENDING',
  /** 有効 : 通常検索結果に表示される */
  Active = 'ACTIVE',
  /** 除外 : 検索結果から除外される。最新情報などを取得する際などでも除外される */
  Ignore = 'IGNORE'
}


/** トラック */
export type Track = {
   __typename?: 'Track';
  /** 中型アートワーク */
  artworkM: Artwork;
  /** ディスク番号 */
  discNumber: Scalars['PositiveNumber'];
  /** 再生時間 */
  durationMs: Scalars['PositiveNumber'];
  /** ID */
  id: Scalars['TTID'];
  /** 国際標準レコーディングコード */
  isrc: Scalars['String'];
  /** タイトル */
  name: Scalars['String'];
  /** 人気度 */
  popularity: Scalars['Int'];
  /** プレビューURL */
  previewUrl?: Maybe<Scalars['String']>;
  /** ステータス */
  status: StatusEnum;
  /** トラック番号 */
  trackNumber: Scalars['PositiveNumber'];
};

/** Autogenerated input type of UncompactAlbum */
export type UncompactAlbumInput = {
  /** 統合解除したいアルバムID。Apple Music アルバムのみ解除される。 */
  albumIdForAppleMusic?: Maybe<Scalars['TTID']>;
  /** 統合解除したいアルバムID。Spotify アルバムのみ解除される。 */
  albumIdForSpotify?: Maybe<Scalars['TTID']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UncompactAlbum */
export type UncompactAlbumPayload = {
   __typename?: 'UncompactAlbumPayload';
  /** 統合解除されたアルバム */
  albums?: Maybe<Array<Album>>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  error?: Maybe<Scalars['String']>;
};

/** Autogenerated input type of UnmixAlbum */
export type UnmixAlbumInput = {
  /** 混合解除したいアルバムID */
  albumId: Scalars['TTID'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UnmixAlbum */
export type UnmixAlbumPayload = {
   __typename?: 'UnmixAlbumPayload';
  /** 混合されたアルバム */
  albums?: Maybe<Array<Album>>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  error?: Maybe<Scalars['String']>;
};

/** Autogenerated input type of UpdateMe */
export type UpdateMeInput = {
  name?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  newPassword?: Maybe<Scalars['String']>;
  oldPassword: Scalars['String'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateMe */
export type UpdateMePayload = {
   __typename?: 'UpdateMePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  currentUser?: Maybe<CurrentUser>;
  error?: Maybe<Scalars['String']>;
};

/** Autogenerated input type of UpsertAlbum */
export type UpsertAlbumInput = {
  /** 指定したアルバムのトラック(ISRC)を含んでいる別音楽サービスのアルバムを一括登録 */
  albumId?: Maybe<Scalars['TTID']>;
  /** Apple Music か iTunes のアルバムを登録 */
  appleMusicId?: Maybe<Scalars['String']>;
  /** Spotify のアルバムを登録 */
  spotifyId?: Maybe<Scalars['String']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpsertAlbum */
export type UpsertAlbumPayload = {
   __typename?: 'UpsertAlbumPayload';
  /** 追加されたアルバム */
  albums?: Maybe<Array<Album>>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  error?: Maybe<Scalars['String']>;
};

/** Autogenerated input type of UpsertArtist */
export type UpsertArtistInput = {
  /**
   * アーティスト名から全ての音楽サービスのアーティストを登録。登録後、関連アルバム、トラックを全て保存する。
   * (ありきたりなアーティスト名の場合は関係のないアーティストが登録される可能性があるため注意)
   */
  artistName?: Maybe<Scalars['String']>;
  /** Apple Music のアーティストを登録。登録後、関連アルバム、トラックを全て保存する。 */
  appleMusicId?: Maybe<Scalars['String']>;
  /** Spotify のアーティストを登録。登録後、関連アルバム、トラックを全て保存する。 */
  spotifyId?: Maybe<Scalars['String']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpsertArtist */
export type UpsertArtistPayload = {
   __typename?: 'UpsertArtistPayload';
  /** 追加されたアーティスト */
  artists?: Maybe<Array<Artist>>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  error?: Maybe<Scalars['String']>;
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
    )>, tracks: Array<(
      { __typename?: 'Track' }
      & Pick<Track, 'id' | 'isrc' | 'name' | 'discNumber' | 'trackNumber' | 'durationMs' | 'previewUrl' | 'popularity'>
      & { artworkM: (
        { __typename?: 'Artwork' }
        & Pick<Artwork, 'url' | 'width' | 'height'>
      ) }
    )> }
  )> }
);

export type AlbumsQueryVariables = {
  cursor?: Maybe<CursorInputObject>;
  sort?: Maybe<AlbumsSortInputObject>;
  conditions?: Maybe<AlbumsConditionsInputObject>;
};


export type AlbumsQuery = (
  { __typename?: 'Query' }
  & { items: Array<(
    { __typename?: 'Album' }
    & Pick<Album, 'id' | 'name' | 'status'>
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
    & { artworkL: (
      { __typename?: 'Artwork' }
      & Pick<Artwork, 'url' | 'width' | 'height'>
    ) }
  )> }
);

export type ArtistsQueryVariables = {
  cursor?: Maybe<CursorInputObject>;
  sort?: Maybe<ArtistsSortInputObject>;
  conditions?: Maybe<ArtistsConditionsInputObject>;
};


export type ArtistsQuery = (
  { __typename?: 'Query' }
  & { items: Array<(
    { __typename?: 'Artist' }
    & Pick<Artist, 'id' | 'name' | 'status'>
    & { artworkM: (
      { __typename?: 'Artwork' }
      & Pick<Artwork, 'url' | 'width' | 'height'>
    ) }
  )> }
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'CurrentUser' }
    & Pick<CurrentUser, 'id' | 'name' | 'username'>
    & { role: (
      { __typename?: 'Role' }
      & Pick<Role, 'id' | 'name' | 'description' | 'allowedActions'>
    ) }
  ) }
);

export type UpdateMeMutationVariables = {
  input: UpdateMeInput;
};


export type UpdateMeMutation = (
  { __typename?: 'Mutation' }
  & { updateMe?: Maybe<(
    { __typename?: 'UpdateMePayload' }
    & Pick<UpdateMePayload, 'error'>
    & { currentUser?: Maybe<(
      { __typename?: 'CurrentUser' }
      & Pick<CurrentUser, 'id' | 'username' | 'name'>
    )> }
  )> }
);

export type SigninMutationVariables = {
  input: SigninInput;
};


export type SigninMutation = (
  { __typename?: 'Mutation' }
  & { signin?: Maybe<(
    { __typename?: 'SigninPayload' }
    & Pick<SigninPayload, 'error'>
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
    tracks {
      id
      isrc
      name
      discNumber
      trackNumber
      durationMs
      previewUrl
      popularity
      artworkM {
        url
        width
        height
      }
    }
  }
}
    `;

/**
 * __useAlbumQuery__
 *
 * To run a query within a React component, call `useAlbumQuery` and pass it any options that fit your needs.
 * When your component renders, `useAlbumQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAlbumQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAlbumQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AlbumQuery, AlbumQueryVariables>) {
        return ApolloReactHooks.useQuery<AlbumQuery, AlbumQueryVariables>(AlbumDocument, baseOptions);
      }
export function useAlbumLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AlbumQuery, AlbumQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AlbumQuery, AlbumQueryVariables>(AlbumDocument, baseOptions);
        }
export type AlbumQueryHookResult = ReturnType<typeof useAlbumQuery>;
export type AlbumLazyQueryHookResult = ReturnType<typeof useAlbumLazyQuery>;
export type AlbumQueryResult = ApolloReactCommon.QueryResult<AlbumQuery, AlbumQueryVariables>;
export const AlbumsDocument = gql`
    query Albums($cursor: CursorInputObject, $sort: AlbumsSortInputObject, $conditions: AlbumsConditionsInputObject) {
  items: albums(cursor: $cursor, sort: $sort, conditions: $conditions) {
    id
    name
    status
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

/**
 * __useAlbumsQuery__
 *
 * To run a query within a React component, call `useAlbumsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAlbumsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAlbumsQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      sort: // value for 'sort'
 *      conditions: // value for 'conditions'
 *   },
 * });
 */
export function useAlbumsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AlbumsQuery, AlbumsQueryVariables>) {
        return ApolloReactHooks.useQuery<AlbumsQuery, AlbumsQueryVariables>(AlbumsDocument, baseOptions);
      }
export function useAlbumsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AlbumsQuery, AlbumsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AlbumsQuery, AlbumsQueryVariables>(AlbumsDocument, baseOptions);
        }
export type AlbumsQueryHookResult = ReturnType<typeof useAlbumsQuery>;
export type AlbumsLazyQueryHookResult = ReturnType<typeof useAlbumsLazyQuery>;
export type AlbumsQueryResult = ApolloReactCommon.QueryResult<AlbumsQuery, AlbumsQueryVariables>;
export const ArtistDocument = gql`
    query Artist($id: TTID!) {
  artist(id: $id) {
    id
    name
    artworkL {
      url
      width
      height
    }
  }
}
    `;

/**
 * __useArtistQuery__
 *
 * To run a query within a React component, call `useArtistQuery` and pass it any options that fit your needs.
 * When your component renders, `useArtistQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArtistQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useArtistQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ArtistQuery, ArtistQueryVariables>) {
        return ApolloReactHooks.useQuery<ArtistQuery, ArtistQueryVariables>(ArtistDocument, baseOptions);
      }
export function useArtistLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ArtistQuery, ArtistQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ArtistQuery, ArtistQueryVariables>(ArtistDocument, baseOptions);
        }
export type ArtistQueryHookResult = ReturnType<typeof useArtistQuery>;
export type ArtistLazyQueryHookResult = ReturnType<typeof useArtistLazyQuery>;
export type ArtistQueryResult = ApolloReactCommon.QueryResult<ArtistQuery, ArtistQueryVariables>;
export const ArtistsDocument = gql`
    query Artists($cursor: CursorInputObject, $sort: ArtistsSortInputObject, $conditions: ArtistsConditionsInputObject) {
  items: artists(cursor: $cursor, sort: $sort, conditions: $conditions) {
    id
    name
    status
    artworkM {
      url
      width
      height
    }
  }
}
    `;

/**
 * __useArtistsQuery__
 *
 * To run a query within a React component, call `useArtistsQuery` and pass it any options that fit your needs.
 * When your component renders, `useArtistsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArtistsQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      sort: // value for 'sort'
 *      conditions: // value for 'conditions'
 *   },
 * });
 */
export function useArtistsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ArtistsQuery, ArtistsQueryVariables>) {
        return ApolloReactHooks.useQuery<ArtistsQuery, ArtistsQueryVariables>(ArtistsDocument, baseOptions);
      }
export function useArtistsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ArtistsQuery, ArtistsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ArtistsQuery, ArtistsQueryVariables>(ArtistsDocument, baseOptions);
        }
export type ArtistsQueryHookResult = ReturnType<typeof useArtistsQuery>;
export type ArtistsLazyQueryHookResult = ReturnType<typeof useArtistsLazyQuery>;
export type ArtistsQueryResult = ApolloReactCommon.QueryResult<ArtistsQuery, ArtistsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    name
    username
    role {
      id
      name
      description
      allowedActions
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const UpdateMeDocument = gql`
    mutation UpdateMe($input: UpdateMeInput!) {
  updateMe(input: $input) {
    currentUser {
      id
      username
      name
    }
    error
  }
}
    `;
export type UpdateMeMutationFn = ApolloReactCommon.MutationFunction<UpdateMeMutation, UpdateMeMutationVariables>;

/**
 * __useUpdateMeMutation__
 *
 * To run a mutation, you first call `useUpdateMeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMeMutation, { data, loading, error }] = useUpdateMeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateMeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateMeMutation, UpdateMeMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateMeMutation, UpdateMeMutationVariables>(UpdateMeDocument, baseOptions);
      }
export type UpdateMeMutationHookResult = ReturnType<typeof useUpdateMeMutation>;
export type UpdateMeMutationResult = ApolloReactCommon.MutationResult<UpdateMeMutation>;
export type UpdateMeMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateMeMutation, UpdateMeMutationVariables>;
export const SigninDocument = gql`
    mutation Signin($input: SigninInput!) {
  signin(input: $input) {
    error
  }
}
    `;
export type SigninMutationFn = ApolloReactCommon.MutationFunction<SigninMutation, SigninMutationVariables>;

/**
 * __useSigninMutation__
 *
 * To run a mutation, you first call `useSigninMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSigninMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signinMutation, { data, loading, error }] = useSigninMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSigninMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SigninMutation, SigninMutationVariables>) {
        return ApolloReactHooks.useMutation<SigninMutation, SigninMutationVariables>(SigninDocument, baseOptions);
      }
export type SigninMutationHookResult = ReturnType<typeof useSigninMutation>;
export type SigninMutationResult = ApolloReactCommon.MutationResult<SigninMutation>;
export type SigninMutationOptions = ApolloReactCommon.BaseMutationOptions<SigninMutation, SigninMutationVariables>;