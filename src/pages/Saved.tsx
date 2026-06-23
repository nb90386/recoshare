// src/pages/Saved.tsx
import { motion } from 'framer-motion'
import { Bookmark, Heart, Share2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CATEGORIES } from '../types'
import { store } from '../lib/store'
import { getAllRecommendations } from '../lib/recommender'

export function Saved() {
  const { savedIds, toggleSave, toggleLike, isLiked } = store
  const allRecs = getAllRecommendations()
  const savedRecs = allRecs.filter(r => r.id && savedIds.has(r.id))

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-24 sm:pb-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1A1A2E] mb-2">Saved recommendations</h1>
        <p className="text-[#4A4A6A]">{savedRecs.length} items saved</p>
      </div>

      {savedRecs.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-full bg-[#F5F5F5] flex items-center justify-center mx-auto mb-6">
            <Bookmark className="w-10 h-10 text-[#8888A0]" />
          </div>
          <h2 className="text-xl font-bold text-[#1A1A2E] mb-2">No saved recommendations yet</h2>
          <p className="text-[#4A4A6A] mb-6">Start exploring and save ideas you love</p>
          <Link to="/browse" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF6B6B] to-[#A78BFA] text-white font-bold shadow-lg">
            Browse recommendations
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {savedRecs.map((rec, i) => {
            const cat = CATEGORIES.find(c => c.value === rec.category)
            const liked = isLiked(rec.id)
            return (
              <motion.div
                key={rec.id!}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white/70 backdrop-blur-sm border border-white/40 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all group"
              >
                <Link to={`/recommendation/${rec.id ?? ""}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B6B]/10 to-[#A78BFA]/10 flex items-center justify-center text-xl">
                      {cat?.emoji || '✨'}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1A1A2E] group-hover:text-[#A78BFA] transition-colors">{rec.title}</h3>
                      <p className="text-xs text-[#8888A0] capitalize">{rec.category.replace('_', ' ')}</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#4A4A6A] line-clamp-2 mb-3">{rec.description}</p>
                </Link>
                <div className="flex items-center justify-between pt-3 border-t border-[#E5E7EB]/30">
                  <div className="flex items-center gap-2">
                    <button onClick={() => toggleLike(rec.id)} className={`p-1.5 rounded-lg ${liked ? 'text-rose-500' : 'text-[#8888A0]'}`}>
                      <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                    </button>
                    <button onClick={() => toggleSave(rec.id)} className="p-1.5 rounded-lg text-[#A78BFA]">
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                  <span className="text-xs text-[#8888A0]">{rec.time_needed}</span>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
