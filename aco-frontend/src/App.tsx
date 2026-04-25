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

import { RoleBasedLayout } from './components/templates/RoleBasedLayout'
import { useStore } from './store/useStore'

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'login' | 'dashboard' | 'projects' | 'project-details' | 'zis-projects'>('home')
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const [isInitializing, setIsInitializing] = useState(true)
  
  const currentUser = useStore((state: any) => state.currentUser)
  const setCurrentUser = useStore((state: any) => state.setCurrentUser)

  // Constant for quick login emails
  const quickLoginEmails: Record<string, string> = {
    investment_officer: 'arief',
    portfolio_monitor: 'sinta',
    finance_officer: 'hendra',
    admin: 'reza'
  }

  useEffect(() => {
    // Simulate init from localStorage if needed, for now just use store default
    setIsInitializing(false)
  }, [])

  const handleLogin = (authData: AuthResponse) => {
    setCurrentUser({
      id: authData.user.id,
      name: authData.user.name,
      role: authData.user.role.toLowerCase()
    })
    setCurrentView('dashboard')
  }

  const handleQuickLogin = async (role: string) => {
    const roleMap: Record<string, string> = {
      // Direct Main Roles
      'arief': 'arief',
      'investment_officer': 'arief',
      'sinta': 'sinta',
      'portfolio_monitor': 'sinta',
      'hendra': 'hendra',
      'finance_officer': 'hendra',
      'reza': 'reza',
      'admin': 'reza',
      
      // Homepage Aliases & External Roles
      'investasi_mikro': 'investor_micro',
      'investor_micro': 'investor_micro',
      'investasi_enterprise': 'investor_enterprise',
      'investor_enterprise': 'investor_enterprise',
      // Unified Funder Role mapping
      'muzakki': 'funder',
      'munfiq': 'funder',
      'mutashadiq': 'funder',
      'wakif': 'funder',
      'funder': 'funder',
      
      'mustahiq': 'mustahiq',
      'project_owner': 'project_owner',
      'investment': 'arief',
      'finance': 'hendra'
    }
    
    // In demo mode, just set the store user directly
    const tRole = roleMap[role.toLowerCase()] || 'arief'
    const nameMap: Record<string, string> = {
      'arief': 'Arief Wijaksana',
      'sinta': 'Sinta Portfolio',
      'hendra': 'Hendra Finance',
      'reza': 'Reza Admin',
      'investor_micro': 'Budi (Micro Investor)',
      'investor_enterprise': 'Citra (Corp Investor)',
      'funder': 'Sholeh (Universal Funder)',
      'mustahiq': 'Maimunah (Recipient)',
      'project_owner': 'Mitra Tani Sejahtera'
    }

    setCurrentUser({
      id: Math.random().toString(36).substr(2, 9),
      name: nameMap[tRole] || `Demo ${tRole.toUpperCase()}`,
      role: tRole,
      kycVerified: !['mustahiq'].includes(tRole)
    })
    setCurrentView('dashboard')
  }

  if (isInitializing) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin shadow-[0_0_20px_rgba(37,99,235,0.3)]"></div>
          <p className="text-white font-black uppercase tracking-[0.3em] text-xs italic">ACO Engine v2.0 Initializing</p>
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
        
        {currentView === 'login' && (
          <BeautifulLogin 
            onLogin={handleLogin} 
            onQuickLogin={handleQuickLogin}
            onBack={() => setCurrentView('home')} 
          />
        )}

        {currentView === 'dashboard' && currentUser && (
          <RoleBasedLayout />
        )}

        {/* Existing views fallbacks if needed, but the new RoleBasedLayout handles internal modules */}
        {currentView === 'projects' && (
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
        
        {currentView === 'project-details' && selectedProjectId && (
          <ProjectDetailsPage 
            projectId={selectedProjectId} 
            onBack={() => setCurrentView('home')} 
            onInvestClick={() => setCurrentView('login')} 
          />
        )}
      </div>
    </ErrorBoundary>
  )
}

export default App