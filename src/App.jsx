import { lazy, Suspense, useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import ScrollProgress from './components/ScrollProgress'
import ScrollToTop from './components/ScrollToTop'

const HomePage       = lazy(() => import('./pages/HomePage'))
const LoginPage      = lazy(() => import('./pages/LoginPage'))
const NewsPage       = lazy(() => import('./pages/NewsPage'))
const SearchPage     = lazy(() => import('./pages/SearchPage'))
const StudentsPage   = lazy(() => import('./pages/StudentsPage'))
const JobsPage       = lazy(() => import('./pages/JobsPage'))
const EconomyPage    = lazy(() => import('./pages/EconomyPage'))
const SolidarityPage = lazy(() => import('./pages/SolidarityPage'))
const RoadsPage      = lazy(() => import('./pages/RoadsPage'))
const EmergencyPage  = lazy(() => import('./pages/EmergencyPage'))
const NotFoundPage   = lazy(() => import('./pages/NotFoundPage'))

function Layout({ children }) {
  const location = useLocation()
  const hideNavbar = ['/login', '/register'].includes(location.pathname)

  return (
    <div
      className="min-h-screen w-full"
      style={{ background: 'var(--bg)', color: 'var(--text-primary)' }}
    >
      <ScrollProgress />
      <ScrollToTop />
      {!hideNavbar && <Navbar />}
      {children}
    </div>
  )
}

function RouteFallback() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: 'var(--bg)' }}
    >
      <div className="flex flex-col items-center gap-6 px-6 text-center">
        {/* Spinner */}
        <div className="relative">
          <div className="preloader-ring" />
          <div
            className="absolute inset-0 flex items-center justify-center text-2xl"
          >
            🇵🇸
          </div>
        </div>
        <p className="text-sm font-bold" style={{ color: 'var(--text-muted)' }}>
          جارٍ تحميل الصفحة...
        </p>
      </div>
    </div>
  )
}

function App() {
  const [loading, setLoading] = useState(true)

  /* ── Initialize AOS (Animate On Scroll) ── */
  useEffect(() => {
    if (window.AOS) {
      window.AOS.init({
        duration: 700,
        easing: 'ease-out-cubic',
        once: true,
        offset: 60,
        delay: 0,
      })
    }
  }, [])

  /* ── Preloader timer ── */
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <Preloader />

  return (
    <Layout>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/"          element={<HomePage />} />
          <Route path="/login"     element={<LoginPage />} />
          <Route path="/search"    element={<SearchPage />} />
          <Route path="/students"  element={<StudentsPage />} />
          <Route path="/jobs"      element={<JobsPage />} />
          <Route path="/economy"   element={<EconomyPage />} />
          <Route path="/solidarity"element={<SolidarityPage />} />
          <Route path="/roads"     element={<RoadsPage />} />
          <Route path="/news"      element={<NewsPage />} />
          <Route path="/emergency" element={<EmergencyPage />} />
          <Route path="*"          element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}

export default App
