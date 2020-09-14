import React, { useEffect } from 'react';
import InformationLayout from './InformationLayout'

const AboutLayout = () => InformationLayout(`
# このサイトについて
## 概要
音楽サブスクリプション配信中のゲーム音楽を検索できるサイトです。非商用で公開しています。
## 目的
私が新しいゲーム音楽に出会うために公開しています。今後、お気に入り機能やプレイリスト機能などの実装により、ユーザー同士でゲーム音楽を共有できるよう開発を進めています。
## SNSと開発プロジェクト
[ツイッターはこちら](https://twitter.com/vgm_net)
[開発プロジェクトはこちら](https://github.com/users/himanushi/projects/2)
`)

export default AboutLayout
