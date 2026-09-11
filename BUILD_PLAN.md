# Shop Shazzz — Fast Build Plan

## Goal
Ship a live website + Telegram Mini App in the shortest path, then layer payments and backend.

## Phase 0 — Today (done / in progress)
- [x] Next.js 15 + TypeScript + Tailwind v4 scaffold
- [x] Brand system (navy / plum / ivory, price pills)
- [x] Home, Shop, Product, Cart, Checkout, Order, Suya, About, Admin
- [x] Telegram WebApp detection + BackButton / MainButton hooks
- [x] Mock catalog + delivery zones (Keffi, Abuja, Kaduna, Jos)
- [x] GitHub repo: https://github.com/dev1ishere55-sudo/Shop-Shazzz

## Phase 1 — Run & deploy (30–60 min)
1. Clone or extract the source
2. `npm install && npm run dev`
3. Connect repo to Vercel → deploy (zero config for Next.js)
4. Add custom domain when ready

## Phase 2 — Real data (1–2 hrs)
1. Create Supabase project
2. Tables: products, orders, customers (schema in types/)
3. Swap mock `src/data/products.ts` for Supabase client queries
4. Storage bucket for product images

## Phase 3 — Payments (1 hr)
1. Paystack account + public/secret keys in env
2. Initialize transaction on checkout
3. Webhook → mark order paid + Telegram notify

## Phase 4 — Telegram bot (1 hr)
1. BotFather → bot token
2. Mini App URL = Vercel domain
3. Bot sends order status updates to `telegram_user_id`

## Phase 5 — Polish
- Real product photos (drop watermarked supplier images)
- Distressed logo asset
- Admin auth (simple password or Supabase Auth)

## Stack locked
Frontend: Next.js 15 App Router + Tailwind  
Data: Supabase (Postgres + Storage)  
Pay: Paystack  
Shell: Telegram WebApp SDK + Bot API  

No redesign needed — the UI already matches the brief.
