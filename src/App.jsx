import { lazy, Suspense } from 'react'
import { Routes, Route } from './lib/router'
import Navbar from './components/Navbar'
import ScrollProgress from './components/ScrollProgress'
import ScrollToTop from './components/ScrollToTop'
import ProductStatus from './components/ProductStatus'
import AppErrorBoundary from './components/AppErrorBoundary'

const HomePage       = lazy(() => import('./pages/HomePage'))
const NewsPage       = lazy(() => import('./pages/NewsPage'))
const SearchPage     = lazy(() => import('./pages/SearchPage'))
const MyPalestinePage = lazy(() => import('./pages/MyPalestinePage'))
const StudentsPage   = lazy(() => import('./pages/StudentsPage'))
const JobsPage       = lazy(() => import('./pages/JobsPage'))
const EconomyPage    = lazy(() => import('./pages/EconomyPage'))
const SolidarityPage = lazy(() => import('./pages/SolidarityPage'))
const RoadsPage      = lazy(() => import('./pages/RoadsPage'))
const EmergencyPage  = lazy(() => import('./pages/EmergencyPage'))
const NotFoundPage   = lazy(() => import('./pages/NotFoundPage'))

function Layout({ children }) {
  return (
    <div
      className="min-h-screen w-full"
      style={{ background: 'var(--bg)', color: 'var(--text-primary)' }}
    >
      <ScrollProgress />
      <ScrollToTop />
      <a href="#main-content" className="skip-link">انتقل إلى المحتوى الرئيسي</a>
      <Navbar />
      <ProductStatus />
      <AppErrorBoundary>
        <div id="main-content">{children}</div>
      </AppErrorBoundary>
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
  return (
    <Layout>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/"          element={<HomePage />} />
          <Route path="/search"    element={<SearchPage />} />
          <Route path="/my-palestine" element={<MyPalestinePage />} />
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
