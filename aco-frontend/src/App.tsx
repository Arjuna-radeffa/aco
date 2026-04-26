import React, { useState, useEffect, useCallback } from 'react'
import BeautifulLogin from './components/BeautifulLogin'
import HomePage from './components/HomePage'
import ProjectDetailsPage from './components/ProjectDetailsPage'

// External User Pages
import BrowsePage from './components/pages/BrowsePage'
import RegisterPage from './components/pages/RegisterPage'
import KycUploadPage from './components/pages/KycUploadPage'
import InvestFlowPage from './components/pages/InvestFlowPage'
import WaqfMoneyFlowPage from './components/pages/WaqfMoneyFlowPage'
import ExternalDashboardPage from './components/pages/ExternalDashboardPage'
import ParticipationDetailPage from './components/pages/ParticipationDetailPage'
import { AboutPage } from './components/pages/AboutPage'
import { TermsPage, PrivacyPage } from './components/pages/StaticPages'
import { PublicLayout } from './components/templates/PublicLayout'

import { mockLogin } from './mockAuth'
import { RoleBasedLayout } from './components/templates/RoleBasedLayout'
import { useStore } from './store/useStore'

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

// === View Type ===
type View =
  | 'home'
  | 'login'
  | 'dashboard'
  | 'project-details'
  | 'browse'
  | 'register'
  | 'kyc'
  | 'ex-dashboard'
  | 'invest'
  | 'waqf'
  | 'participation-detail'
  | 'terms'
  | 'privacy'
  | 'about'

interface ViewState {
  view: View
  projectId?: string
  participationId?: string
}

// === Error Boundary ===
interface ErrorBoundaryState { hasError: boolean; error: Error | null }
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error: Error) { return { hasError: true, error } }
  componentDidCatch(error: Error) { console.error('Error caught by boundary:', error) }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
            <h1 className="text-2xl font-bold text-red-600 mb-4">⚠️ Error</h1>
            <p className="text-slate-700 mb-4">{this.state.error?.message}</p>
            <button onClick={() => window.location.reload()} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Refresh Page
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

// === App ===
function App() {
  const [viewState, setViewState] = useState<ViewState>({ view: 'home' })
  const [isInitializing, setIsInitializing] = useState(true)

  const currentUser = useStore((state: any) => state.currentUser)
  const setCurrentUser = useStore((state: any) => state.setCurrentUser)

  // === Browser History Integration ===
  const navigate = useCallback((newState: ViewState) => {
    window.history.pushState(newState, '', getUrlForView(newState))
    setViewState(newState)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const getUrlForView = (s: ViewState): string => {
    switch (s.view) {
      case 'home': return '/'
      case 'login': return '/login'
      case 'register': return '/register'
      case 'browse': return '/browse'
      case 'project-details': return `/project/${s.projectId || ''}`
      case 'invest': return `/invest/${s.projectId || ''}`
      case 'waqf': return `/waqf/${s.projectId || ''}`
      case 'kyc': return '/kyc'
      case 'ex-dashboard': return '/my-dashboard'
      case 'participation-detail': return `/my-dashboard/participation/${s.participationId || ''}`
      case 'terms': return '/terms'
      case 'privacy': return '/privacy'
      case 'about': return '/about'
      case 'dashboard': return '/dashboard'
      default: return '/'
    }
  }

  useEffect(() => {
    // Listen to popstate (browser back/forward)
    const handlePopState = (e: PopStateEvent) => {
      if (e.state) {
        setViewState(e.state as ViewState)
      } else {
        setViewState({ view: 'home' })
      }
    }
    window.addEventListener('popstate', handlePopState)

    // Set initial history state without pushing
    window.history.replaceState({ view: 'home' }, '', '/')

    setIsInitializing(false)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // === Auth Handlers ===
  const handleLogin = (authData: AuthResponse) => {
    setCurrentUser({
      id: authData.user.id,
      name: authData.user.name,
      role: authData.user.role.toLowerCase()
    })
    navigate({ view: 'dashboard' })
  }

  const handleQuickLogin = async (role: string) => {
    const roleMap: Record<string, string> = {
      'arief': 'arief', 'investment_officer': 'arief',
      'sinta': 'sinta', 'portfolio_monitor': 'sinta',
      'hendra': 'hendra', 'finance_officer': 'hendra',
      'reza': 'reza', 'admin': 'reza',
      'investasi_mikro': 'investor_micro', 'investor_micro': 'investor_micro',
      'investasi_enterprise': 'investor_enterprise', 'investor_enterprise': 'investor_enterprise',
      'muzakki': 'funder', 'munfiq': 'funder', 'mutashadiq': 'funder', 'wakif': 'funder', 'funder': 'funder',
      'mustahiq': 'mustahiq', 'project_owner': 'project_owner',
      'investment': 'arief', 'finance': 'hendra',
      // External user roles
      'external_user': 'external_user',
    }
    const nameMap: Record<string, string> = {
      'arief': 'Arief Wijaksana', 'sinta': 'Sinta Portfolio', 'hendra': 'Hendra Finance',
      'reza': 'Reza Admin', 'investor_micro': 'Budi (Micro Investor)',
      'investor_enterprise': 'Citra (Corp Investor)', 'funder': 'Sholeh (Universal Funder)',
      'mustahiq': 'Maimunah (Recipient)', 'project_owner': 'Mitra Tani Sejahtera',
      'external_user': 'Budi Santoso',
    }
    const tRole = roleMap[role.toLowerCase()] || 'arief'
    setCurrentUser({
      id: Math.random().toString(36).substr(2, 9),
      name: nameMap[tRole] || `Demo ${tRole.toUpperCase()}`,
      role: tRole,
      kycVerified: !['mustahiq', 'external_user'].includes(tRole)
    })
    if (['investor_micro', 'investor_enterprise', 'funder', 'external_user'].includes(tRole)) {
      navigate({ view: 'ex-dashboard' })
    } else {
      navigate({ view: 'dashboard' })
    }
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

  const { view, projectId, participationId } = viewState

  return (
    <ErrorBoundary>
      <div className="App">
        {/* PUBLIC MARKETING WRAPPER */}
        {['home', 'browse', 'about', 'project-details', 'terms', 'privacy'].includes(view) && (
          <PublicLayout activeView={view} onNavigate={navigate}>
            {view === 'home' && (
              <HomePage
                onViewDetail={(id) => navigate({ view: 'project-details', projectId: id })}
                onNavigate={navigate}
              />
            )}
            
            {view === 'browse' && (
              <BrowsePage
                currentUser={currentUser}
                onViewDetail={(id) => navigate({ view: 'project-details', projectId: id })}
                onLoginClick={() => navigate({ view: 'login' })}
                onKycClick={() => navigate({ view: 'kyc' })}
              />
            )}

            {view === 'about' && (
              <AboutPage />
            )}

            {view === 'project-details' && projectId && (
              <ProjectDetailsPage
                projectId={projectId}
                onBack={() => navigate({ view: 'browse' })}
                onInvestClick={(id?: string) => {
                  if (!currentUser) {
                    navigate({ view: 'login' })
                  } else {
                    navigate({ view: 'invest', projectId: id || projectId })
                  }
                }}
                onWaqfClick={(id?: string) => {
                  if (!currentUser) {
                    navigate({ view: 'login' })
                  } else {
                    navigate({ view: 'waqf', projectId: id || projectId })
                  }
                }}
              />
            )}

            {view === 'terms' && (
              <TermsPage onBack={() => navigate({ view: 'home' })} />
            )}

            {view === 'privacy' && (
              <PrivacyPage onBack={() => navigate({ view: 'home' })} />
            )}
          </PublicLayout>
        )}

        {/* LOGIN (Standalone) */}
        {view === 'login' && (
          <BeautifulLogin
            onLogin={handleLogin}
            onQuickLogin={handleQuickLogin}
            onBack={() => navigate({ view: 'home' })}
          />
        )}

        {/* REGISTER & KYC (Simple Public Layout) */}
        {['register', 'kyc'].includes(view) && (
          <PublicLayout activeView={view} onNavigate={navigate} simple>
            {view === 'register' && (
              <RegisterPage
                onBack={() => navigate({ view: 'home' })}
                onLoginClick={() => navigate({ view: 'login' })}
              />
            )}

            {view === 'kyc' && (
              <KycUploadPage
                currentUser={currentUser}
                onBack={() => navigate({ view: 'ex-dashboard' })}
              />
            )}
          </PublicLayout>
        )}

        {/* INTERNAL DASHBOARD */}
        {view === 'dashboard' && currentUser && (
          <RoleBasedLayout />
        )}

        {/* INVEST & WAQF FLOWS (Internal State) */}
        {view === 'invest' && projectId && (
          <InvestFlowPage
            projectId={projectId}
            currentUser={currentUser}
            onBack={() => navigate({ view: 'project-details', projectId })}
            onDashboardClick={() => navigate({ view: 'ex-dashboard' })}
            onBrowseClick={() => navigate({ view: 'browse' })}
          />
        )}

        {view === 'waqf' && projectId && (
          <WaqfMoneyFlowPage
            projectId={projectId}
            currentUser={currentUser}
            onBack={() => navigate({ view: 'project-details', projectId })}
            onDashboardClick={() => navigate({ view: 'ex-dashboard' })}
            onBrowseClick={() => navigate({ view: 'browse' })}
          />
        )}

        {/* EXTERNAL DASHBOARD */}
        {view === 'ex-dashboard' && (
          <ExternalDashboardPage
            currentUser={currentUser}
            onKycClick={() => navigate({ view: 'kyc' })}
            onBrowseClick={() => navigate({ view: 'browse' })}
            onViewParticipation={(id) => navigate({ view: 'participation-detail', participationId: id })}
          />
        )}

        {/* PARTICIPATION DETAIL */}
        {view === 'participation-detail' && participationId && (
          <ParticipationDetailPage
            participationId={participationId}
            onBack={() => navigate({ view: 'ex-dashboard' })}
          />
        )}
      </div>
    </ErrorBoundary>
  )
}

export default App