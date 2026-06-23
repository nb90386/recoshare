// src/pages/Detail.tsx
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Heart, Bookmark, BookmarkCheck, Share2, Clock, DollarSign, MapPin, Tag, Sparkles } from 'lucide-react'
import { CATEGORIES } from '../types'
import { store } from '../lib/store'
import { getAllRecommendations } from '../lib/recommender'

export function Detail() {
  const { id } = useParams()
  const allRecs = getAllRecommendations()
  const rec = allRecs.find(r => r.id === id) || allRecs[0]
  const { toggleSave, toggleLike, isSaved, isLiked } = store
  const saved = isSaved(rec.id)
  const liked = isLiked(rec.id)
  const cat = CATEGORIES.find(c => c.value === rec.category)

  // Get related recommendations
  const related = allRecs
    .filter(r => r.id !== rec.id && (r.category === rec.category || r.tags.some(t => rec.tags.includes(t))))
    .slice(0, 3)

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 pb-24 sm:pb-8">
      <Link to="/browse" className="inline-flex items-center gap-2 text-sm text-[#8888A0] hover:text-[#4A4A6A] mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to browse
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF6B6B]/10 to-[#A78BFA]/10 flex items-center justify-center text-3xl flex-shrink-0">
            {cat?.emoji || '✨'}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A2E] mb-2">{rec.title}</h1>
            <div className="flex items-center gap-3 text-sm text-[#8888A0]">
              <span className="capitalize px-2.5 py-1 rounded-lg bg-[#F5F5F5] font-medium">{rec.category.replace('_', ' ')}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{rec.time_needed}</span>
              <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" />{rec.cost_level}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white/70 backdrop-blur-sm border border-white/40 rounded-2xl p-6 mb-6">
          <h2 className="font-bold text-[#1A1A2E] mb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#A78BFA]" /> About
          </h2>
          <p className="text-[#4A4A6A] leading-relaxed mb-4">{rec.description}</p>
          <p className="text-[#4A4A6A] leading-relaxed">{rec.why_good}</p>
        </div>

        {/* Details */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-white/70 backdrop-blur-sm border border-white/40 rounded-2xl p-5">
            <h3 className="font-bold text-[#1A1A2E] mb-2 text-sm">Best for</h3>
            <p className="text-sm text-[#4A4A6A]">{rec.best_for}</p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm border border-white/40 rounded-2xl p-5">
            <h3 className="font-bold text-[#1A1A2E] mb-2 text-sm">Mood</h3>
            <div className="flex flex-wrap gap-1.5">
              {rec.mood_tags.map((mood, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-[#FF6B6B]/10 to-[#A78BFA]/10 text-xs font-semibold text-[#A78BFA] capitalize">{mood}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {rec.tags.map((tag, i) => (
            <span key={i} className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/70 border border-white/40 text-xs font-medium text-[#4A4A6A]">
              <Tag className="w-3 h-3" />{tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mb-10">
          <button onClick={() => toggleLike(rec.id)} className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all ${liked ? 'bg-rose-100 text-rose-600' : 'bg-white/70 border border-white/40 text-[#4A4A6A] hover:bg-rose-50'}`}>
            <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
            {rec.likes_count! + (liked ? 1 : 0)} Likes
          </button>
          <button onClick={() => toggleSave(rec.id)} className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all ${saved ? 'bg-[#A78BFA]/10 text-[#A78BFA]' : 'bg-white/70 border border-white/40 text-[#4A4A6A] hover:bg-[#A78BFA]/5'}`}>
            {saved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            {saved ? 'Saved' : 'Save'}
          </button>
          <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/70 border border-white/40 font-semibold text-sm text-[#4A4A6A] hover:bg-white/90 transition-all">
            <Share2 className="w-4 h-4" /> Share
          </button>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-4">You might also like</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map((r) => {
                const rCat = CATEGORIES.find(c => c.value === r.category)
                return (
                  <Link key={r.id} to={`/recommendation/${r.id}`} className="bg-white/70 backdrop-blur-sm border border-white/40 rounded-2xl p-4 hover:shadow-md transition-all group">
                    <span className="text-2xl mb-2 block">{rCat?.emoji}</span>
                    <h3 className="font-bold text-sm text-[#1A1A2E] group-hover:text-[#A78BFA] transition-colors line-clamp-1">{r.title}</h3>
                    <p className="text-xs text-[#8888A0] capitalize">{r.category.replace('_', ' ')}</p>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
