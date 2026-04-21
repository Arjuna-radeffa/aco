import React, { useState, useEffect } from 'react'
import BeautifulLogin from './components/BeautifulLogin'
import HomePage from './components/HomePage'
import UniversalDashboard from './components/UniversalDashboard'
import ProjectsPage from './components/ProjectsPage'
import ProjectDetailsPage from './components/ProjectDetailsPage'
import ZisProjectsPage from './components/ZisProjectsPage'

export interface User {
  id: string
  email: string
  name: string
  role: string
  isVerified: boolean
  kycStatus: string
}

export interface AuthResponse {
  access_token: string
  user: User
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error) {
    console.error('Error caught by boundary:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
            <h1 className="text-2xl font-bold text-red-600 mb-4">⚠️ Error</h1>
            <p className="text-slate-700 mb-4">{this.state.error?.message}</p>
            <button 
              onClick={() => window.location.reload()}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Refresh Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

import { mockLogin, mockValidateToken } from './mockAuth'

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [currentView, setCurrentView] = useState<'home' | 'login' | 'dashboard' | 'projects' | 'project-details' | 'zis-projects'>('home')
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const [isInitializing, setIsInitializing] = useState(true)

  // Constant for quick login emails
  const quickLoginEmails: Record<string, string> = {
    investor_micro: 'rina@aco.com',
    investor_enterprise: 'budi@aco.com',
    project_owner: 'dimas@aco.com',
    muzakki: 'salim@aco.com',
    munfiq_mutashadiq: 'tari@aco.com',
    wakif: 'mahmud@aco.com',
    mustahiq: 'ruslan@aco.com',
    investment_officer: 'arief@aco.com',
    portfolio_monitor: 'sinta@aco.com',
    finance_officer: 'hendra@aco.com',
    admin: 'reza@aco.com'
  }

  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem('token')
      if (savedToken) {
        try {
          const userData = mockValidateToken(savedToken)
          if (userData) {
            setUser(userData)
            setToken(savedToken)
            setCurrentView('dashboard')
          } else {
            throw new Error('Invalid mock token')
          }
        } catch (err) {
          console.error('Session restoration failed:', err)
          localStorage.removeItem('token')
          localStorage.removeItem('user')
        }
      }
      setIsInitializing(false)
    }
    initAuth()
  }, [])

  const handleLogin = (authData: AuthResponse) => {
    setUser(authData.user)
    setToken(authData.access_token)
    setCurrentView('dashboard')
    localStorage.setItem('token', authData.access_token)
    localStorage.setItem('user', JSON.stringify(authData.user))
  }

  const handleQuickLogin = async (role: string) => {
    const email = quickLoginEmails[role]
    if (email) {
      try {
        const response = await mockLogin(email, 'password123')
        handleLogin(response)
      } catch (err: any) {
        alert('Quick Login Failed: ' + err.message)
      }
    }
  }

  const handleLogout = () => {
    setUser(null)
    setToken(null)
    setCurrentView('home')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  if (isInitializing) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white font-medium">ACO Platform Initializing...</p>
        </div>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <div className="App">
        {currentView === 'home' && (
          <HomePage 
            onLoginClick={() => setCurrentView('login')} 
            onQuickLoginClick={handleQuickLogin}
            onViewProjects={() => setCurrentView('projects')}
            onViewZisProjects={() => setCurrentView('zis-projects')}
            onViewDetail={(id) => {
              setSelectedProjectId(id)
              setCurrentView('project-details')
            }}
          />
        )}
        {currentView === 'projects' && (
          <ProjectsPage 
            onBack={() => setCurrentView('home')}
            onLoginClick={() => setCurrentView('login')}
            onViewDetail={(id) => {
              setSelectedProjectId(id)
              setCurrentView('project-details')
            }}
          />
        )}
        {currentView === 'project-details' && selectedProjectId && (
          <ProjectDetailsPage 
            projectId={selectedProjectId}
            onBack={() => setCurrentView('projects')}
            onInvestClick={() => {
              if (user) {
                setCurrentView('dashboard')
              } else {
                setCurrentView('login')
              }
            }}
          />
        )}
        {currentView === 'zis-projects' && (
          <ZisProjectsPage 
            onBack={() => setCurrentView('home')}
            onDonationClick={() => setCurrentView('login')}
            onViewDetail={(id) => {
              setSelectedProjectId(id)
              setCurrentView('project-details')
            }}
          />
        )}
        {currentView === 'login' && (
          <BeautifulLogin 
            onLogin={handleLogin} 
            onQuickLogin={handleQuickLogin}
            onBack={() => setCurrentView('home')} 
          />
        )}
        {currentView === 'dashboard' && user && (
          <UniversalDashboard 
            user={user} 
            onLogout={handleLogout} 
          />
        )}
      </div>
    </ErrorBoundary>
  )
}

export default App