// src/pages/Home.tsx
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Compass, Plus, ArrowRight, Sparkles } from 'lucide-react'
import { CATEGORIES, MOODS } from '../types'

const floatingCards = [
  { emoji: '🎬', text: 'Movie night', color: 'from-rose-400 to-pink-500' },
  { emoji: '🍕', text: 'Cheap food spot', color: 'from-amber-400 to-orange-500' },
  { emoji: '🚶', text: '30-min walk', color: 'from-emerald-400 to-teal-500' },
  { emoji: '📚', text: 'Book to read', color: 'from-blue-400 to-indigo-500' },
  { emoji: '👥', text: 'Group activity', color: 'from-violet-400 to-purple-500' },
  { emoji: '💕', text: 'Date idea', color: 'from-pink-400 to-rose-500' },
  { emoji: '🌿', text: 'Relaxing show', color: 'from-green-400 to-emerald-500' },
]

export function Home() {
  return (
    <div className="pb-24 sm:pb-0">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4">
        {/* Background gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-[#FF6B6B]/20 to-[#A78BFA]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-[#4ECDC4]/15 to-[#38BDF8]/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#F4B86A]/10 to-[#FF6B6B]/10 rounded-full blur-3xl" />
        </div>

        {/* Floating cards */}
        <div className="absolute inset-0 pointer-events-none hidden lg:block">
          {floatingCards.map((card, i) => (
            <motion.div
              key={i}
              className={`absolute glass rounded-2xl px-4 py-3 shadow-xl bg-gradient-to-r ${card.color} bg-opacity-10`}
              style={{ top: `${15 + (i * 12) % 60}%`, left: `${5 + (i * 17) % 85}%` }}
              animate={{
                y: [0, -15, 0],
                rotate: [0, i % 2 === 0 ? 3 : -3, 0],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.3,
              }}
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-[#1A1A2E]">
                <span className="text-lg">{card.emoji}</span>
                {card.text}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-white/30 text-sm font-medium text-[#4A4A6A] mb-8">
              <Sparkles className="w-4 h-4 text-[#F4B86A]" />
              Know what to do next
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-7xl font-extrabold leading-[1.1] mb-6"
          >
            <span className="bg-gradient-to-r from-[#1A1A2E] to-[#4A4A6A] bg-clip-text text-transparent">Recommendations</span>
            <br />
            <span className="bg-gradient-to-r from-[#FF6B6B] via-[#A78BFA] to-[#4ECDC4] bg-clip-text text-transparent">for the moments</span>
            <br />
            <span className="bg-gradient-to-r from-[#1A1A2E] to-[#4A4A6A] bg-clip-text text-transparent">you cannot decide.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-[#4A4A6A] max-w-xl mx-auto mb-10 leading-relaxed"
          >
            Tell Recoshare your mood, time, budget, and who you are with.
            Get personalized ideas for activities, food, movies, shows, books, games, and more.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/recommend"
              className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#FF6B6B] to-[#A78BFA] text-white font-bold text-lg shadow-xl shadow-coral/25 hover:shadow-coral/40 hover:scale-[1.02] transition-all"
            >
              <Compass className="w-5 h-5" />
              Get Recommendations
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/share"
              className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/40 text-[#1A1A2E] font-bold text-lg shadow-lg hover:bg-white/90 hover:scale-[1.02] transition-all"
            >
              <Plus className="w-5 h-5" />
              Share an Idea
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Category chips */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-8 text-[#1A1A2E]">What are you looking for?</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {CATEGORIES.slice(0, 12).map((cat) => (
            <Link
              key={cat.value}
              to={`/recommend?category=${cat.value}`}
              className="group flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/40 shadow-sm hover:shadow-md hover:scale-[1.03] transition-all"
            >
              <span className="text-xl">{cat.emoji}</span>
              <span className="font-semibold text-sm text-[#1A1A2E]">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-12 text-[#1A1A2E]">How it works</h2>
        <div className="grid sm:grid-cols-3 gap-8">
          {[
            { step: '1', title: 'Tell us about your moment', desc: 'Mood, time, budget, who you are with, and what you are in the mood for.', emoji: '💭' },
            { step: '2', title: 'Get personalized picks', desc: 'We match your vibe with curated recommendations from our community.', emoji: '✨' },
            { step: '3', title: 'Save, share, and enjoy', desc: 'Save favorites, share your own discoveries, and never be bored again.', emoji: '🎉' },
          ].map((item) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF6B6B]/10 to-[#A78BFA]/10 flex items-center justify-center mx-auto mb-4 text-3xl">
                {item.emoji}
              </div>
              <div className="text-xs font-bold text-[#A78BFA] mb-2">STEP {item.step}</div>
              <h3 className="font-bold text-lg text-[#1A1A2E] mb-2">{item.title}</h3>
              <p className="text-sm text-[#4A4A6A] leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-[#1A1A2E]">Trending now</h2>
          <Link to="/browse" className="text-sm font-semibold text-[#A78BFA] hover:text-[#7C3AED] flex items-center gap-1">
            See all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: 'The Grand Budapest Hotel', cat: 'Movies', emoji: '🎬', color: 'from-rose-400 to-pink-500' },
            { title: 'Stardew Valley', cat: 'Games', emoji: '🎮', color: 'from-emerald-400 to-teal-500' },
            { title: 'Project Hail Mary', cat: 'Books', emoji: '📚', color: 'from-blue-400 to-indigo-500' },
            { title: 'Sunset Photography Walk', cat: 'Activities', emoji: '📸', color: 'from-amber-400 to-orange-500' },
            { title: 'Thai Green Curry', cat: 'Food', emoji: '🍛', color: 'from-green-400 to-emerald-500' },
            { title: 'Severance S1', cat: 'TV Shows', emoji: '📺', color: 'from-violet-400 to-purple-500' },
          ].map((item, i) => (
            <Link
              key={i}
              to="/browse"
              className="group relative overflow-hidden rounded-2xl bg-white/70 backdrop-blur-sm border border-white/40 p-5 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all"
            >
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${item.color} opacity-10 rounded-bl-[4rem]`} />
              <span className="text-3xl mb-3 block">{item.emoji}</span>
              <div className="text-xs font-semibold text-[#8888A0] uppercase tracking-wider mb-1">{item.cat}</div>
              <h3 className="font-bold text-[#1A1A2E] group-hover:text-[#A78BFA] transition-colors">{item.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="rounded-3xl bg-gradient-to-br from-[#FF6B6B]/10 via-[#A78BFA]/10 to-[#4ECDC4]/10 p-12 border border-white/40">
          <h2 className="text-3xl font-bold text-[#1A1A2E] mb-4">Ready to find your next favorite thing?</h2>
          <p className="text-[#4A4A6A] mb-8 max-w-md mx-auto">Stop scrolling. Start doing. Tell us your mood and we will handle the rest.</p>
          <Link
            to="/recommend"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#FF6B6B] to-[#A78BFA] text-white font-bold text-lg shadow-xl shadow-coral/25 hover:shadow-coral/40 hover:scale-[1.02] transition-all"
          >
            <Compass className="w-5 h-5" />
            Get Recommendations
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E5E7EB]/50 py-8 text-center text-sm text-[#8888A0]">
        <p>Recoshare — Recommendations for the moments you cannot decide.</p>
      </footer>
    </div>
  )
}
