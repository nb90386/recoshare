# Recoshare — Recommendations for the moments you cannot decide.

[![Vercel](https://img.shields.io/badge/deployed%20with-vercel-black)](https://vercel.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)]()
[![React](https://img.shields.io/badge/React-18-61DAFB)]()
[![Vite](https://img.shields.io/badge/Vite-6-646CFF)]()

A beautiful social recommendation app for people who are undecided, bored, or looking for something new.

## ✨ Features

- **Get Recommendations** — Enter your mood, time, budget, and context to get personalized suggestions
- **Browse** — Discover 80+ curated recommendations across 15 categories
- **Share** — Post your own recommendations for others
- **Save & Like** — Bookmark favorites and show appreciation
- **Beautiful UI** — Glass morphism, Framer Motion animations, warm color palette
- **Mobile-first** — Fully responsive design

## 🚀 Deploy

### One-click deploy to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nb90386/recoshare)

### Manual deploy:

1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
2. Click "Add New" → "Project"
3. Import `nb90386/recoshare` from GitHub
4. Framework: Vite (auto-detected)
5. Click "Deploy"

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📁 Project Structure

```
src/
├── components/     # Layout, shared components
├── pages/          # Home, Recommend, Browse, Detail, Share, Saved
├── lib/            # Recommender engine, seed data, store
├── types/          # TypeScript types
└── assets/         # Static assets
```

## 🧪 Recommendation Engine

The app uses a rule-based scoring engine that matches recommendations based on:
- Mood compatibility
- Category match
- Budget fit
- Time availability
- Social context
- Energy level
- Interest tags

Scoring is weighted and includes randomization for variety.

## 📄 License

MIT
