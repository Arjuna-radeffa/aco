# LOGIN FIX - ROLE-BASED NAVIGATION

## 🔧 ISSUE YANG DIPERBAIKI

**Problem**: Login selalu kembali ke beranda (home) setelah login, tidak navigasi ke dashboard yang sesuai role

**Root Cause**: 
1. [`BeautifulLogin.tsx`](aco-frontend/src/components/BeautifulLogin.tsx:52) menggunakan `window.location.href = '/dashboard'` instead of calling `onLogin` prop
2. [`handleLogin`](aco-frontend/src/App.tsx:163) function di App.tsx tidak punya role-based navigation logic
3. Role mapping tidak match antara login component dan navigation logic

## ✅ PERBAIKAN YANG DILAKUKAN

### 1. Fixed BeautifulLogin Component
- **File**: [`aco-frontend/src/components/BeautifulLogin.tsx`](aco-frontend/src/components/BeautifulLogin.tsx:52)
- **Change**: Ganti `window.location.href = '/dashboard'` dengan panggilan `onLogin()` prop
- **Added**: `determineUserRole()` function untuk mapping email → role yang sesuai

### 2. Updated handleLogin Function  
- **File**: [`aco-frontend/src/App.tsx`](aco-frontend/src/App.tsx:163)
- **Change**: Tambah role-based navigation logic sama seperti `handleQuickLogin`
- **Logic**: 
  ```typescript
  if (['investor_micro', 'investor_enterprise', 'infaq_donor', 'waqf_donor', 'muzakki', 'mustahiq', 'external_user'].includes(userRole)) {
    navigate({ view: 'ex-dashboard' }) // External users
  } else {
    navigate({ view: 'dashboard' })     // Internal users
  }
  ```

### 3. Fixed Role Mapping Consistency
- **Before**: 'external' → tidak match dengan navigation logic
- **After**: 'external_user' → match dengan expected role di navigation
- **Updated mappings**:
  - `external@aco.id` → `external_user` 
  - `infaq@aco.id` → `infaq_donor`
  - `wakif@aco.id` → `waqf_donor`
  - `investor@aco.id` → `investor_micro`

## 🧪 TESTING INSTRUCTIONS

### Test Case 1: External User Login
1. Login dengan email: `external@aco.id`
2. **Expected**: Navigate ke `/my-dashboard` (external dashboard)

### Test Case 2: Internal User Login  
1. Login dengan email: `io@aco.id` (Investment Officer)
2. **Expected**: Navigate ke `/dashboard` (internal dashboard)

### Test Case 3: Muzakki Login
1. Login dengan email: `muzakki@aco.id`
2. **Expected**: Navigate ke `/my-dashboard` (external dashboard)

### Test Case 4: Admin Login
1. Login dengan email: `admin@aco.id`
2. **Expected**: Navigate ke `/dashboard` (internal dashboard)

## 📊 ROLE MAPPING TABLE

| Email | Role | Dashboard Type |
|-------|------|----------------|
| `external@aco.id` | `external_user` | External (`/my-dashboard`) |
| `muzakki@aco.id` | `muzakki` | External (`/my-dashboard`) |
| `infaq@aco.id` | `infaq_donor` | External (`/my-dashboard`) |
| `wakif@aco.id` | `waqf_donor` | External (`/my-dashboard`) |
| `investor@aco.id` | `investor_micro` | External (`/my-dashboard`) |
| `io@aco.id` | `investment_officer` | Internal (`/dashboard`) |
| `pm@aco.id` | `portfolio_monitor` | Internal (`/dashboard`) |
| `finance@aco.id` | `finance_officer` | Internal (`/dashboard`) |
| `admin@aco.id` | `admin` | Internal (`/dashboard`) |

## 🚀 RESULT

Sekarang login akan navigasi ke dashboard yang sesuai dengan role user:
- **External Users**: External Dashboard (`/my-dashboard`)
- **Internal Users**: Internal Dashboard (`/dashboard`)

Tidak ada lagi issue kembali ke beranda setelah login!