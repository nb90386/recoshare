// src/pages/Share.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Send } from 'lucide-react'
import { CATEGORIES, Category, CostLevel, LocationType } from '../types'

export function Share() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    title: '',
    category: '' as Category | '',
    description: '',
    why_good: '',
    best_for: '',
    mood_tags: [] as string[],
    time_needed: '',
    cost_level: '' as CostLevel | '',
    location_type: '' as LocationType | '',
    tags: '',
    external_link: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save to Supabase
    // For now, we show success and store locally
    const newRec = {
      id: Date.now().toString(),
      user_id: 'guest',
      title: form.title,
      category: form.category || 'activities',
      description: form.description,
      why_good: form.why_good,
      best_for: form.best_for,
      mood_tags: form.mood_tags,
      interest_tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      time_needed: form.time_needed,
      cost_level: form.cost_level || 'free',
      location_type: form.location_type || 'any',
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      external_link: form.external_link || undefined,
      image_url: undefined,
      likes_count: 0,
      saves_count: 0,
      created_at: new Date().toISOString(),
    }
    // Save to localStorage for persistence
    const existing = JSON.parse(localStorage.getItem('recoshare_user_recs') || '[]')
    existing.unshift(newRec)
    localStorage.setItem('recoshare_user_recs', JSON.stringify(existing))
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }} className="w-20 h-20 rounded-full bg-gradient-to-br from-[#4ECDC4] to-[#38BDF8] flex items-center justify-center mx-auto mb-6 shadow-xl">
          <span className="text-4xl">🎉</span>
        </motion.div>
        <h1 className="text-3xl font-bold text-[#1A1A2E] mb-4">Recommendation shared!</h1>
        <p className="text-[#4A4A6A] mb-8">Your recommendation is now live for others to discover.</p>
        <div className="flex items-center justify-center gap-4">
          <button onClick={() => { setSubmitted(false); setForm({ title: '', category: '', description: '', why_good: '', best_for: '', mood_tags: [], time_needed: '', cost_level: '', location_type: '', tags: '', external_link: '' }); }} className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF6B6B] to-[#A78BFA] text-white font-bold shadow-lg">
            Share another
          </button>
          <a href="/browse" className="px-6 py-3 rounded-xl bg-white/70 border border-white/40 font-bold text-[#4A4A6A]">
            Browse recommendations
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 pb-24 sm:pb-8">
      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF6B6B]/10 to-[#A78BFA]/10 flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-6 h-6 text-[#A78BFA]" />
        </div>
        <h1 className="text-3xl font-bold text-[#1A1A2E] mb-2">Share a recommendation</h1>
        <p className="text-[#4A4A6A]">Help others discover something great</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-[#1A1A2E] mb-2">Title *</label>
          <input
            type="text"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="e.g., The Best Grilled Cheese"
            className="w-full px-4 py-3 rounded-xl bg-white/70 border border-white/40 text-[#1A1A2E] placeholder-[#8888A0] focus:outline-none focus:ring-2 focus:ring-[#A78BFA]/30"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1A1A2E] mb-2">Category *</label>
          <select
            required
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
            className="w-full px-4 py-3 rounded-xl bg-white/70 border border-white/40 text-[#1A1A2E] focus:outline-none focus:ring-2 focus:ring-[#A78BFA]/30"
          >
            <option value="">Select a category</option>
            {CATEGORIES.filter(c => c.value !== 'anything').map((cat) => (
              <option key={cat.value} value={cat.value}>{cat.emoji} {cat.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1A1A2E] mb-2">Description *</label>
          <textarea
            required
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Describe this recommendation..."
            className="w-full px-4 py-3 rounded-xl bg-white/70 border border-white/40 text-[#1A1A2E] placeholder-[#8888A0] focus:outline-none focus:ring-2 focus:ring-[#A78BFA]/30 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1A1A2E] mb-2">Why is it good? *</label>
          <textarea
            required
            rows={2}
            value={form.why_good}
            onChange={(e) => setForm({ ...form, why_good: e.target.value })}
            placeholder="What makes this worth recommending?"
            className="w-full px-4 py-3 rounded-xl bg-white/70 border border-white/40 text-[#1A1A2E] placeholder-[#8888A0] focus:outline-none focus:ring-2 focus:ring-[#A78BFA]/30 resize-none"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[#1A1A2E] mb-2">Time needed</label>
            <input
              type="text"
              value={form.time_needed}
              onChange={(e) => setForm({ ...form, time_needed: e.target.value })}
              placeholder="e.g., 30 min, 2 hours"
              className="w-full px-4 py-3 rounded-xl bg-white/70 border border-white/40 text-[#1A1A2E] placeholder-[#8888A0] focus:outline-none focus:ring-2 focus:ring-[#A78BFA]/30"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#1A1A2E] mb-2">Cost</label>
            <select
              value={form.cost_level}
              onChange={(e) => setForm({ ...form, cost_level: e.target.value as CostLevel })}
              className="w-full px-4 py-3 rounded-xl bg-white/70 border border-white/40 text-[#1A1A2E] focus:outline-none focus:ring-2 focus:ring-[#A78BFA]/30"
            >
              <option value="">Select cost</option>
              <option value="free">Free</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1A1A2E] mb-2">Tags (comma separated)</label>
          <input
            type="text"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            placeholder="e.g., cozy, quick, solo, creative"
            className="w-full px-4 py-3 rounded-xl bg-white/70 border border-white/40 text-[#1A1A2E] placeholder-[#8888A0] focus:outline-none focus:ring-2 focus:ring-[#A78BFA]/30"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1A1A2E] mb-2">External link (optional)</label>
          <input
            type="url"
            value={form.external_link}
            onChange={(e) => setForm({ ...form, external_link: e.target.value })}
            placeholder="https://..."
            className="w-full px-4 py-3 rounded-xl bg-white/70 border border-white/40 text-[#1A1A2E] placeholder-[#8888A0] focus:outline-none focus:ring-2 focus:ring-[#A78BFA]/30"
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-[#FF6B6B] to-[#A78BFA] text-white font-bold text-lg shadow-xl shadow-coral/25 hover:shadow-coral/40 hover:scale-[1.01] transition-all"
        >
          <Send className="w-5 h-5" />
          Share Recommendation
        </button>
      </form>
    </div>
  )
}
