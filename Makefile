
.PHONY: dev
dev:
	pnpm run dev

.PHONY: supabase.start
supabase.start:
	pnpm exec supabase start

.PHONY: supabase.status
supabase.status:
	pnpm exec supabase status

.PHONY: supabase.stop
supabase.stop:
	pnpm exec supabase stop

# 型定義を生成(ローカルDBのスキーマからTypescriptの型定義を生成する)
# .PHONY: gen
# gen:
# 	pnpm exec supabase gen types typescript --local > src/types/supabase.ts
