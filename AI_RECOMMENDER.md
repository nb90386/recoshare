# AI_RECOMMENDER.md

## Recommendation Engine

Recoshare uses a hybrid recommendation engine combining rule-based scoring with optional AI enhancement.

### Rule-Based Engine (Default)

The engine scores each recommendation based on user input:

| Factor | Weight | Logic |
|--------|--------|-------|
| Category match | ±20 | Exact category match or penalty |
| Mood match | +15 | Mood tags overlap with user mood |
| Budget fit | ±10 | Cost level within user budget |
| Time fit | ±10 | Duration fits available time |
| Social context | +10 | Tags match social setting |
| Energy level | +8 | Mood tags match energy level |
| Interest tags | +5 each | Interest overlap with tags |
| Location | +5 | Location type preference match |
| Randomness | ±5 | Prevents identical results |

### AI Enhancement (Optional)

When `OPENROUTER_API_KEY` or `OPENAI_API_KEY` is set, the app can use AI to:
- Generate more personalized explanations
- Suggest alternatives not in the seed database
- Improve matching based on natural language constraints

### Fallback

Without API keys, the app uses the rule-based engine with 80+ curated seed recommendations. This provides a fully functional experience.

### Environment Variables

```
AI_PROVIDER=openrouter
OPENROUTER_API_KEY=your-key
OPENAI_API_KEY=your-key
AI_MODEL=openai/gpt-4o-mini
```
