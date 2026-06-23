// src/lib/store.ts
import { useState, useCallback } from 'react'
import type { Recommendation, RecommendationRequest, RecommendationResult } from '../types'
import { getRecommendations, getAllRecommendations, searchRecommendations } from './recommender'

// Simple global state using a custom hook pattern
type Listener = () => void

class AppStore {
  private listeners: Set<Listener> = new Set()
  private _recommendations: Recommendation[] = []
  private _savedIds: Set<string> = new Set()
  private _likedIds: Set<string> = new Set()
  private _results: RecommendationResult[] = []
  private _isLoading = false

  get recommendations() { return this._recommendations }
  get savedIds() { return this._savedIds }
  get likedIds() { return this._likedIds }
  get results() { return this._results }
  get isLoading() { return this._isLoading }

  subscribe(listener: Listener) {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  private notify() {
    this.listeners.forEach(l => l())
  }

  async fetchRecommendations(req: RecommendationRequest) {
    this._isLoading = true
    this.notify()
    // Simulate a small delay for UX
    await new Promise(r => setTimeout(r, 800))
    this._results = getRecommendations(req)
    this._isLoading = false
    this.notify()
  }

  async fetchBrowse(category?: string) {
    this._isLoading = true
    this.notify()
    await new Promise(r => setTimeout(r, 400))
    this._recommendations = category && category !== 'all'
      ? this._recommendations.filter(r => r.category === category)
      : getAllRecommendations()
    this._isLoading = false
    this.notify()
  }

  async search(query: string) {
    this._isLoading = true
    this.notify()
    await new Promise(r => setTimeout(r, 300))
    this._recommendations = searchRecommendations(query)
    this._isLoading = false
    this.notify()
  }

  toggleSave(id: string | undefined) {
    if (!id) return
    if (this._savedIds.has(id)) {
      this._savedIds.delete(id)
    } else {
      this._savedIds.add(id)
    }
    this.notify()
  }

  toggleLike(id: string | undefined) {
    if (!id) return
    if (this._likedIds.has(id)) {
      this._likedIds.delete(id)
    } else {
      this._likedIds.add(id)
    }
    this.notify()
  }

  isSaved(id: string | undefined) { return id ? this._savedIds.has(id) : false }
  isLiked(id: string | undefined) { return id ? this._likedIds.has(id) : false }
}

export const store = new AppStore()

export function useStore() {
  const [, setTick] = useState(0)
  const rerender = useCallback(() => setTick(t => t + 1), [])

  // Subscribe on mount
  useState(() => {
    const unsub = store.subscribe(rerender)
    return unsub
  })

  return store
}
