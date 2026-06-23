// src/types/index.ts
export interface User {
  id: string
  email: string
  username: string
  display_name: string
  avatar_url?: string
  bio?: string
  created_at: string
}

export interface Recommendation {
  id?: string
  user_id?: string
  title: string
  category: Category
  description: string
  why_good: string
  best_for: string
  mood_tags: string[]
  interest_tags: string[]
  tags: string[]
  time_needed: string
  cost_level: CostLevel
  location_type: LocationType
  external_link?: string
  image_url?: string
  likes_count?: number
  saves_count?: number
  created_at?: string
  user?: User
  is_liked?: boolean
  is_saved?: boolean
}

export type Category =
  | 'activities' | 'food' | 'movies' | 'tv_shows' | 'books'
  | 'music' | 'podcasts' | 'games' | 'places' | 'date_ideas'
  | 'group_ideas' | 'solo_ideas' | 'study_break' | 'weekend_ideas'
  | 'free_ideas' | 'low_budget'

export type CostLevel = 'free' | 'low' | 'medium' | 'high'
export type LocationType = 'any' | 'online' | 'local' | 'outdoor' | 'indoor'
export type Mood = 'bored' | 'tired' | 'adventurous' | 'cozy' | 'social' | 'focused' | 'romantic' | 'creative' | 'nostalgic' | 'energetic' | 'relaxed'
export type EnergyLevel = 'low' | 'medium' | 'high'
export type SocialContext = 'alone' | 'friend' | 'group' | 'date' | 'family'
export type TimeAvailable = 'under_15' | '30_min' | '1_hour' | '2_hours' | 'half_day' | 'full_day'

export interface RecommendationRequest {
  mood?: Mood
  category?: Category | 'anything'
  time_available?: TimeAvailable
  budget?: CostLevel
  social_context?: SocialContext
  energy_level?: EnergyLevel
  interests?: string[]
  constraints?: string
  location_preference?: LocationType
}

export interface RecommendationResult {
  recommendation: Recommendation
  confidence: number
  reason: string
  tags: string[]
}

export const CATEGORIES: { value: Category | 'anything'; label: string; emoji: string }[] = [
  { value: 'anything', label: 'Anything', emoji: '✨' },
  { value: 'activities', label: 'Activities', emoji: '🎯' },
  { value: 'food', label: 'Food', emoji: '🍕' },
  { value: 'movies', label: 'Movies', emoji: '🎬' },
  { value: 'tv_shows', label: 'TV Shows', emoji: '📺' },
  { value: 'books', label: 'Books', emoji: '📚' },
  { value: 'music', label: 'Music', emoji: '🎵' },
  { value: 'podcasts', label: 'Podcasts', emoji: '🎧' },
  { value: 'games', label: 'Games', emoji: '🎮' },
  { value: 'places', label: 'Places', emoji: '📍' },
  { value: 'date_ideas', label: 'Date Ideas', emoji: '💕' },
  { value: 'group_ideas', label: 'Group Ideas', emoji: '👥' },
  { value: 'solo_ideas', label: 'Solo Ideas', emoji: '🧘' },
  { value: 'free_ideas', label: 'Free Ideas', emoji: '🆓' },
  { value: 'low_budget', label: 'Low Budget', emoji: '💰' },
]

export const MOODS: { value: Mood; label: string; emoji: string }[] = [
  { value: 'bored', label: 'Bored', emoji: '😐' },
  { value: 'tired', label: 'Tired', emoji: '😴' },
  { value: 'adventurous', label: 'Adventurous', emoji: '🏔️' },
  { value: 'cozy', label: 'Cozy', emoji: '🛋️' },
  { value: 'social', label: 'Social', emoji: '🎉' },
  { value: 'focused', label: 'Focused', emoji: '🎯' },
  { value: 'romantic', label: 'Romantic', emoji: '💕' },
  { value: 'creative', label: 'Creative', emoji: '🎨' },
  { value: 'nostalgic', label: 'Nostalgic', emoji: '📼' },
  { value: 'energetic', label: 'Energetic', emoji: '⚡' },
  { value: 'relaxed', label: 'Relaxed', emoji: '🌿' },
]

export const TIME_OPTIONS: { value: TimeAvailable; label: string }[] = [
  { value: 'under_15', label: 'Under 15 min' },
  { value: '30_min', label: '30 min' },
  { value: '1_hour', label: '1 hour' },
  { value: '2_hours', label: '2 hours' },
  { value: 'half_day', label: 'Half day' },
  { value: 'full_day', label: 'Full day' },
]

export const BUDGET_OPTIONS: { value: CostLevel; label: string; emoji: string }[] = [
  { value: 'free', label: 'Free', emoji: '🆓' },
  { value: 'low', label: 'Low', emoji: '💵' },
  { value: 'medium', label: 'Medium', emoji: '💰' },
  { value: 'high', label: 'High', emoji: '💎' },
]

export const SOCIAL_OPTIONS: { value: SocialContext; label: string; emoji: string }[] = [
  { value: 'alone', label: 'Just me', emoji: '🧘' },
  { value: 'friend', label: 'A friend', emoji: '👤' },
  { value: 'group', label: 'Group', emoji: '👥' },
  { value: 'date', label: 'Date', emoji: '💕' },
  { value: 'family', label: 'Family', emoji: '🏠' },
]

export const ENERGY_OPTIONS: { value: EnergyLevel; label: string; emoji: string }[] = [
  { value: 'low', label: 'Low', emoji: '🪫' },
  { value: 'medium', label: 'Medium', emoji: '🔋' },
  { value: 'high', label: 'High', emoji: '⚡' },
]
