import { z } from "zod";

// メールアドレスの共通ルール
export const emailSchema = z.email("メールアドレスの形式が正しくありません");

// パスワードの共通ルール（新規登録やパスワード変更時用）
export const passwordSchema = z
  .string()
  .min(12, "パスワードは12文字以上にしてください")
  .regex(/[a-zA-Z]/, "パスワードには英字を1文字以上含めてください")
  .regex(/[0-9]/, "パスワードには数字を1文字以上含めてください");
