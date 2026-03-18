import { useState, useEffect } from 'react'
import Preloader from './assets/components/Preloader'
import AuthPage from './assets/components/AuthPage'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Show preloader for 2 seconds
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <Preloader />
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-pal-dark transition-colors duration-300 w-full p-0 m-0">
      <AuthPage />
    </div>
  )
}

export default App
