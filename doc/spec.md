# Photolyst リニューアル開発仕様書

## 0. 現在のPhotolyst
- 現在のサイト
  https://www.photolyst.com/

- ドキュメント
  https://time.photolyst.com/


## 1. プロジェクト概要

* **プロジェクト名:** runco
* **目的:** 計測・写真・コミュニティ機能を統合したスポーツイベントプラットフォームの再構築。
* **コアコンセプト:**
* **計測 (Timer):** 正確なタイム計測とリザルト管理。
* **組織管理 (Organization):** 計測会社や運営委員会単位での複数イベント管理。
* **エントリー(Entry):** 大会申込みの管理。
* **コミュニティ (Community):** サブスクリプション型コミュニティ運営。
* **写真 (Photo):** 走行写真の閲覧・購入機能。



## 2. 技術スタック (Tech Stack)

* **Framework:** Next.js 16 (App Router)
* **Language:** TypeScript
* **Backend/DB:** Supabase (Auth, DB, Realtime)
* **UI Library:** shadcn/ui + Tailwind CSS
* **Package Manager:** pnpm (v10系)

## 3. システムアーキテクチャ & コーディング規約

### 3.1 フォルダ構成（Feature-based）

機能ごとにフォルダを切り、**UIとデータアクセスロジックを物理的に分離**します。

```text
src/
├── app/                  # ルーティング (Page, Layout)
├── components/ui/        # shadcn/ui 共通パーツ
├── lib/                  # Supabaseクライアント初期化など
└── features/             # ★機能ごとの集約フォルダ
    ├── organizations/    # 例: 組織機能
    └── events/           # 例: 大会機能
        ├── components/   # この機能専用のUI部品
        ├── api/          # ★読み取り (SELECT) ロジック
        │   └── get-events.ts
        └── actions/      # ★書き込み (INSERT/UPDATE) ロジック
            └── create-event.ts

```

### 3.2 【重要】実装ルール: UIとロジックの分離

将来的なバックエンド分離を見据え、以下のルールを厳守する。

1. **UIコンポーネントの禁止事項:**
* `page.tsx` や `components/` 内で、**直接 `supabase-js` クライアントを呼び出してクエリを発行してはならない。**
* × `supabase.from('events').select(...)` をUIに書くのは禁止。


2. **データアクセスの作法:**
* **データ取得 (Read):** 必ず `features/[機能]/api/` フォルダ内の関数を経由して取得する。
* **データ更新 (Write):** 必ず `features/[機能]/actions/` フォルダ内の Server Actions を経由して実行する。



## 4. データベース・セキュリティ設計

### 4.1 組織・権限モデル (Organization-based)

ユーザーは「組織」に所属し、組織が「イベント」を所有する階層構造とする。

* **Organizations (組織テーブル):**
* 計測会社、大会実行委員会などの主体。


* **Organization Members (組織メンバーテーブル):**
* ユーザーと組織の所属関係を管理。
* **Role (権限):**
* `owner`: 組織設定、全イベントの管理・削除、スタッフ招待、決済管理。
* `staff`: 所属組織のイベントにおける計測作業・閲覧（イベント削除や組織設定は不可）。




* **Events (大会テーブル):**
* 必ず `organization_id` を持ち、特定の組織に紐づく。



### 4.2 RLS (Row Level Security) ポリシー方針

アプリケーションコードではなく、DBのRLSでセキュリティを担保する。

* **基本ルール:** 「アクセスしようとしているデータ（イベント等）が紐づく組織に、実行ユーザーがメンバーとして所属しているか」を判定する。
* **実装:** `is_org_member(org_id)` 等のHelper関数をDB側に定義し、各テーブルのPolicyで使用する。


## 5. UI/デザインガイドライン

* **組織切り替え:**
* ヘッダーまたはサイドバーに「組織切り替えスイッチャー」を配置し、現在操作中の `organization_id` を明確にする。




## 6. テスト方針 (Testing Policy)

品質と開発速度のバランスを重視し、機能ごとのロジック検証を最優先とします。

### 6.1 Unit/Integration Testing (Vitest)
* **対象:** `features/**/api/` (Read) および `features/**/actions/` (Write)
* **目的:** ビジネスロジックとDBアクセスの正当性を保証する。
* **方針:**
    * すべての Server Actions と API 関数に対してテストを記述する。
    * UI コンポーネントの単体テストは、複雑なロジックを持つ場合を除き、原則として必須としない（変更に弱いため）。

### 6.2 E2E Testing (Playwright)
* **対象:** 重要なユーザージャーニー (Critical User Journeys)
* **シナリオ例:**
    * サインアップ・ログインフロー
    * 組織の作成とメンバー招待
    * 大会の作成・編集・削除
* **方針:** ハッピーパス（正常系）を中心に、主要機能が統合的に動作することを確認する。

### 6.3 テストの哲学
* **Logic First:** ロジック（`api`, `actions`）は厳密にテストする。
* **Integration over Snapshot:** 壊れやすい UI スナップショットテストよりも、実動作に近い統合テストや E2E を優先する。

