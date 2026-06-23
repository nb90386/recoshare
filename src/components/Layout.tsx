// src/components/Layout.tsx
import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Compass, Plus, Bookmark, Home, Search, User } from 'lucide-react'

export function Layout({ children }: { children: ReactNode }) {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="min-h-screen bg-[#FEFBF7]">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 ${isHome ? 'bg-transparent' : 'glass border-b border-white/20'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF6B6B] to-[#A78BFA] flex items-center justify-center shadow-lg shadow-lavender/20 group-hover:shadow-lavender/40 transition-shadow">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#FF6B6B] to-[#A78BFA] bg-clip-text text-transparent">
              Recoshare
            </span>
          </Link>

          <nav className="hidden sm:flex items-center gap-1">
            <NavLink to="/" icon={<Home className="w-4 h-4" />} label="Home" active={location.pathname === '/'} />
            <NavLink to="/browse" icon={<Search className="w-4 h-4" />} label="Browse" active={location.pathname === '/browse'} />
            <NavLink to="/recommend" icon={<Compass className="w-4 h-4" />} label="Get Ideas" active={location.pathname === '/recommend'} />
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/share" className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF6B6B] to-[#A78BFA] text-white text-sm font-semibold shadow-lg shadow-coral/20 hover:shadow-coral/40 hover:scale-[1.02] transition-all">
              <Plus className="w-4 h-4" />
              Share
            </Link>
            <Link to="/saved" className="p-2.5 rounded-xl hover:bg-white/60 transition-colors relative">
              <Bookmark className="w-5 h-5 text-[#4A4A6A]" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile bottom nav */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 glass border-t border-white/20 z-50">
        <div className="flex items-center justify-around py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
          <MobileNavLink to="/" icon={<Home className="w-5 h-5" />} label="Home" active={location.pathname === '/'} />
          <MobileNavLink to="/browse" icon={<Search className="w-5 h-5" />} label="Browse" active={location.pathname === '/browse'} />
          <Link to="/share" className="flex flex-col items-center gap-0.5 p-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#A78BFA] flex items-center justify-center shadow-lg">
              <Plus className="w-5 h-5 text-white" />
            </div>
          </Link>
          <MobileNavLink to="/recommend" icon={<Compass className="w-5 h-5" />} label="Ideas" active={location.pathname === '/recommend'} />
          <MobileNavLink to="/saved" icon={<Bookmark className="w-5 h-5" />} label="Saved" active={location.pathname === '/saved'} />
        </div>
      </nav>
    </div>
  )
}

function NavLink({ to, icon, label, active }: { to: string; icon: ReactNode; label: string; active: boolean }) {
  return (
    <Link to={to} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${active ? 'bg-white/80 text-[#1A1A2E] shadow-sm' : 'text-[#4A4A6A] hover:bg-white/60'}`}>
      {icon}
      {label}
    </Link>
  )
}

function MobileNavLink({ to, icon, label, active }: { to: string; icon: ReactNode; label: string; active: boolean }) {
  return (
    <Link to={to} className={`flex flex-col items-center gap-0.5 p-2 ${active ? 'text-[#FF6B6B]' : 'text-[#8888A0]'}`}>
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </Link>
  )
}
