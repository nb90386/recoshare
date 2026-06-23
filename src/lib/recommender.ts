// src/lib/recommender.ts
import type { Recommendation, RecommendationRequest, RecommendationResult } from '../types'
import { SEED_RECOMMENDATIONS } from './seed-data'

function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Date.now().toString(36)
}

function scoreRecommendation(rec: Recommendation, req: RecommendationRequest): { score: number; reasons: string[] } {
  let score = 50 // base score
  const reasons: string[] = []

  // Category match
  if (req.category && req.category !== 'anything') {
    if (rec.category === req.category) {
      score += 20
      reasons.push(`Matches your category: ${req.category}`)
    } else {
      score -= 15
    }
  }

  // Mood match
  if (req.mood) {
    if (rec.mood_tags.includes(req.mood)) {
      score += 15
      reasons.push(`Fits your ${req.mood} mood`)
    }
  }

  // Budget match
  if (req.budget) {
    const budgetOrder = ['free', 'low', 'medium', 'high']
    const reqIdx = budgetOrder.indexOf(req.budget)
    const recIdx = budgetOrder.indexOf(rec.cost_level)
    if (recIdx <= reqIdx) {
      score += 10
      reasons.push(`Within your ${req.budget} budget`)
    } else {
      score -= 10
    }
  }

  // Time match
  if (req.time_available) {
    const timeMap: Record<string, number> = { 'under_15': 15, '30_min': 30, '1_hour': 60, '2_hours': 120, 'half_day': 360, 'full_day': 720 }
    const availableMinutes = timeMap[req.time_available] || 60
    const recTime = rec.time_needed.toLowerCase()
    let recMinutes = 60
    if (recTime.includes('under 15') || recTime.includes('15 min')) recMinutes = 15
    else if (recTime.includes('20-30') || recTime.includes('30 min')) recMinutes = 30
    else if (recTime.includes('45 min') || recTime.includes('1 hour')) recMinutes = 60
    else if (recTime.includes('1-2') || recTime.includes('2 hour')) recMinutes = 120
    else if (recTime.includes('half day')) recMinutes = 360
    else if (recTime.includes('full day')) recMinutes = 720
    else if (recTime.includes('infinite') || recTime.includes('endless')) recMinutes = availableMinutes

    if (recMinutes <= availableMinutes) {
      score += 10
      reasons.push(`Fits your available time`)
    } else {
      score -= 5
    }
  }

  // Social context match
  if (req.social_context) {
    const socialTags: Record<string, string[]> = {
      'alone': ['solo', 'individual', 'personal'],
      'friend': ['friend', 'duo', 'pair'],
      'group': ['group', 'party', 'team', 'friends'],
      'date': ['date', 'romantic', 'couple', 'partner'],
      'family': ['family', 'kids', 'children', 'all ages'],
    }
    const tags = socialTags[req.social_context] || []
    const hasMatch = tags.some(t => rec.tags.some((rt: string) => rt.includes(t)) || rec.best_for.toLowerCase().includes(t))
    if (hasMatch) {
      score += 10
      reasons.push(`Great for ${req.social_context}`)
    }
  }

  // Energy level match
  if (req.energy_level) {
    const energyMap: Record<string, string[]> = {
      'low': ['relaxed', 'cozy', 'tired', 'calm', 'gentle', 'peaceful'],
      'medium': ['bored', 'curious', 'focused', 'creative', 'social'],
      'high': ['energetic', 'adventurous', 'active', 'intense', 'exciting'],
    }
    const energyTags = energyMap[req.energy_level] || []
    const hasMatch = energyTags.some(e => rec.mood_tags.includes(e as any) || rec.tags.some(t => t.includes(e)))
    if (hasMatch) {
      score += 8
      reasons.push(`Matches your ${req.energy_level} energy level`)
    }
  }

  // Interest match
  if (req.interests && req.interests.length > 0) {
    const interestMatches = req.interests.filter(i =>
      rec.interest_tags.some(t => t.toLowerCase().includes(i.toLowerCase())) ||
      rec.tags.some(t => t.toLowerCase().includes(i.toLowerCase()))
    )
    if (interestMatches.length > 0) {
      score += interestMatches.length * 5
      reasons.push(`Matches your interests: ${interestMatches.slice(0, 3).join(', ')}`)
    }
  }

  // Location preference
  if (req.location_preference && req.location_preference !== 'any') {
    if (rec.location_type === req.location_preference || rec.location_type === 'any') {
      score += 5
    }
  }

  // Add some randomness to avoid identical results
  score += Math.random() * 10 - 5

  return { score: Math.max(0, Math.min(100, score)), reasons }
}

export function getRecommendations(req: RecommendationRequest, count: number = 8): RecommendationResult[] {
  const scored = SEED_RECOMMENDATIONS.map(rec => {
    const { score, reasons } = scoreRecommendation(rec, req)
    return {
      recommendation: {
        ...rec,
        id: generateId(),
        user_id: 'seed',
        created_at: new Date().toISOString(),
        likes_count: Math.floor(Math.random() * 50),
        saves_count: Math.floor(Math.random() * 30),
      } as Recommendation,
      confidence: Math.round(score),
      reason: reasons[0] || `Great ${rec.category} recommendation`,
      tags: rec.tags.slice(0, 4),
    }
  })

  scored.sort((a, b) => b.confidence - a.confidence)
  return scored.slice(0, count)
}

export function getRecommendationsByCategory(category: string): Recommendation[] {
  return SEED_RECOMMENDATIONS
    .filter(r => r.category === category)
    .map(r => ({
      ...r,
      id: generateId(),
      user_id: 'seed',
      created_at: new Date().toISOString(),
      likes_count: Math.floor(Math.random() * 50),
      saves_count: Math.floor(Math.random() * 30),
    }))
}

export function getAllRecommendations(): Recommendation[] {
  return SEED_RECOMMENDATIONS.map(r => ({
    ...r,
    id: generateId(),
    user_id: 'seed',
    created_at: new Date().toISOString(),
    likes_count: Math.floor(Math.random() * 50),
    saves_count: Math.floor(Math.random() * 30),
  }))
}

export function getRecommendationById(id: string): Recommendation | undefined {
  const all = getAllRecommendations()
  return all.find(r => r.id === id)
}

export function searchRecommendations(query: string): Recommendation[] {
  const q = query.toLowerCase()
  return SEED_RECOMMENDATIONS
    .filter(r =>
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.tags.some(t => t.toLowerCase().includes(q)) ||
      r.category.toLowerCase().includes(q)
    )
    .map(r => ({
      ...r,
      id: generateId(),
      user_id: 'seed',
      created_at: new Date().toISOString(),
      likes_count: Math.floor(Math.random() * 50),
      saves_count: Math.floor(Math.random() * 30),
    }))
}
