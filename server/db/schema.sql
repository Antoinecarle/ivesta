-- Ivesta Family Office SaaS - Database Schema
-- Using 'ivesta' schema to avoid conflicts with other apps

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE SCHEMA IF NOT EXISTS ivesta;

-- ═══════════════════════════════════════════════
-- USERS & AUTH
-- ═══════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS ivesta.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'analyst' CHECK (role IN ('founder', 'partner', 'officer', 'analyst', 'data_keeper', 'client')),
  avatar_url TEXT,
  phone VARCHAR(50),
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════════════
-- FAMILIES & CLIENTS
-- ═══════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS ivesta.families (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  code VARCHAR(50) UNIQUE,
  total_aum DECIMAL(20, 2) DEFAULT 0,
  risk_profile VARCHAR(50),
  investment_preferences JSONB DEFAULT '{}',
  notes TEXT,
  assigned_partner_id UUID REFERENCES ivesta.users(id),
  assigned_officer_id UUID REFERENCES ivesta.users(id),
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'prospect', 'inactive', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ivesta.family_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  family_id UUID NOT NULL REFERENCES ivesta.families(id) ON DELETE CASCADE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  relation VARCHAR(100),
  email VARCHAR(255),
  phone VARCHAR(50),
  birth_date DATE,
  nationality VARCHAR(100),
  tax_residence VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════════════
-- LEGAL ENTITIES
-- ═══════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS ivesta.legal_entities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  family_id UUID NOT NULL REFERENCES ivesta.families(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  entity_type VARCHAR(50) NOT NULL CHECK (entity_type IN ('holding', 'sci', 'trust', 'foundation', 'company', 'assurance_vie', 'other')),
  jurisdiction VARCHAR(100),
  registration_number VARCHAR(100),
  total_value DECIMAL(20, 2) DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════════════
-- INVESTMENTS - LISTED
-- ═══════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS ivesta.listed_investments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  family_id UUID NOT NULL REFERENCES ivesta.families(id) ON DELETE CASCADE,
  entity_id UUID REFERENCES ivesta.legal_entities(id),
  asset_name VARCHAR(255) NOT NULL,
  ticker VARCHAR(50),
  isin VARCHAR(20),
  asset_class VARCHAR(50) CHECK (asset_class IN ('equity', 'bond', 'opcvm', 'etf', 'structured', 'other')),
  quantity DECIMAL(20, 6),
  avg_cost DECIMAL(20, 6),
  current_price DECIMAL(20, 6),
  current_value DECIMAL(20, 2),
  currency VARCHAR(10) DEFAULT 'EUR',
  custodian VARCHAR(255),
  last_updated TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════════════
-- INVESTMENTS - PRIVATE MARKETS
-- ═══════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS ivesta.funds (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  manager VARCHAR(255),
  strategy VARCHAR(100) CHECK (strategy IN ('venture', 'lbo', 'growth', 'debt', 'real_estate', 'infrastructure', 'secondary', 'fund_of_funds', 'other')),
  vintage_year INT,
  fund_size DECIMAL(20, 2),
  currency VARCHAR(10) DEFAULT 'EUR',
  geography VARCHAR(100),
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'fundraising', 'invested', 'harvesting', 'liquidated')),
  irr DECIMAL(10, 4),
  tvpi DECIMAL(10, 4),
  dpi DECIMAL(10, 4),
  rvpi DECIMAL(10, 4),
  last_nav DECIMAL(20, 2),
  last_nav_date DATE,
  preqin_id VARCHAR(100),
  pitchbook_id VARCHAR(100),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ivesta.fund_investments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  fund_id UUID NOT NULL REFERENCES ivesta.funds(id) ON DELETE CASCADE,
  family_id UUID NOT NULL REFERENCES ivesta.families(id) ON DELETE CASCADE,
  entity_id UUID REFERENCES ivesta.legal_entities(id),
  commitment DECIMAL(20, 2) NOT NULL,
  called DECIMAL(20, 2) DEFAULT 0,
  distributed DECIMAL(20, 2) DEFAULT 0,
  nav DECIMAL(20, 2) DEFAULT 0,
  currency VARCHAR(10) DEFAULT 'EUR',
  subscription_date DATE,
  status VARCHAR(50) DEFAULT 'active',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════════════
-- COMPLIANCE & DOCUMENTS
-- ═══════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS ivesta.documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  family_id UUID REFERENCES ivesta.families(id) ON DELETE CASCADE,
  fund_id UUID REFERENCES ivesta.funds(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  doc_type VARCHAR(100) NOT NULL CHECK (doc_type IN ('kyc_id', 'kyc_address', 'kyc_tax', 'contract', 'reporting', 'policy', 'deed', 'other')),
  file_path TEXT,
  file_size INT,
  mime_type VARCHAR(100),
  expiry_date DATE,
  status VARCHAR(50) DEFAULT 'valid' CHECK (status IN ('valid', 'expired', 'pending', 'rejected')),
  ai_summary TEXT,
  ai_extracted_data JSONB DEFAULT '{}',
  uploaded_by UUID REFERENCES ivesta.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ivesta.compliance_checks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  family_id UUID NOT NULL REFERENCES ivesta.families(id) ON DELETE CASCADE,
  check_type VARCHAR(100) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('passed', 'failed', 'pending', 'expired')),
  details JSONB DEFAULT '{}',
  next_review DATE,
  checked_by UUID REFERENCES ivesta.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════════════
-- CRM / PROSPECTION
-- ═══════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS ivesta.prospects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name VARCHAR(255),
  contact_name VARCHAR(255) NOT NULL,
  contact_email VARCHAR(255),
  contact_phone VARCHAR(50),
  source VARCHAR(100),
  stage VARCHAR(50) DEFAULT 'lead' CHECK (stage IN ('lead', 'qualified', 'meeting', 'proposal', 'negotiation', 'won', 'lost')),
  estimated_aum DECIMAL(20, 2),
  assigned_to UUID REFERENCES ivesta.users(id),
  notes TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════════════
-- REPORTING
-- ═══════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS ivesta.reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  family_id UUID NOT NULL REFERENCES ivesta.families(id) ON DELETE CASCADE,
  report_type VARCHAR(50) DEFAULT 'quarterly' CHECK (report_type IN ('quarterly', 'annual', 'ad_hoc', 'compliance')),
  period_start DATE,
  period_end DATE,
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'approved', 'sent')),
  generated_data JSONB DEFAULT '{}',
  ai_commentary TEXT,
  file_path TEXT,
  approved_by UUID REFERENCES ivesta.users(id),
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════════════
-- ACTIVITY LOG
-- ═══════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS ivesta.activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES ivesta.users(id),
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(100),
  entity_id UUID,
  details JSONB DEFAULT '{}',
  ip_address VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════════════
-- INDEXES
-- ═══════════════════════════════════════════════

CREATE INDEX IF NOT EXISTS idx_iv_families_partner ON ivesta.families(assigned_partner_id);
CREATE INDEX IF NOT EXISTS idx_iv_families_officer ON ivesta.families(assigned_officer_id);
CREATE INDEX IF NOT EXISTS idx_iv_family_members_family ON ivesta.family_members(family_id);
CREATE INDEX IF NOT EXISTS idx_iv_legal_entities_family ON ivesta.legal_entities(family_id);
CREATE INDEX IF NOT EXISTS idx_iv_listed_investments_family ON ivesta.listed_investments(family_id);
CREATE INDEX IF NOT EXISTS idx_iv_fund_investments_fund ON ivesta.fund_investments(fund_id);
CREATE INDEX IF NOT EXISTS idx_iv_fund_investments_family ON ivesta.fund_investments(family_id);
CREATE INDEX IF NOT EXISTS idx_iv_documents_family ON ivesta.documents(family_id);
CREATE INDEX IF NOT EXISTS idx_iv_documents_fund ON ivesta.documents(fund_id);
CREATE INDEX IF NOT EXISTS idx_iv_prospects_assigned ON ivesta.prospects(assigned_to);
CREATE INDEX IF NOT EXISTS idx_iv_reports_family ON ivesta.reports(family_id);
CREATE INDEX IF NOT EXISTS idx_iv_activity_log_user ON ivesta.activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_iv_activity_log_created ON ivesta.activity_log(created_at DESC);
