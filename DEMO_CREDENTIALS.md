# 🔐 ACO Platform - Demo Credentials & Mock Data

## Demo Credentials untuk Semua User Roles

Gunakan credentials berikut untuk login ke platform tanpa database. **Password semua user: `password123`**

---

## 👥 Demo Users & Credentials

| # | Role | Nama | Email | Password | Status |
|---|------|------|-------|----------|--------|
| 1 | **Investor Micro** | Rina Wijaya | `rina@aco.com` | `password123` | KYC Verified ✅ |
| 2 | **Investor Enterprise** | Budi Santoso | `budi@aco.com` | `password123` | KYC Verified ✅ |
| 3 | **Project Owner** | Dimas Pratama | `dimas@aco.com` | `password123` | KYC Verified ✅ |
| 4 | **Muzakki** | Pak Salim Hartono | `salim@aco.com` | `password123` | KYC Verified ✅ |
| 5 | **Munfiq/Mutashadiq** | Bu Tari Rahayu | `tari@aco.com` | `password123` | KYC Verified ✅ |
| 6 | **Wakif** | Haji Mahmud | `mahmud@aco.com` | `password123` | KYC Verified ✅ |
| 7 | **Mustahiq** | Pak Ruslan | `ruslan@aco.com` | `password123` | KYC Verified ✅ |
| 8 | **Investment Officer** | Arief Wijaksana | `arief@aco.com` | `password123` | Staff ✅ |
| 9 | **Portfolio Monitor** | Sinta Kusuma | `sinta@aco.com` | `password123` | Staff ✅ |
| 10 | **Finance Officer** | Hendra Gunawan | `hendra@aco.com` | `password123` | Staff ✅ |
| 11 | **Admin/Platform Operator** | Reza Pratama | `reza@aco.com` | `password123` | Staff ✅ |

---

## 📊 Mock Dashboard Data Per User

### 1️⃣ **Investor Micro - Rina Wijaya**
```json
{
  "id": "inv_micro_001",
  "email": "rina@aco.com",
  "name": "Rina Wijaya",
  "role": "investor_micro",
  "kycStatus": "verified",
  "accounts": {
    "investment": { "balance": "Rp 45.230.000", "change": "+2.4%" },
    "zakat": { "balance": "Rp 0", "change": "0%" }
  },
  "activeInvestments": 3,
  "totalReturns": "Rp 2.450.000",
  "nextDisbursement": "15 April 2026"
}
```

### 2️⃣ **Investor Enterprise - Budi Santoso**
```json
{
  "id": "inv_ent_001",
  "email": "budi@aco.com",
  "name": "Budi Santoso",
  "role": "investor_enterprise",
  "kycStatus": "verified",
  "accounts": {
    "investment": { "balance": "Rp 450.230.000.000", "change": "+5.8%" },
    "zakat": { "balance": "Rp 12.450.000", "change": "+1.2%" }
  },
  "portfolioValue": "Rp 500.000.000.000",
  "activeInvestments": 12,
  "totalReturns": "Rp 24.500.000.000",
  "apiIntegrationActive": true
}
```

### 3️⃣ **Project Owner - Dimas Pratama**
```json
{
  "id": "po_001",
  "email": "dimas@aco.com",
  "name": "Dimas Pratama",
  "role": "project_owner",
  "kycStatus": "verified",
  "businessName": "Toko Laundry Malang",
  "projectStatus": "Active",
  "fundingRaised": "Rp 150.000.000",
  "investorCount": 23,
  "monthlyProfit": "Rp 18.500.000",
  "nextReportDue": "30 April 2026"
}
```

### 4️⃣ **Muzakki - Pak Salim Hartono**
```json
{
  "id": "mz_001",
  "email": "salim@aco.com",
  "name": "Pak Salim Hartono",
  "role": "muzakki",
  "kycStatus": "verified",
  "zakatBalance": "Rp 25.000.000",
  "asnafAllocation": {
    "fakir": "Rp 5.000.000",
    "miskin": "Rp 5.000.000",
    "amil": "Rp 2.500.000",
    "muallaf": "Rp 2.500.000",
    "riqab": "Rp 2.500.000",
    "gharim": "Rp 2.500.000",
    "fisabilillah": "Rp 3.000.000",
    "ibn_sabil": "Rp 2.000.000"
  },
  "zakatYear": "1445H",
  "lastDistribution": "25 Maret 2026"
}
```

### 5️⃣ **Munfiq/Mutashadiq - Bu Tari Rahayu**
```json
{
  "id": "mf_001",
  "email": "tari@aco.com",
  "name": "Bu Tari Rahayu",
  "role": "munfiq_mutashadiq",
  "kycStatus": "verified",
  "monthlyDonation": "Rp 5.000.000",
  "activePrograms": 4,
  "programsSupported": [
    "Pemberdayaan UMKM Perempuan",
    "Program Beasiswa Anak Yatim",
    "Klinik Kesehatan Gratis",
    "Rumah Panen Urban Farming"
  ],
  "totalImpact": "Rp 45.000.000",
  "beneficiaries": 234
}
```

### 6️⃣ **Wakif - Haji Mahmud**
```json
{
  "id": "wk_001",
  "email": "mahmud@aco.com",
  "name": "Haji Mahmud",
  "role": "wakif",
  "kycStatus": "verified",
  "waqfAsset": "Rp 500.000.000",
  "waqfType": "Productive Waqf (Wakaf Produktif)",
  "assetDescription": "Toserba Waralaba di Jakarta & Surabaya",
  "monthlyYield": "Rp 8.500.000",
  "waqfNiyyah": "Untuk Dakwah Islam dan Pendidikan",
  "registrationDate": "01 Januari 2024"
}
```

### 7️⃣ **Mustahiq - Pak Ruslan**
```json
{
  "id": "mh_001",
  "email": "ruslan@aco.com",
  "name": "Pak Ruslan",
  "role": "mustahiq",
  "kycStatus": "verified",
  "supportType": "Penerima Manfaat (Beneficiary)",
  "monthlySupport": "Rp 2.000.000",
  "programs": [
    "Program Pelatihan Otomotif",
    "Bansos Produktif",
    "Fasilitasi Pinjaman Modal Usaha"
  ],
  "empowermentStatus": "Transitioning to Investor",
  "enrollmentDate": "15 Juli 2024"
}
```

### 8️⃣ **Investment Officer - Arief Wijaksana**
```json
{
  "id": "io_001",
  "email": "arief@aco.com",
  "name": "Arief Wijaksana",
  "role": "investment_officer",
  "kycStatus": "verified",
  "department": "Investment Management",
  "pipeline": {
    "submitted": 5,
    "underReview": 3,
    "approved": 12,
    "rejected": 1
  },
  "dueDiligenceActive": 3,
  "projectsManaged": 28
}
```

### 9️⃣ **Portfolio Monitor - Sinta Kusuma**
```json
{
  "id": "pm_001",
  "email": "sinta@aco.com",
  "name": "Sinta Kusuma",
  "role": "portfolio_monitor",
  "kycStatus": "verified",
  "department": "Portfolio Management",
  "portfoliosMonitored": 28,
  "healthStatus": "Excellent",
  "anomaliesDetected": 1,
  "interventionsPlanned": 1,
  "reportsSubmitted": 47
}
```

### 🔟 **Finance Officer - Hendra Gunawan**
```json
{
  "id": "fo_001",
  "email": "hendra@aco.com",
  "name": "Hendra Gunawan",
  "role": "finance_officer",
  "kycStatus": "verified",
  "department": "Finance",
  "fundIsolation": {
    "investmentFund": "Rp 2.450.000.000.000",
    "zakatFund": "Rp 125.000.000.000",
    "infaqFund": "Rp 85.000.000.000",
    "waqfFund": "Rp 500.000.000.000"
  },
  "reconciliationStatus": "99.8% Match",
  "pendingTransactions": 12
}
```

### 1️⃣1️⃣ **Admin - Reza Pratama**
```json
{
  "id": "admin_001",
  "email": "reza@aco.com",
  "name": "Reza Pratama",
  "role": "admin",
  "kycStatus": "verified",
  "department": "Platform Operations",
  "permissions": "Full Access",
  "totalUsers": 1247,
  "activeProjects": 89,
  "systemHealth": "100%",
  "auditLog": "Last Updated: 13 April 2026 12:30"
}
```

---

## 🚀 Cara Menggunakan Demo Credentials

### **Di Login Page:**
1. Masukkan email dari tabel di atas (contoh: `rina@aco.com`)
2. Masukkan password: `password123`
3. Klik "Sign In ke Dashboard"

### **Atau Gunakan Quick Login:**
- Scroll ke bawah login form
- Klik tombol dengan nama user untuk instant login

### **LocalStorage Persistence:**
- Login akan disimpan di browser
- Refresh page: tetap login (sampai logout)
- Close browser: session hilang

---

## 📝 Daftar Mock Data untuk Setiap Role

### **Investor (Rina & Budi)**
- ✅ Account balances dengan 4 fund types
- ✅ Portfolio overview
- ✅ Pending disbursements
- ✅ Transaction history
- ✅ Withdrawal requests

### **Project Owner (Dimas)**
- ✅ Business profile
- ✅ Funding progress
- ✅ Investor list
- ✅ Financial reports
- ✅ Proposal submissions

### **Zakat/Infaq/Waqf (Salim, Tari, Mahmud)**
- ✅ Donation tracking
- ✅ Program allocation
- ✅ Impact metrics
- ✅ Beneficiary list
- ✅ Distribution history

### **Mustahiq (Ruslan)**
- ✅ Support received
- ✅ Empowerment programs
- ✅ Impact tracking
- ✅ Improvement metrics

### **Internal Teams (Arief, Sinta, Hendra, Reza)**
- ✅ Dashboard metrics
- ✅ Workload tracking
- ✅ System health
- ✅ Pending tasks
- ✅ Audit logs

---

## ⚙️ Testing Scenarios

### **Test Case 1: Multi-Role Login**
```
1. Login as Rina (Investor Micro)
   - View: Investment Portfolio, Account Isolation
   
2. Logout
   
3. Login as Budi (Investor Enterprise)
   - View: Advanced Analytics, API Integration
   
4. Compare dashboards: Different UI, same data structure
```

### **Test Case 2: Role-Based Navigation**
```
- Investor: Dashboard, Accounts, Disbursement Requests
- Project Owner: Dashboard, Proposals, Financial Reports
- Staff: Dashboard, Management Tools, Audit Logs
```

### **Test Case 3: Fund Isolation Verification**
```
- Each user has separate account balances
- Fund types properly isolated (Investment/Zakat/Infaq/Waqf)
- No cross-contamination of data
```

---

## 🔐 Security Notes

- ⚠️ **Demo Only**: Passwords tidak di-hash, hanya di-validate dengan string matching
- ⚠️ **No Authentication**: Tidak ada backend validation
- ⚠️ **LocalStorage**: Tokens tersimpan tidak aman (untuk demo saja)

### **Production Checklist:**
- [ ] Implement proper JWT authentication
- [ ] Hash passwords dengan bcrypt
- [ ] Database integration untuk user data
- [ ] Role-based access control (RBAC)
- [ ] Secure session management
- [ ] Audit logging

---

## 📞 Quick Reference

**Default Test Flow:**
```
1. Start app: http://localhost:3000
2. Login page muncul (tidak ada auto-login)
3. Masukkan: rina@aco.com / password123
4. Dashboard muncul dengan mock data
5. Logout & coba user lain
```

**All Credentials Stored In:** `aco-frontend/src/mockAuth.ts`

Happy testing! 🎉
