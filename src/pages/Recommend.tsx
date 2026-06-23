// src/pages/Recommend.tsx
import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, RefreshCw, Sparkles, Clock, DollarSign, Users, Zap, Heart, Share2, Bookmark, BookmarkCheck, ChevronDown } from 'lucide-react'
import { RecommendationRequest, Category, CATEGORIES, MOODS, TIME_OPTIONS, BUDGET_OPTIONS, SOCIAL_OPTIONS, ENERGY_OPTIONS, RecommendationResult } from '../types'
import { store } from '../lib/store'

export function Recommend() {
  const [searchParams] = useSearchParams()
  const [step, setStep] = useState(0)
  const [request, setRequest] = useState<RecommendationRequest>({
    category: (searchParams.get('category') as Category) || 'anything',
  })
  const { results, isLoading, fetchRecommendations } = store

  const totalSteps = 6

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1)
    } else {
      fetchRecommendations(request)
    }
  }

  const handleBack = () => {
    if (step > 0) setStep(step - 1)
  }

  const canProceed = () => {
    switch (step) {
      case 0: return !!request.category
      case 1: return !!request.mood
      case 2: return !!request.time_available
      case 3: return !!request.budget
      case 4: return !!request.social_context
      case 5: return !!request.energy_level
      default: return true
    }
  }

  return (
    <div className="min-h-screen pb-24 sm:pb-8">
      {/* Progress bar */}
      <div className="sticky top-16 z-40 bg-[#FEFBF7]/80 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <Link to="/" className="text-sm text-[#8888A0] hover:text-[#4A4A6A] flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Home
            </Link>
            <span className="text-xs font-semibold text-[#8888A0]">Step {step + 1} of {totalSteps}</span>
          </div>
          <div className="h-1.5 bg-[#E5E7EB]/50 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#FF6B6B] to-[#A78BFA] rounded-full"
              animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {results.length === 0 ? (
            <motion.div key="form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              {step === 0 && <CategoryStep request={request} setRequest={setRequest} />}
              {step === 1 && <MoodStep request={request} setRequest={setRequest} />}
              {step === 2 && <TimeStep request={request} setRequest={setRequest} />}
              {step === 3 && <BudgetStep request={request} setRequest={setRequest} />}
              {step === 4 && <SocialStep request={request} setRequest={setRequest} />}
              {step === 5 && <EnergyStep request={request} setRequest={setRequest} />}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8">
                <button
                  onClick={handleBack}
                  disabled={step === 0}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all ${step === 0 ? 'opacity-0 pointer-events-none' : 'text-[#4A4A6A] hover:bg-white/60'}`}
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${canProceed() ? 'bg-gradient-to-r from-[#FF6B6B] to-[#A78BFA] text-white shadow-lg shadow-coral/20 hover:shadow-coral/40 hover:scale-[1.02]' : 'bg-[#E5E7EB] text-[#8888A0] cursor-not-allowed'}`}
                >
                  {step === totalSteps - 1 ? (
                    <><Sparkles className="w-4 h-4" /> Get Recommendations</>
                  ) : (
                    <>Next <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <ResultsView results={results} request={request} onReset={() => { setStep(0); store.fetchRecommendations({} as RecommendationRequest); }} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading overlay */}
        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-[#FEFBF7]/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-16 h-16 rounded-full border-4 border-[#E5E7EB] border-t-[#FF6B6B] mx-auto mb-4"
              />
              <p className="text-lg font-bold text-[#1A1A2E]">Finding perfect matches...</p>
              <p className="text-sm text-[#8888A0]">Analyzing your vibe</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

// ── Step Components ──────────────────────────────────────────────

function StepHeader({ title, subtitle, icon }: { title: string; subtitle: string; icon: React.ReactNode }) {
  return (
    <div className="text-center mb-8">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF6B6B]/10 to-[#A78BFA]/10 flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A2E] mb-2">{title}</h2>
      <p className="text-[#4A4A6A]">{subtitle}</p>
    </div>
  )
}

function CategoryChip({ selected, onClick, emoji, label }: { selected: boolean; onClick: () => void; emoji: string; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold text-sm transition-all ${selected ? 'bg-gradient-to-r from-[#FF6B6B] to-[#A78BFA] text-white shadow-lg shadow-coral/20 scale-[1.03]' : 'bg-white/70 border border-white/40 text-[#1A1A2E] hover:bg-white/90 hover:shadow-md'}`}
    >
      <span className="text-lg">{emoji}</span>
      {label}
    </button>
  )
}

function CategoryStep({ request, setRequest }: { request: RecommendationRequest; setRequest: any }) {
  return (
    <div>
      <StepHeader title="What are you looking for?" subtitle="Pick a category or choose anything" icon={<Sparkles className="w-6 h-6 text-[#A78BFA]" />} />
      <div className="flex flex-wrap justify-center gap-3">
        {CATEGORIES.map((cat) => (
          <CategoryChip
            key={cat.value}
            selected={request.category === cat.value}
            onClick={() => setRequest({ ...request, category: cat.value as Category | 'anything' })}
            emoji={cat.emoji}
            label={cat.label}
          />
        ))}
      </div>
    </div>
  )
}

function MoodStep({ request, setRequest }: { request: RecommendationRequest; setRequest: any }) {
  return (
    <div>
      <StepHeader title="How are you feeling?" subtitle="Your mood helps us match the right vibe" icon={<Heart className="w-6 h-6 text-[#FF6B6B]" />} />
      <div className="flex flex-wrap justify-center gap-3">
        {MOODS.map((mood) => (
          <CategoryChip
            key={mood.value}
            selected={request.mood === mood.value}
            onClick={() => setRequest({ ...request, mood: mood.value })}
            emoji={mood.emoji}
            label={mood.label}
          />
        ))}
      </div>
    </div>
  )
}

function TimeStep({ request, setRequest }: { request: RecommendationRequest; setRequest: any }) {
  return (
    <div>
      <StepHeader title="How much time do you have?" subtitle="We will match recommendations to your schedule" icon={<Clock className="w-6 h-6 text-[#4ECDC4]" />} />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-md mx-auto">
        {TIME_OPTIONS.map((opt) => (
          <CategoryChip
            key={opt.value}
            selected={request.time_available === opt.value}
            onClick={() => setRequest({ ...request, time_available: opt.value })}
            emoji="⏱️"
            label={opt.label}
          />
        ))}
      </div>
    </div>
  )
}

function BudgetStep({ request, setRequest }: { request: RecommendationRequest; setRequest: any }) {
  return (
    <div>
      <StepHeader title="What is your budget?" subtitle="Free stuff counts too" icon={<DollarSign className="w-6 h-6 text-[#F4B86A]" />} />
      <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
        {BUDGET_OPTIONS.map((opt) => (
          <CategoryChip
            key={opt.value}
            selected={request.budget === opt.value}
            onClick={() => setRequest({ ...request, budget: opt.value })}
            emoji={opt.emoji}
            label={opt.label}
          />
        ))}
      </div>
    </div>
  )
}

function SocialStep({ request, setRequest }: { request: RecommendationRequest; setRequest: any }) {
  return (
    <div>
      <StepHeader title="Who are you with?" subtitle="Solo adventures or group activities" icon={<Users className="w-6 h-6 text-[#38BDF8]" />} />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-md mx-auto">
        {SOCIAL_OPTIONS.map((opt) => (
          <CategoryChip
            key={opt.value}
            selected={request.social_context === opt.value}
            onClick={() => setRequest({ ...request, social_context: opt.value })}
            emoji={opt.emoji}
            label={opt.label}
          />
        ))}
      </div>
    </div>
  )
}

function EnergyStep({ request, setRequest }: { request: RecommendationRequest; setRequest: any }) {
  return (
    <div>
      <StepHeader title="What is your energy level?" subtitle="Low key or go mode?" icon={<Zap className="w-6 h-6 text-[#A78BFA]" />} />
      <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
        {ENERGY_OPTIONS.map((opt) => (
          <CategoryChip
            key={opt.value}
            selected={request.energy_level === opt.value}
            onClick={() => setRequest({ ...request, energy_level: opt.value })}
            emoji={opt.emoji}
            label={opt.label}
          />
        ))}
      </div>
    </div>
  )
}

// ── Results View ─────────────────────────────────────────────────

function ResultsView({ results, request, onReset }: { results: RecommendationResult[]; request: RecommendationRequest; onReset: () => void }) {
  return (
    <div>
      <div className="text-center mb-8">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }} className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF6B6B] to-[#A78BFA] flex items-center justify-center mx-auto mb-4 shadow-xl shadow-coral/20">
          <Sparkles className="w-8 h-8 text-white" />
        </motion.div>
        <h2 className="text-2xl font-bold text-[#1A1A2E] mb-2">Here is what we found for you</h2>
        <p className="text-[#4A4A6A] mb-4">
          {results.length} recommendations matched your vibe
        </p>
        <div className="flex items-center justify-center gap-3">
          <button onClick={onReset} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/70 border border-white/40 text-sm font-semibold text-[#4A4A6A] hover:bg-white/90 transition-all">
            <RefreshCw className="w-4 h-4" /> Start over
          </button>
          <Link to="/browse" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/70 border border-white/40 text-sm font-semibold text-[#4A4A6A] hover:bg-white/90 transition-all">
            Browse all
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        {results.map((result, i) => (
          <ResultCard key={i} result={result} index={i} />
        ))}
      </div>
    </div>
  )
}

function ResultCard({ result, index }: { result: RecommendationResult; index: number }) {
  const { recommendation: rec, confidence, reason } = result
  const { toggleSave, toggleLike, isSaved, isLiked } = store
  const saved = isSaved(rec.id)
  const liked = isLiked(rec.id)

  const categoryEmoji = CATEGORIES.find(c => c.value === rec.category)?.emoji || '✨'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="bg-white/70 backdrop-blur-sm border border-white/40 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF6B6B]/10 to-[#A78BFA]/10 flex items-center justify-center text-2xl">
            {categoryEmoji}
          </div>
          <div>
            <h3 className="font-bold text-[#1A1A2E] group-hover:text-[#A78BFA] transition-colors">{rec.title}</h3>
            <div className="flex items-center gap-2 text-xs text-[#8888A0]">
              <span className="capitalize">{rec.category.replace('_', ' ')}</span>
              <span>•</span>
              <span>{rec.time_needed}</span>
              <span>•</span>
              <span className="capitalize">{rec.cost_level}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div className={`px-2.5 py-1 rounded-lg text-xs font-bold ${confidence >= 70 ? 'bg-emerald-100 text-emerald-700' : confidence >= 50 ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'}`}>
            {confidence}% match
          </div>
        </div>
      </div>

      <p className="text-sm text-[#4A4A6A] leading-relaxed mb-3">{rec.description}</p>

      <div className="flex items-center gap-2 mb-3">
        <div className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#FF6B6B]/10 to-[#A78BFA]/10 text-xs font-semibold text-[#A78BFA]">
          ✨ {reason}
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {rec.tags.slice(0, 5).map((tag, i) => (
          <span key={i} className="px-2.5 py-1 rounded-lg bg-[#F5F5F5] text-xs text-[#4A4A6A] font-medium">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-[#E5E7EB]/30">
        <div className="flex items-center gap-2">
          <button onClick={() => toggleLike(rec.id)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${liked ? 'bg-rose-100 text-rose-600' : 'bg-[#F5F5F5] text-[#4A4A6A] hover:bg-rose-50'}`}>
            <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-current' : ''}`} />
            {rec.likes_count! + (liked ? 1 : 0)}
          </button>
          <button onClick={() => toggleSave(rec.id)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${saved ? 'bg-[#A78BFA]/10 text-[#A78BFA]' : 'bg-[#F5F5F5] text-[#4A4A6A] hover:bg-[#A78BFA]/5'}`}>
            {saved ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
            {rec.saves_count! + (saved ? 1 : 0)}
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F5F5F5] text-xs font-semibold text-[#4A4A6A] hover:bg-[#E5E7EB] transition-all">
            <Share2 className="w-3.5 h-3.5" /> Share
          </button>
          <Link to={`/recommendation/${rec.id ?? ""}`} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#FF6B6B] to-[#A78BFA] text-xs font-semibold text-white hover:shadow-md transition-all">
            Details <ChevronDown className="w-3.5 h-3.5 -rotate-90" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
