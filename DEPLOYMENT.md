# DEPLOYMENT.md

## Deploy Recoshare to Vercel (Free)

### Option 1: One-Click Deploy
Click the button below:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nb90386/recoshare)

### Option 2: Manual Deploy
1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Click **"Add New"** → **"Project"**
3. Import `nb90386/recoshare` from GitHub
4. Vercel auto-detects Vite — no config needed
5. Click **"Deploy"**
6. Your app will be live at `https://recoshare.vercel.app` (or custom domain)

### Environment Variables
None required for basic functionality. The app works with local seed data.

Optional for future features:
- `VITE_SUPABASE_URL` — Supabase project URL
- `VITE_SUPABASE_ANON_KEY` — Supabase anonymous key

### Custom Domain
1. Go to Vercel Dashboard → Project → Settings → Domains
2. Add your domain
3. Update DNS records as instructed

### Auto-Deploy
Every push to the `main` branch automatically triggers a new deployment.
