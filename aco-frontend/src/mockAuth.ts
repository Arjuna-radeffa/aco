// Mock authentication service for frontend demonstration
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  isVerified: boolean;
  kycStatus: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

// Mock user database - 11 users representing all ACO roles
const mockUsers = [
  {
    id: '01',
    email: 'rina@aco.com',
    password: 'password123',
    name: 'Rina Wijaya',
    role: 'investor_micro',
    isVerified: true,
    kycStatus: 'verified',
  },
  {
    id: '02',
    email: 'budi@aco.com',
    password: 'password123',
    name: 'Budi Santoso',
    role: 'investor_enterprise',
    isVerified: true,
    kycStatus: 'verified',
  },
  {
    id: '03',
    email: 'dimas@aco.com',
    password: 'password123',
    name: 'Dimas Pratama',
    role: 'project_owner',
    isVerified: true,
    kycStatus: 'verified',
  },
  {
    id: '04',
    email: 'salim@aco.com',
    password: 'password123',
    name: 'Pak Salim Hartono',
    role: 'muzakki',
    isVerified: true,
    kycStatus: 'verified',
  },
  {
    id: '05',
    email: 'tari@aco.com',
    password: 'password123',
    name: 'Bu Tari Rahayu',
    role: 'munfiq_mutashadiq',
    isVerified: true,
    kycStatus: 'verified',
  },
  {
    id: '06',
    email: 'mahmud@aco.com',
    password: 'password123',
    name: 'Haji Mahmud',
    role: 'wakif',
    isVerified: true,
    kycStatus: 'verified',
  },
  {
    id: '07',
    email: 'ruslan@aco.com',
    password: 'password123',
    name: 'Pak Ruslan',
    role: 'mustahiq',
    isVerified: true,
    kycStatus: 'verified',
  },
  {
    id: '08',
    email: 'arief@aco.com',
    password: 'password123',
    name: 'Arief Wijaksana',
    role: 'investment_officer',
    isVerified: true,
    kycStatus: 'verified',
  },
  {
    id: '09',
    email: 'sinta@aco.com',
    password: 'password123',
    name: 'Sinta Kusuma',
    role: 'portfolio_monitor',
    isVerified: true,
    kycStatus: 'verified',
  },
  {
    id: '10',
    email: 'hendra@aco.com',
    password: 'password123',
    name: 'Hendra Gunawan',
    role: 'finance_officer',
    isVerified: true,
    kycStatus: 'verified',
  },
  {
    id: '11',
    email: 'reza@aco.com',
    password: 'password123',
    name: 'Reza Pratama',
    role: 'admin',
    isVerified: true,
    kycStatus: 'verified',
  },
];

// Mock authentication function
export const mockLogin = async (email: string, password: string): Promise<AuthResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find(u => u.email === email && u.password === password);
      
      if (user) {
        const { password: _, ...userWithoutPassword } = user;
        resolve({
          access_token: 'mock_jwt_token_' + user.id,
          user: userWithoutPassword
        });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000); // Simulate network delay
  });
};

// Mock token validation
export const mockValidateToken = (token: string): User | null => {
  const userId = token.replace('mock_jwt_token_', '');
  const user = mockUsers.find(u => u.id === userId);
  
  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  return null;
};