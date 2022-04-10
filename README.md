# コマンド

コマンド一覧

* dev
* build
* start
* lint
* fix

## dev

`next dev`を実行する。 開発環境で動作させるときに使用するコマンド。

## build

`next build`を実行する。 本番環境でビルドするときに使用するコマンド。

## start

`next start`を実行する 本番環境で動作させるときに使用するコマンド。

## lint

`next lint`を実行する。

# Environment

開発環境と本番環境でEnvironmentを扱いを分けている

## 開発環境

`.env.local`ファイルでEnvironmentを管理している。 このファイルはGit管理外にしている。そのため、開発環境構築時に設定の必要がある

## 本番環境

VercelのEnvironment Variablesに値を設定している。




