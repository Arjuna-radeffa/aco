import React, { useState } from 'react'
import { mockLogin, AuthResponse } from '../mockAuth'
import DemoInfo from './DemoInfo'

interface LoginFormProps {
  onLogin: (authData: AuthResponse) => void
  onQuickLogin: (role: string) => void
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onQuickLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await mockLogin(email, password)
      onLogin(response)
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container">
      <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>
        ACO Platform
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>

        {error && <div className="error">{error}</div>}

        <button 
          type="submit" 
          className="btn" 
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>

        <DemoInfo onQuickLogin={onQuickLogin} />
    </div>
  )
}

export default LoginForm