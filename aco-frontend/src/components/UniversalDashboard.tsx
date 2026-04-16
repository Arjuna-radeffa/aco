import React, { useState, useEffect } from 'react';
import { LogOut, Menu, Bell, Search, X } from 'lucide-react';
import { User } from '../App';
import { getRoleNavigation, getRoleDescription } from './RoleBasedDashboard';
import { RoleSpecificContent } from './RoleSpecificContent';

interface UniversalDashboardProps {
  user: User;
  onLogout: () => void;
}

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
}

import { api } from '../services/api';

const UniversalDashboard: React.FC<UniversalDashboardProps> = ({ user, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const token = localStorage.getItem('token') || '';
  const navigation = getRoleNavigation(user.role);
  const roleDescription = getRoleDescription(user.role);

  const fetchDashboard = async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const data = await api.getDashboard(token);
      setDashboardData(data);
    } catch (err) {
      console.error('Failed to fetch dashboard:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [activeTab]);

  // Get role display info
  const getRoleDisplay = (role: string) => {
    const roles: Record<string, { label: string; color: string; emoji: string }> = {
      investor_micro: { label: '👤 Investor Micro', color: 'bg-blue-50 border-blue-300', emoji: '💰' },
      investor_enterprise: { label: '👔 Investor Enterprise', color: 'bg-purple-50 border-purple-300', emoji: '💼' },
      project_owner: { label: '🏢 Project Owner', color: 'bg-amber-50 border-amber-300', emoji: '🏭' },
      muzakki: { label: '🕌 Muzakki', color: 'bg-green-50 border-green-300', emoji: '📦' },
      munfiq_mutashadiq: { label: '🤝 Munfiq/Mutashadiq', color: 'bg-emerald-50 border-emerald-300', emoji: '❤️' },
      wakif: { label: '🏛️ Wakif', color: 'bg-indigo-50 border-indigo-300', emoji: '🏗️' },
      mustahiq: { label: '🙏 Mustahiq', color: 'bg-rose-50 border-rose-300', emoji: '🤲' },
      investment_officer: { label: '📊 Investment Officer', color: 'bg-cyan-50 border-cyan-300', emoji: '📈' },
      portfolio_monitor: { label: '👁️ Portfolio Monitor', color: 'bg-teal-50 border-teal-300', emoji: '🔍' },
      finance_officer: { label: '💳 Finance Officer', color: 'bg-orange-50 border-orange-300', emoji: '💰' },
      admin: { label: '⚙️ Admin', color: 'bg-slate-50 border-slate-300', emoji: '🔧' },
    };
    return roles[role] || { label: 'User', color: 'bg-gray-50', emoji: '👤' };
  };

  const roleDisplay = getRoleDisplay(user.role);

  const renderContent = () => {
    return (
      <RoleSpecificContent 
        role={user.role}
        activeTab={activeTab}
        user={user}
        data={dashboardData}
        token={token}
        onRefresh={fetchDashboard}
        onTabChange={setActiveTab}
      />
    );
  };

  return (
    <div className="h-screen bg-slate-100 flex overflow-hidden">
      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full'
        } bg-slate-900 text-white transition-all duration-300 overflow-hidden flex flex-col fixed md:relative h-screen z-40 shadow-2xl md:shadow-none`}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center font-bold text-lg italic">
              A
            </div>
            <span className="text-lg font-bold">ACO Platform</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Info - All Black */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-800">
          <div className="text-sm font-semibold text-white">{roleDisplay.label}</div>
          <div className="text-xs text-slate-400 mt-1">{user.name}</div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (window.innerWidth < 768) setSidebarOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-lg transition ${
                activeTab === item.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <div>
                  <div className="font-medium text-sm">{item.label}</div>
                  <div className="text-xs opacity-75">{item.description}</div>
                </div>
              </div>
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="border-t border-slate-800 p-4">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 transition"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-white border-b border-slate-200 px-4 md:px-10 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden text-slate-600 hover:text-slate-900"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="hidden md:flex items-center flex-1 max-w-md mx-4 bg-slate-100 rounded-lg px-4 py-2">
            <Search className="w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent ml-2 flex-1 outline-none text-sm text-slate-700"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-600 hover:text-slate-900">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-semibold">
                {user.name.charAt(0)}
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-semibold text-slate-900">{user.name}</div>
                <div className="text-xs text-slate-500">{roleDisplay.label}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-slate-100">
          <div className="p-6 md:p-10">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversalDashboard;
