import React from 'react'
import { User } from '../App'

interface DashboardProps {
  user: User
  onLogout: () => void
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const getRoleDisplayName = (role: string) => {
    const roleNames = {
      investor_micro: 'Investor Micro',
      investor_enterprise: 'Investor Enterprise',
      project_owner: 'Project Owner',
      muzakki: 'Muzakki (Zakat Giver)',
      munfiq_mutashadiq: 'Munfiq/Mutashadiq',
      wakif: 'Wakif',
      mustahiq: 'Mustahiq',
      investment_officer: 'Investment Officer',
      portfolio_monitor: 'Portfolio Monitor',
      finance_officer: 'Finance Officer',
      admin: 'Admin'
    }
    return roleNames[role as keyof typeof roleNames] || role
  }

  const getDashboardContent = () => {
    switch (user.role) {
      case 'investor_micro':
        return (
          <div>
            <h2>Micro Investor Dashboard</h2>
            <p>Welcome, {user.name}! Explore investment opportunities and manage your portfolio.</p>
            <div style={{ marginTop: '1rem' }}>
              <button className="btn">Browse Projects</button>
              <button className="btn" style={{ marginLeft: '1rem', background: '#38a169' }}>My Portfolio</button>
            </div>
          </div>
        )
      
      case 'investor_enterprise':
        return (
          <div>
            <h2>Enterprise Investor Dashboard</h2>
            <p>Welcome, {user.name}! Manage your large-scale investments and analytics.</p>
            <div style={{ marginTop: '1rem' }}>
              <button className="btn">Portfolio Analytics</button>
              <button className="btn" style={{ marginLeft: '1rem', background: '#3182ce' }}>API Integration</button>
            </div>
          </div>
        )

      case 'project_owner':
        return (
          <div>
            <h2>Project Owner Dashboard</h2>
            <p>Welcome, {user.name}! Manage your business and investor communications.</p>
            <div style={{ marginTop: '1rem' }}>
              <button className="btn">Business Performance</button>
              <button className="btn" style={{ marginLeft: '1rem', background: '#d69e2e' }}>Investor Reports</button>
            </div>
          </div>
        )

      default:
        return (
          <div>
            <h2>Welcome, {user.name}!</h2>
            <p>You are logged in as {getRoleDisplayName(user.role)}.</p>
          </div>
        )
    }
  }

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>ACO Platform Dashboard</h1>
        <button 
          onClick={onLogout}
          className="btn" 
          style={{ background: '#e53e3e', width: 'auto', padding: '0.5rem 1rem' }}
        >
          Logout
        </button>
      </div>

      <div style={{ 
        background: '#f7fafc', 
        padding: '1.5rem', 
        borderRadius: '8px', 
        marginBottom: '2rem' 
      }}>
        <h3>User Information</h3>
        <table style={{ width: '100%', marginTop: '1rem' }}>
          <tbody>
            <tr>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>Name:</td>
              <td style={{ padding: '0.5rem' }}>{user.name}</td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>Email:</td>
              <td style={{ padding: '0.5rem' }}>{user.email}</td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>Role:</td>
              <td style={{ padding: '0.5rem' }}>{getRoleDisplayName(user.role)}</td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>KYC Status:</td>
              <td style={{ 
                padding: '0.5rem', 
                color: user.kycStatus === 'verified' ? '#38a169' : 
                       user.kycStatus === 'pending' ? '#d69e2e' : '#e53e3e'
              }}>
                {user.kycStatus.toUpperCase()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {getDashboardContent()}
    </div>
  )
}

export default Dashboard