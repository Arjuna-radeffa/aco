import React from 'react';
import { MaterialIcon, dashboardIcons } from './IconHelper';
import { RoleBasedForms } from '../RoleBasedForms';
import { Heart, Users, BarChart3, TrendingUp, AlertCircle, CheckCircle2, Clock, Shield, Target } from 'lucide-react';

interface AdminDashboardProps {
  activeTab: string;
  data?: any;
  token?: string;
  onRefresh?: () => void;
  user?: any;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ activeTab, data, token, onRefresh, user }) => {
  const dashboardData = data?.admin || {
    totalUsers: '2,543',
    systemHealth: '99.8%',
    security: '✅ Secure',
    auditLogs: '45.2K',
    newUsers: '125 users registered this week',
    systemAlerts: 'All systems operational',
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-2">
          <MaterialIcon icon="settings" size="large" />
          Admin Dashboard
        </h1>
        <p className="text-slate-600">Kelola sistem platform dan user management</p>
      </div>

      {activeTab === 'dashboard' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-300 rounded-lg p-6">
              <div className="text-slate-600 text-sm font-semibold mb-1 flex items-center gap-1">
                <MaterialIcon icon="people" /> Total Users
              </div>
              <div className="text-2xl font-bold text-slate-900">{dashboardData.totalUsers}</div>
              <div className="text-xs text-slate-600 mt-2">Active</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-300 rounded-lg p-6">
              <div className="text-blue-600 text-sm font-semibold mb-1 flex items-center gap-1">
                <MaterialIcon icon="health_and_safety" /> System Health
              </div>
              <div className="text-2xl font-bold text-blue-900">{dashboardData.systemHealth}</div>
              <div className="text-xs text-blue-600 mt-2">Uptime</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-300 rounded-lg p-6">
              <div className="text-emerald-600 text-sm font-semibold mb-1 flex items-center gap-1">
                <MaterialIcon icon="lock" /> Security
              </div>
              <div className="text-2xl font-bold text-emerald-900 flex items-center gap-1">
                Secure
              </div>
              <div className="text-xs text-emerald-600 mt-2">All Clear</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-300 rounded-lg p-6">
              <div className="text-purple-600 text-sm font-semibold mb-1 flex items-center gap-1">
                <MaterialIcon icon="history" /> Audit Logs
              </div>
              <div className="text-2xl font-bold text-purple-900">{dashboardData.auditLogs}</div>
              <div className="text-xs text-purple-600 mt-2">This Month</div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'users' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <MaterialIcon icon="people" /> 
              <h2 className="text-lg font-semibold">User Management</h2>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Rina Wijaya', email: 'rina@aco.com', role: 'investor_micro', status: 'Active', kyc: 'Verified' },
                { name: 'Budi Santoso', email: 'budi@aco.com', role: 'investor_enterprise', status: 'Active', kyc: 'Verified' },
                { name: 'Dimas Pratama', email: 'dimas@aco.com', role: 'project_owner', status: 'Active', kyc: 'Verified' },
                { name: 'Pak Salim Hartono', email: 'salim@aco.com', role: 'muzakki', status: 'Active', kyc: 'Verified' },
                { name: 'Tari Budiono', email: 'tari@aco.com', role: 'finance_officer', status: 'Active', kyc: 'Verified' },
              ].map((user, idx) => (
                <div key={idx} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-slate-900">{user.name}</p>
                      <p className="text-xs text-slate-500 mt-1">{user.email}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded">{user.role}</span>
                        <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded">{user.kyc}</span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 bg-emerald-100 text-emerald-700 rounded">{user.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 rounded-[2.5rem] border border-slate-200 p-10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-extrabold tracking-tight">ZIS Program Oversight & Audit Logs</h2>
              </div>
              <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-white px-4 py-2 rounded-xl border border-indigo-100 shadow-sm hover:bg-indigo-50 transition-all">
                Full Audit Trail
              </button>
            </div>
            
            <div className="space-y-4">
               {[
                 { action: 'Zakat Fund Allocation', user: 'Hendra (Finance)', amount: 'Rp 450M', time: '2 hours ago', status: 'Verified' },
                 { action: 'New Mustahiq List Approved', user: 'Sinta (Monitor)', amount: '124 Beneficiaries', time: '5 hours ago', status: 'Approved' },
                 { action: 'Infaq Program Disbursement', user: 'Hendra (Finance)', amount: 'Rp 120M', time: '1 day ago', status: 'Verified' }
               ].map((log, idx) => (
                 <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-indigo-200 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                        <Clock size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{log.action}</p>
                        <p className="text-xs text-slate-500 font-medium">By {log.user} • {log.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-slate-900 mb-1">{log.amount}</p>
                      <span className="text-[9px] font-black px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full uppercase">{log.status}</span>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'projects' && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <MaterialIcon icon="folder" /> 
            <h2 className="text-lg font-semibold">Kelola Proyek Homepage</h2>
          </div>
          <p className="text-sm text-slate-600 mb-6 font-medium">
            Gunakan form di bawah untuk mengubah label dan status proyek yang tampil di homepage.
          </p>
          <RoleBasedForms user={user} token={token || ''} onSuccess={onRefresh || (() => {})} />
        </div>
      )}

      {activeTab === 'audit' && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <MaterialIcon icon="history" /> 
            <h2 className="text-lg font-semibold">Audit Log</h2>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-[500px] space-y-2">
              {[
                { time: '2026-05-20 14:32', user: 'Rina Wijaya', action: 'Login', status: 'Success', ip: '192.168.1.100' },
                { time: '2026-05-20 14:28', user: 'Budi Santoso', action: 'Investment Created', status: 'Success', ip: '192.168.1.101' },
                { time: '2026-05-20 14:15', user: 'Tari Budiono', action: 'Disbursement Verified', status: 'Success', ip: '192.168.1.102' },
                { time: '2026-05-20 13:45', user: 'Pak Salim', action: 'Zakat Payment', status: 'Success', ip: '192.168.1.103' },
                { time: '2026-05-20 13:30', user: 'Dimas P', action: 'Project Updated', status: 'Success', ip: '192.168.1.104' },
              ].map((log, idx) => (
                <div key={idx} className="p-3 border border-slate-200 rounded-lg text-xs hover:bg-slate-50 transition">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-slate-900">{log.action}</p>
                      <p className="text-slate-600">{log.user} • {log.time}</p>
                    </div>
                    <span className="text-slate-600">{log.ip}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <MaterialIcon icon="settings" /> 
            <h2 className="text-lg font-semibold">Konfigurasi Sistem</h2>
          </div>
          <div className="space-y-4">
            <div className="p-4 border border-slate-200 rounded-lg">
              <p className="font-semibold text-slate-900 mb-3">Platform Settings</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Maintenance Mode</span>
                  <label className="flex items-center gap-2"><input type="checkbox" className="w-4 h-4" /><span>Off</span></label>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">API Rate Limit</span>
                  <input type="number" className="w-20 px-2 py-1 border border-slate-200 rounded text-xs" defaultValue="1000" />
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Session Timeout (min)</span>
                  <input type="number" className="w-20 px-2 py-1 border border-slate-200 rounded text-xs" defaultValue="30" />
                </div>
              </div>
            </div>
            <div className="p-4 border border-slate-200 rounded-lg">
              <p className="font-semibold text-slate-900 mb-3">Security Settings</p>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-sm text-slate-600">Enable 2FA for all users</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-sm text-slate-600">SSL/TLS Encryption</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-sm text-slate-600">IP Whitelisting</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
