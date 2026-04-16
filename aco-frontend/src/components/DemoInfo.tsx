import React from 'react'

interface DemoInfoProps {
  onQuickLogin: (role: string) => void
}

const DemoInfo: React.FC<DemoInfoProps> = ({ onQuickLogin }) => {
  const demoUsers = [
    { email: 'rina@example.com', role: 'investor_micro', name: 'Rina (Investor Micro)' },
    { email: 'budi@example.com', role: 'investor_enterprise', name: 'Budi (Enterprise)' },
    { email: 'dimas@example.com', role: 'project_owner', name: 'Dimas (Project Owner)' },
    { email: 'paksalim@example.com', role: 'muzakki', name: 'Pak Salim (Muzakki)' },
    { email: 'butari@example.com', role: 'munfiq_mutashadiq', name: 'Bu Tari (Infaq/Shadaqah)' },
  ]

  return (
    <div style={{ 
      marginTop: '2rem', 
      padding: '1.5rem', 
      background: '#f7fafc', 
      borderRadius: '8px',
      border: '2px solid #e2e8f0'
    }}>
      <h3 style={{ marginBottom: '1rem', color: '#2d3748' }}>🚀 Demo Features</h3>
      
      <p style={{ marginBottom: '1rem', color: '#4a5568' }}>
        This is a fully functional frontend demo with mock authentication. 
        The backend is simulated - no database or server required!
      </p>

      <div style={{ marginBottom: '1rem' }}>
        <strong>🎯 Quick Login:</strong>
        <div style={{ marginTop: '0.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {demoUsers.map(user => (
            <button
              key={user.role}
              onClick={() => onQuickLogin(user.role)}
              style={{
                padding: '0.5rem 1rem',
                background: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.8rem'
              }}
            >
              {user.name}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <strong>🔐 Demo Credentials:</strong>
        <table style={{ width: '100%', marginTop: '0.5rem', fontSize: '0.9rem' }}>
          <tbody>
            {demoUsers.map(user => (
              <tr key={user.email}>
                <td style={{ padding: '0.25rem', fontWeight: 'bold' }}>{user.name}:</td>
                <td style={{ padding: '0.25rem' }}>{user.email}</td>
                <td style={{ padding: '0.25rem' }}>password123</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <strong>✨ Features Demonstrated:</strong>
        <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', color: '#4a5568' }}>
          <li>Role-based authentication</li>
          <li>User login/logout functionality</li>
          <li>Role-specific dashboard views</li>
          <li>Local storage persistence</li>
          <li>Responsive design</li>
        </ul>
      </div>
    </div>
  )
}

export default DemoInfo