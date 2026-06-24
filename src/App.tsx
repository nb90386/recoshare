import { HashRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Recommend } from './pages/Recommend'
import { Browse } from './pages/Browse'
import { Detail } from './pages/Detail'
import { Share } from './pages/Share'
import { Saved } from './pages/Saved'

export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recommend" element={<Recommend />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/recommendation/:id" element={<Detail />} />
          <Route path="/share" element={<Share />} />
          <Route path="/saved" element={<Saved />} />
        </Routes>
      </Layout>
    </HashRouter>
  )
}
