import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import NewsPage from './pages/NewsPage'
import SearchPage from './pages/SearchPage'
import StudentsPage from './pages/StudentsPage'

function Layout({ children }) {
  const location = useLocation()
  const hideNavbar = ['/login', '/register'].includes(location.pathname)

  return (
    <div className="min-h-screen bg-bg text-t1 w-full">
      {!hideNavbar && <Navbar />}
      {children}
    </div>
  )
}

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <Preloader />

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/jobs" element={<ComingSoon title="وظائف" />} />
        <Route path="/economy" element={<ComingSoon title="اقتصاد" />} />
        <Route path="/solidarity" element={<ComingSoon title="تكافل" />} />
        <Route path="/roads" element={<ComingSoon title="طرق" />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/emergency" element={<ComingSoon title="طوارئ" />} />
      </Routes>
    </Layout>
  )
}

function ComingSoon({ title }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-t1 mb-4">{title}</h1>
        <p className="text-t2 text-lg">قريبًا...</p>
      </div>
    </div>
  )
}

export default App
