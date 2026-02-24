
.PHONY: start
start:
	pnpm exec supabase start

.PHONY: stop
stop:
	pnpm exec supabase stop

# 型定義を生成(ローカルDBのスキーマからTypescriptの型定義を生成する)
# .PHONY: gen
# gen:
# 	pnpm exec supabase gen types typescript --local > src/types/supabase.ts
