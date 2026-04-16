# ACO Platform - File Structure by User Roles

## 📋 Overview

This document outlines the comprehensive file structure for the ACO (Amil, Crowdfunding, Ownership) platform, organized by user roles as described in the application narrative. The structure ensures proper isolation of functionality, specialized features per user type, and maintains the core principles of transparency, accountability, and trust.

## 🏗️ File Structure

```
aco-platform/
├── src/
│   ├── core/                          # Shared functionality across all modules
│   │   ├── authentication/            # Role-based authentication system
│   │   │   ├── AuthContext.tsx        # React context for auth state
│   │   │   ├── useAuth.ts             # Custom auth hook
│   │   │   ├── rolePermissions.ts     # Role-based permission definitions
│   │   │   └── KYCVerification.ts     # KYC verification service
│   │   │
│   │   ├── database/                  # Database models and migrations
│   │   │   ├── models/
│   │   │   │   ├── User.ts            # Base user model with role attributes
│   │   │   │   ├── Project.ts         # Business project model
│   │   │   │   ├── Investment.ts      # Investment records
│   │   │   │   ├── Transaction.ts     # Financial transactions
│   │   │   │   ├── Zakat.ts           # Zakat-specific models
│   │   │   │   ├── Waqf.ts            # Waqf-specific models
│   │   │   │   └── Document.ts        # Legal and KYC documents
│   │   │   └── migrations/            # Database migrations
│   │   │
│   │   ├── utils/                     # Shared utilities
│   │   │   ├── apiClient.ts           # API client configuration
│   │   │   ├── formatters.ts          # Data formatting utilities
│   │   │   ├── validators.ts          # Input validation
│   │   │   └── notificationService.ts # Notification system
│   │   │
│   │   └── types/                     # TypeScript definitions
│   │       ├── userTypes.ts           # User role types
│   │       ├── investmentTypes.ts     # Investment-related types
│   │       ├── zisTypes.ts            # ZIS-specific types
│   │       └── apiTypes.ts            # API response types
│   │
│   ├── modules/                       # Role-specific functionality modules
│   │   ├── investors/                 # Investor functionality
│   │   │   ├── micro/                 # Micro investors (Rina)
│   │   │   │   ├── components/
│   │   │   │   │   ├── MicroDashboard.tsx
│   │   │   │   │   ├── ProjectDiscovery.tsx
│   │   │   │   │   ├── PortfolioView.tsx
│   │   │   │   │   └── WithdrawalRequest.tsx
│   │   │   │   ├── services/
│   │   │   │   │   ├── microInvestmentService.ts
│   │   │   │   │   └── portfolioService.ts
│   │   │   │   └── types/
│   │   │   │       └── microTypes.ts
│   │   │   │
│   │   │   └── enterprise/            # Enterprise investors (Budi)
│   │   │       ├── components/
│   │   │       │   ├── EnterpriseDashboard.tsx
│   │   │       │   ├── PortfolioManager.tsx
│   │   │       │   ├── AdvancedAnalytics.tsx
│   │   │       │   └── APIIntegration.tsx
│   │   │       ├── services/
│   │   │       │   ├── enterpriseService.ts
│   │   │       │   └── analyticsService.ts
│   │   │       └── types/
│   │   │           └── enterpriseTypes.ts
│   │   │
│   │   ├── project-owners/            # Project owners (Dimas)
│   │   │   ├── components/
│   │   │   │   ├── ProposalSubmission.tsx
│   │   │   │   ├── BusinessDashboard.tsx
│   │   │   │   ├── FinancialReporting.tsx
│   │   │   │   └── InvestorCommunication.tsx
│   │   │   ├── services/
│   │   │   │   ├── projectOwnerService.ts
│   │   │   │   └── reportingService.ts
│   │   │   ├── types/
│   │   │   │   └── projectOwnerTypes.ts
│   │   │   └── accounting/            # ACO accounting module
│   │   │       ├── AccountingModule.tsx
│   │   │       └── apiIntegration/    # External API integration
│   │   │
│   │   ├── zis-wakaf/                 # Zakat, Infaq, Shadaqah, Wakaf
│   │   │   ├── zakat/                 # Muzakki (Pak Salim)
│   │   │   │   ├── components/
│   │   │   │   │   ├── ZakatCalculator.tsx
│   │   │   │   │   ├── AsnafAllocation.tsx
│   │   │   │   │   └── ImpactDashboard.tsx
│   │   │   │   ├── services/
│   │   │   │   │   └── zakatService.ts
│   │   │   │   └── types/
│   │   │   │       └── zakatTypes.ts
│   │   │   │
│   │   │   ├── infaq-shadaqah/        # Munfiq/Mutashadiq (Bu Tari)
│   │   │   │   ├── components/
│   │   │   │   │   ├── DonationPortal.tsx
│   │   │   │   │   ├── ProgramSelection.tsx
│   │   │   │   │   └── MonthlyReports.tsx
│   │   │   │   ├── services/
│   │   │   │   │   └── donationService.ts
│   │   │   │   └── types/
│   │   │   │       └── donationTypes.ts
│   │   │   │
│   │   │   ├── waqf/                  # Wakif (Haji Mahmud)
│   │   │   │   ├── components/
│   │   │   │   │   ├── WaqfRegistration.tsx
│   │   │   │   │   ├── ProductiveScheme.tsx
│   │   │   │   │   └── AssetProtection.tsx
│   │   │   │   ├── services/
│   │   │   │   │   └── waqfService.ts
│   │   │   │   └── types/
│   │   │   │       └── waqfTypes.ts
│   │   │   │
│   │   │   └── mustahiq/              # Mustahiq (Pak Ruslan)
│   │   │       ├── components/
│   │   │       │   ├── BenefitTracking.tsx
│   │   │       │   ├── EmpowermentPrograms.tsx
│   │   │       │   └── InvestorTransition.tsx
│   │   │       ├── services/
│   │   │       │   └── mustahiqService.ts
│   │   │       └── types/
│   │   │           └── mustahiqTypes.ts
│   │   │
│   │   └── internal/                  # ACO internal teams
│   │       ├── investment-officer/    # Investment Officer (Arief)
│   │       │   ├── components/
│   │       │   │   ├── PipelineManager.tsx
│   │       │   │   ├── DueDiligence.tsx
│   │       │   │   ├── SchemeDesigner.tsx
│   │       │   │   └── CommitteeRecommendation.tsx
│   │       │   ├── services/
│   │       │   │   └── investmentOfficerService.ts
│   │       │   └── types/
│   │       │       └── investmentOfficerTypes.ts
│   │       │
│   │       ├── portfolio-monitor/     # Portfolio Monitor (Sinta)
│   │       │   ├── components/
│   │       │   │   ├── BusinessHealthMonitor.tsx
│   │       │   │   ├── AnomalyDetection.tsx
│   │       │   │   ├── InterventionManager.tsx
│   │       │   │   └── FinalReports.tsx
│   │       │   ├── services/
│   │       │   │   └── portfolioMonitorService.ts
│   │       │   └── types/
│   │       │       └── portfolioMonitorTypes.ts
│   │       │
│   │       ├── finance-officer/       # Finance Officer (Hendra)
│   │       │   ├── components/
│   │       │   │   ├── FundIsolationManager.tsx
│   │       │   │   ├── ReconciliationTool.tsx
│   │       │   │   ├── ProfitCalculation.tsx
│   │       │   │   └── LiquidationManager.tsx
│   │       │   ├── services/
│   │       │   │   └── financeOfficerService.ts
│   │       │   └── types/
│   │       │       └── financeOfficerTypes.ts
│   │       │
│   │       └── admin/                 # Admin/Platform Operator (Reza)
│   │           ├── components/
│   │           ├── services/
│   │           └── types/
│   │
│   ├── shared/                        # Reusable components and utilities
│   │   ├── components/                # Shared UI components
│   │   │   ├── Layout/
│   │   │   ├── Forms/
│   │   │   ├── Charts/
│   │   │   └── Modals/
│   │   ├── hooks/                     # Custom React hooks
│   │   │   ├── useDashboard.ts
│   │   │   ├── useNotifications.ts
│   │   │   └── useRealTimeData.ts
│   │   └── constants/                 # App-wide constants
│   │       ├── routes.ts
│   │       ├── fundTypes.ts
│   │       └── errorMessages.ts
│   │
│   └── App.tsx                        # Main application component
│
├── public/                            # Static assets
│   ├── index.html
│   ├── favicon.ico
│   └── assets/
│       ├── images/
│       └── documents/
│
├── tests/                             # Test files
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── docs/                              # Documentation
│   ├── api/
│   ├── deployment/
│   └── user-guides/
│
└── config/                            # Configuration files
    ├── webpack.config.js
    ├── tsconfig.json
    └── environment/
        ├── development.env
        ├── production.env
        └── test.env
```

## 👥 User Role Functions and Features

### 🎯 **Investor Micro (Rina)**
**Key Functions:**
- **KYC Verification**: Complete identity verification before account activation
- **Project Discovery**: Browse real businesses seeking funding with detailed profiles
- **Portfolio Dashboard**: Real-time tracking of investments and returns
- **Withdrawal System**: Cancel investments before fund disbursement with verification
- **Notifications**: Automated alerts for profit-sharing and important updates

**Technical Requirements:**
- Simple, intuitive UI for non-technical users
- Mobile-responsive design for accessibility
- Real-time portfolio value updates
- Secure transaction processing

### 🏢 **Investor Enterprise (Budi)**
**Key Functions:**
- **Portfolio Management**: Multi-project allocation across different investment schemes
- **Advanced Monitoring**: Customizable alerts for performance anomalies and thresholds
- **Comprehensive Reporting**: Detailed financial analytics and export capabilities
- **API Integration**: Direct system connectivity for automated operations
- **Risk Management**: Sophisticated risk assessment tools

**Technical Requirements:**
- Advanced data visualization and analytics
- Bulk operation capabilities
- API endpoints for system integration
- Custom reporting and data export
- Role-based access within enterprise teams

### 🚀 **Project Owner (Dimas)**
**Key Functions:**
- **Proposal Submission**: Comprehensive business funding applications with documentation
- **Due Diligence**: Streamlined compliance with ACO's verification process
- **Financial Integration**: Connect existing accounting systems or use ACO's built-in module
- **Investor Communication**: Transparent reporting and updates to stakeholders
- **Performance Tracking**: Monitor business metrics and investor relations

**Technical Requirements:**
- Document upload and management system
- Financial data integration (both ACO module and external APIs)
- Real-time investor communication tools
- Performance metric tracking and reporting

### 🤲 **Muzakki (Pak Salim) - Zakat Giver**
**Key Functions:**
- **Zakat Calculator**: Automated zakat maal calculations based on Islamic principles
- **Asnaf Categorization**: Proper distribution to 8 eligible categories with validation
- **Impact Reporting**: Transparent tracking of zakat utilization and outcomes
- **Tax Documentation**: Generate official receipts and documentation for tax purposes
- **Historical Tracking**: Complete history of zakat contributions and distributions

**Technical Requirements:**
- Shariah-compliant calculation algorithms
- Strict fund isolation from other account types
- Comprehensive audit trails
- Official documentation generation

### ❤️ **Munfiq/Mutashadiq (Bu Tari) - Infaq/Shadaqah**
**Key Functions:**
- **Program Selection**: Choose specific charitable programs or causes
- **Flexible Allocation**: Designate funds to specific programs or general pool
- **Monthly Reports**: Regular updates on program impact and beneficiary stories
- **Contribution History**: Complete tracking of all donations over time
- **Recurring Donations**: Setup automated monthly contributions

**Technical Requirements:**
- Program catalog with detailed descriptions
- Flexible donation allocation system
- Automated reporting and notification system
- Recurring payment processing

### 🏛️ **Wakif (Haji Mahmud) - Waqf Donor**
**Key Functions:**
- **Asset Registration**: Comprehensive documentation and valuation of waqf properties
- **Productive Schemes**: Design and manage income-generating waqf arrangements
- **Asset Protection**: Continuous monitoring of principal value preservation
- **Performance Reports**: Quarterly updates on waqf performance and impact
- **Beneficiary Tracking**: Monitoring of results distribution to mustahiq

**Technical Requirements:**
- Asset management and valuation tools
- Productive scheme design and monitoring
- Principal value protection mechanisms
- Comprehensive reporting system
- Strict isolation from other fund types

### 📈 **Mustahiq (Pak Ruslan) - Beneficiary→Investor**
**Key Functions:**
- **Benefit Tracking**: Monitor received assistance programs and support
- **Empowerment Programs**: Access to skill development and capacity building
- **Investor Transition**: Seamless pathway from recipient to micro-investor
- **Dual Identity Management**: Separate records for historical benefits and current investments
- **Progress Monitoring**: Track personal development and business growth

**Technical Requirements:**
- Dual identity management system
- Transition pathway automation
- Progress tracking and reporting
- Secure data isolation between beneficiary and investor roles

### 🏢 **Internal ACO Teams**

#### **Investment Officer (Arief)**
**Key Functions:**
- Pipeline management and prioritization
- Due diligence workflow automation
- Investment scheme design and risk assessment
- Project evaluation and committee recommendations
- Investor consultation and relationship management

**Technical Requirements:**
- Workflow management tools
- Risk assessment algorithms
- Document review and approval system
- Investor communication platform

#### **Portfolio Monitor (Sinta)**
**Key Functions:**
- Real-time business health monitoring and alerting
- Anomaly detection and early warning systems
- Intervention coordination and management
- Investor communication during critical events
- Final reporting for failed businesses

**Technical Requirements:**
- Real-time data monitoring system
- Anomaly detection algorithms
- Intervention workflow management
- Automated reporting system

#### **Finance Officer (Hendra)**
**Key Functions:**
- **Fund Isolation**: Management of 4 separate account types with strict separation
- **Reconciliation**: Accurate fund tracking and disbursement verification
- **Profit Calculation**: Proportional distribution of returns to investors
- **Liquidation Management**: Handling of failed business asset distribution
- **Audit Trail**: Complete transaction history and verification

**Technical Requirements:**
- Multi-account management system
- Automated reconciliation tools
- Profit distribution algorithms
- Liquidation process management
- Comprehensive audit trail system

#### **Admin/Platform Operator (Reza)**
**Key Functions:**
- User verification and KYC processing
- Access control and permission management
- Legal document validation and management
- System operations and maintenance
- User support and issue resolution

**Technical Requirements:**
- User management system
- Document verification tools
- Access control system
- Support ticket management
- System monitoring tools

## 🔐 Critical System Requirements

### Fund Isolation Architecture
```typescript
// Strict separation between fund types
enum FundType {
  INVESTMENT = 'investment',      // Investor funds
  ZAKAT = 'zakat',               // Zakat funds
  INFAQ_SADAQAH = 'infaq_sadaqah', // Infaq/Shadaqah funds
  WAQF = 'waqf'                  // Waqf funds
}

// Each fund type has completely separate accounting
interface FundAccount {
  type: FundType;
  balance: number;
  transactions: Transaction[];
  isIsolated: true; // Enforced isolation
}
```

### Security and Compliance
- **PCI DSS Compliance**: For financial transactions
- **GDPR Compliance**: For data protection
- **Shariah Compliance**: Regular audits and validation
- **Role-Based Access Control**: Strict permission management
- **Audit Trail**: Complete transaction history

### Real-Time Features
- Live portfolio updates
- Instant notifications
- Real-time business monitoring
- Live chat and communication

### API Integration
- Banking API integration for fund transfers
- Accounting software integration
- Document verification services
- SMS/Email notification services

## 🚀 Implementation Phases

### Phase 1: Core Platform Foundation (Weeks 1-4)
1. Authentication and user management system
2. Basic dashboard framework
3. Database schema setup
4. Role-based access control implementation

### Phase 2: Investment Module (Weeks 5-8)
1. Project listing and discovery system
2. Investment flow implementation
3. Portfolio management features
4. Returns calculation system

### Phase 3: ZIS Module (Weeks 9-12)
1. Fund isolation implementation
2. Asnaf categorization system
3. Impact reporting features
4. Donation management system

### Phase 4: Advanced Features (Weeks 13-16)
1. Real-time monitoring system
2. API integrations
3. Advanced reporting and analytics
4. Mobile optimization and app development

## ✅ Verification and Testing

### Role-Based Access Testing
- Verify each user role has appropriate access
- Test permission boundaries between roles
- Validate fund isolation between account types

### Fund Isolation Validation
- Ensure no cross-contamination between fund types
- Test transaction boundaries
- Verify accounting separation

### Transaction Reconciliation
- Test accuracy of profit distribution
- Validate liquidation calculations
- Verify audit trail completeness

### Real-Time Features
- Test notification delivery
- Validate real-time data updates
- Verify system performance under load

### Mobile Responsiveness
- Test across different devices
- Validate touch interface usability
- Verify offline functionality

---

*This file structure and role-based organization ensures that ACO maintains its core principles of transparency, accountability, and trust while providing specialized functionality for each user type in the ecosystem.*