import { create } from 'zustand';
import { User, Project, Transaction } from '../types/appTypes';
import { mockUsers, mockTransactions } from '../data/mockData';
import { mockProjects } from '../data/projectMockData';

interface AppState {
  currentUser: User | null;
  projects: any[]; // Flexibility for hierarchical and flat projects during transition
  transactions: Transaction[];
  
  // Actions
  setCurrentUser: (user: User | null) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  addTransaction: (transaction: Transaction) => void;
  setRole: (roleName: string) => void;
}

export const useStore = create<AppState>((set) => ({
  currentUser: mockUsers[0], // Default to Arief
  projects: mockProjects,
  transactions: mockTransactions,

  setCurrentUser: (user: User | null) => set({ currentUser: user }),
  
  updateProject: (id: string, updates: Partial<Project>) => set((state: AppState) => ({
    projects: state.projects.map((p: Project) => p.id === id ? { ...p, ...updates } : p)
  })),

  addTransaction: (transaction: Transaction) => set((state: AppState) => ({
    transactions: [transaction, ...state.transactions]
  })),

  setRole: (roleName: string) => {
    const user = mockUsers.find(u => u.role === roleName) || mockUsers[0];
    set({ currentUser: user });
  }
}));
