# Deploy Shop Shazzz to Vercel (fast path)

## Option A — From the complete tarball (recommended today)

The GitHub repo is being filled with source. The **full working app** is in the tarball.

```bash
# 1. Extract
tar -xzf shop-shazzz.tar.gz
cd shop-shazzz

# 2. Install & test locally
npm install
npm run dev
# open http://localhost:3000

# 3. Push everything to your GitHub repo
git init
git remote add origin https://github.com/dev1ishere55-sudo/Shop-Shazzz.git
git add .
git commit -m "feat: full Shop Shazzz v1 app"
git branch -M main
git push -u origin main --force
```

`--force` is OK once: it replaces the partial tree with the complete app.

## Option B — Vercel from GitHub

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import **dev1ishere55-sudo/Shop-Shazzz**
3. Framework: **Next.js** (auto-detected)
4. Root directory: `.`
5. Build command: `next build` (default)
6. Click **Deploy**

No env vars required for v1 (mock data). Add later:

| Variable | When |
|----------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Phase 2 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Phase 2 |
| `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` | Phase 3 |
| `PAYSTACK_SECRET_KEY` | Phase 3 |
| `TELEGRAM_BOT_TOKEN` | Phase 4 |

## Option C — Vercel CLI (from the tarball folder)

```bash
npm i -g vercel
cd shop-shazzz
vercel
# follow prompts → production: vercel --prod
```

## After deploy

- Live URL looks like `https://shop-shazzz-xxx.vercel.app`
- Point Telegram Mini App URL (BotFather) to that domain
- Custom domain: Vercel → Project → Settings → Domains

## Telegram Mini App

1. [@BotFather](https://t.me/BotFather) → your bot → **Bot Settings** → **Menu Button** or **Configure Mini App**
2. URL = your Vercel URL (HTTPS required)
3. Open the bot on phone → launch Mini App

## Checklist before sharing the link

- [ ] Home loads with 3 entry tiles
- [ ] Shop + product pages work
- [ ] Add to cart → checkout flow completes
- [ ] Replace picsum placeholders with real product photos
- [ ] Update WhatsApp number on About page
