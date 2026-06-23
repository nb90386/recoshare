// src/pages/Browse.tsx
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Heart, Bookmark, BookmarkCheck, Share2, Filter } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CATEGORIES, Category, Recommendation } from '../types'
import { store } from '../lib/store'

export function Browse() {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const { recommendations, isLoading, fetchBrowse, search, toggleSave, toggleLike, isSaved, isLiked } = store

  useEffect(() => {
    if (searchQuery.length > 2) {
      search(searchQuery)
    } else {
      fetchBrowse(activeCategory === 'all' ? undefined : activeCategory)
    }
  }, [activeCategory, searchQuery])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pb-24 sm:pb-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1A1A2E] mb-2">Browse recommendations</h1>
        <p className="text-[#4A4A6A]">Discover ideas from the community</p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8888A0]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search recommendations..."
          className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/70 border border-white/40 text-[#1A1A2E] placeholder-[#8888A0] focus:outline-none focus:ring-2 focus:ring-[#A78BFA]/30 focus:border-[#A78BFA]/30 transition-all"
        />
      </div>

      {/* Category filters */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        <FilterChip active={activeCategory === 'all'} onClick={() => { setActiveCategory('all'); setSearchQuery(''); }} label="All" emoji="✨" />
        {CATEGORIES.filter(c => c.value !== 'anything').map((cat) => (
          <FilterChip
            key={cat.value}
            active={activeCategory === cat.value}
            onClick={() => { setActiveCategory(cat.value); setSearchQuery(''); }}
            label={cat.label}
            emoji={cat.emoji}
          />
        ))}
      </div>

      {/* Results grid */}
      {isLoading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white/50 rounded-2xl p-5 h-48 animate-pulse" />
          ))}
        </div>
      ) : recommendations.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-lg font-bold text-[#1A1A2E] mb-2">No recommendations found</p>
          <p className="text-[#4A4A6A]">Try a different category or search term</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendations.map((rec, i) => (
            <RecCard key={rec.id!} rec={rec} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}

function FilterChip({ active, onClick, label, emoji }: { active: boolean; onClick: () => void; label: string; emoji: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${active ? 'bg-gradient-to-r from-[#FF6B6B] to-[#A78BFA] text-white shadow-md' : 'bg-white/70 border border-white/40 text-[#4A4A6A] hover:bg-white/90'}`}
    >
      <span>{emoji}</span>
      {label}
    </button>
  )
}

function RecCard({ rec, index }: { rec: Recommendation; index: number }) {
  const { toggleSave, toggleLike, isSaved, isLiked } = store
  const saved = isSaved(rec.id)
  const liked = isLiked(rec.id)
  const cat = CATEGORIES.find(c => c.value === rec.category)

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white/70 backdrop-blur-sm border border-white/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group"
    >
      <Link to={`/recommendation/${rec.id ?? ""}`} className="block p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B6B]/10 to-[#A78BFA]/10 flex items-center justify-center text-xl">
            {cat?.emoji || '✨'}
          </div>
          <div>
            <h3 className="font-bold text-[#1A1A2E] group-hover:text-[#A78BFA] transition-colors line-clamp-1">{rec.title}</h3>
            <p className="text-xs text-[#8888A0] capitalize">{rec.category.replace('_', ' ')}</p>
          </div>
        </div>
        <p className="text-sm text-[#4A4A6A] line-clamp-2 mb-3">{rec.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {rec.tags.slice(0, 3).map((tag, i) => (
            <span key={i} className="px-2 py-0.5 rounded-md bg-[#F5F5F5] text-[10px] text-[#4A4A6A] font-medium">{tag}</span>
          ))}
        </div>
      </Link>
      <div className="flex items-center justify-between px-5 py-3 border-t border-[#E5E7EB]/30">
        <div className="flex items-center gap-1.5">
          <button onClick={(e) => { e.preventDefault(); toggleLike(rec.id); }} className={`p-1.5 rounded-lg transition-all ${liked ? 'text-rose-500' : 'text-[#8888A0] hover:text-rose-400'}`}>
            <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
          </button>
          <span className="text-xs text-[#8888A0]">{rec.likes_count! + (liked ? 1 : 0)}</span>
          <button onClick={(e) => { e.preventDefault(); toggleSave(rec.id); }} className={`p-1.5 rounded-lg transition-all ${saved ? 'text-[#A78BFA]' : 'text-[#8888A0] hover:text-[#A78BFA]'}`}>
            {saved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>
        <span className="text-xs text-[#8888A0]">{rec.time_needed}</span>
      </div>
    </motion.div>
  )
}
