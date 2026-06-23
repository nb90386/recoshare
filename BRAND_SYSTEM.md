# Recoshare Brand System

## Brand Personality
- **Curious** — Always discovering, always suggesting
- **Helpful** — Genuinely useful, never pushy
- **Tasteful** — Curated quality over quantity
- **Fun** — Playful but refined
- **Intelligent** — Smart recommendations, not random
- **Calm** — Soothing, not overwhelming
- **Social** — Built for sharing
- **Creative** — Inspires new experiences

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Cream | #FDFBF7 | Background |
| Warm 50 | #FEF7F0 | Surface tint |
| Coral | #FF6B6B | Primary CTA, accent |
| Sage | #4ECDC4 | Secondary accent |
| Lavender | #A78BFA | Gradient partner, tags |
| Sky | #38BDF8 | Info, links |
| Rose | #FB7185 | Likes, hearts |
| Ink | #1A1A2E | Primary text |
| Ink Light | #4A4A6A | Secondary text |
| Ink Muted | #8888A0 | Tertiary text |

## Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 400 (body), 500 (medium), 600 (semibold), 700 (bold), 800 (extrabold), 900 (black)
- **Scale**: 12px (caption) → 14px (body) → 16px (base) → 20px (h3) → 24px (h2) → 32px+ (h1)

## Logo
- **Mark**: Compass icon (🧭) — represents discovery and direction
- **Wordmark**: "Recoshare" in bold Inter with gradient (coral → lavender)
- **Usage**: White mark on gradient background in header

## Card Style
- Glass morphism: `bg-white/70 backdrop-blur-sm border-white/40`
- Border radius: 16px (rounded-2xl)
- Shadow: subtle, increases on hover
- Hover: scale 1.02, shadow increase, color shift

## Motion Principles
- **Entrance**: Fade up with stagger (80ms delay between items)
- **Page transitions**: Fade + slight vertical movement
- **Interactions**: Scale on hover/tap, color transitions
- **Loading**: Spinning gradient circle
- **Micro-interactions**: Heart fill, bookmark check, like count increment

## Category Icons
Each category has an emoji icon for quick visual recognition:
✨ Anything, 🎯 Activities, 🍕 Food, 🎬 Movies, 📺 TV Shows, 📚 Books, 🎵 Music, 🎧 Podcasts, 🎮 Games, 📍 Places, 💕 Date Ideas, 👥 Group Ideas, 🧘 Solo Ideas, 🆓 Free Ideas, 💰 Low Budget

## Empty States
- Friendly emoji + clear message + CTA button
- Consistent with brand voice (helpful, not apologetic)

## Loading States
- Skeleton cards matching final card shape
- Animated spinner for recommendation generation
- Progress bar for multi-step forms
