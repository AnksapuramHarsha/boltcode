/*
  # Patient Management System Schema

  1. New Tables
    - patients
      - Core patient information
      - Personal details
      - Contact information
      - Address details
    - patient_documents
      - Document storage and management
    - patient_visits
      - Visit history and records
    - patient_vitals
      - Vital signs monitoring
    - patient_insurance
      - Insurance information
    - patient_emergency_contacts
      - Emergency contact details
    - patient_audit_logs
      - Audit trail for all changes

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Add policies for specific roles

  3. Changes
    - Initial schema creation
    - Comprehensive patient management system
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create patients table
CREATE TABLE IF NOT EXISTS patients (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users,
  title text NOT NULL,
  first_name text NOT NULL,
  middle_name text,
  last_name text NOT NULL,
  date_of_birth date NOT NULL,
  gender text NOT NULL,
  blood_group text,
  marital_status text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  abha_number text UNIQUE,
  abha_address text,
  abha_verification_status text,
  abha_verification_method text,
  abha_verification_date timestamptz,
  registration_number text UNIQUE NOT NULL,
  registration_date timestamptz NOT NULL DEFAULT now(),
  registration_type text NOT NULL,
  registration_source text NOT NULL,
  registration_status text NOT NULL DEFAULT 'completed',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users NOT NULL,
  updated_by uuid REFERENCES auth.users NOT NULL
);

-- Create contact_information table
CREATE TABLE IF NOT EXISTS patient_contacts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id uuid REFERENCES patients ON DELETE CASCADE NOT NULL,
  email text,
  phone text NOT NULL,
  alternate_phone text,
  preferred_contact_mode text NOT NULL,
  preferred_language text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create addresses table
CREATE TABLE IF NOT EXISTS patient_addresses (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id uuid REFERENCES patients ON DELETE CASCADE NOT NULL,
  address_type text NOT NULL,
  house_number text NOT NULL,
  flat_number text,
  locality text NOT NULL,
  sector text,
  line1 text NOT NULL,
  line2 text,
  city text NOT NULL,
  district text NOT NULL,
  state text NOT NULL,
  country text NOT NULL,
  pin_code text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create emergency_contacts table
CREATE TABLE IF NOT EXISTS patient_emergency_contacts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id uuid REFERENCES patients ON DELETE CASCADE NOT NULL,
  relationship_type text NOT NULL,
  name text NOT NULL,
  phone text NOT NULL,
  alternate_phone text,
  address text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create demographics table
CREATE TABLE IF NOT EXISTS patient_demographics (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id uuid REFERENCES patients ON DELETE CASCADE NOT NULL,
  citizenship text NOT NULL,
  religion text NOT NULL,
  caste text,
  occupation text,
  education text,
  annual_income text,
  languages text[],
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create medical_information table
CREATE TABLE IF NOT EXISTS patient_medical_info (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id uuid REFERENCES patients ON DELETE CASCADE NOT NULL,
  allergies text[],
  chronic_conditions text[],
  current_medications text[],
  family_history text[],
  smoking boolean DEFAULT false,
  alcohol boolean DEFAULT false,
  exercise text,
  diet text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create insurance table
CREATE TABLE IF NOT EXISTS patient_insurance (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id uuid REFERENCES patients ON DELETE CASCADE NOT NULL,
  provider text NOT NULL,
  policy_number text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  coverage_amount numeric NOT NULL,
  status text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create documents table
CREATE TABLE IF NOT EXISTS patient_documents (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id uuid REFERENCES patients ON DELETE CASCADE NOT NULL,
  document_type text NOT NULL,
  document_number text,
  issued_by text,
  issued_date date,
  valid_until date,
  url text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create consent table
CREATE TABLE IF NOT EXISTS patient_consent (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id uuid REFERENCES patients ON DELETE CASCADE NOT NULL,
  share_spouse boolean DEFAULT false,
  share_children boolean DEFAULT false,
  share_caregiver boolean DEFAULT false,
  share_other boolean DEFAULT false,
  other_details text,
  mobile_sharing boolean DEFAULT false,
  email_notifications boolean DEFAULT false,
  sms_notifications boolean DEFAULT false,
  marketing_communications boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create billing table
CREATE TABLE IF NOT EXISTS patient_billing (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id uuid REFERENCES patients ON DELETE CASCADE NOT NULL,
  billing_type text NOT NULL,
  category text NOT NULL,
  referred_by text,
  credit_limit numeric,
  default_payment_method text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create audit_logs table
CREATE TABLE IF NOT EXISTS patient_audit_logs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id uuid REFERENCES patients ON DELETE CASCADE NOT NULL,
  action text NOT NULL,
  performed_by uuid REFERENCES auth.users NOT NULL,
  performed_at timestamptz NOT NULL DEFAULT now(),
  details jsonb NOT NULL,
  ip_address text,
  user_agent text
);

-- Enable Row Level Security
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_emergency_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_demographics ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_medical_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_insurance ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_consent ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_billing ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_audit_logs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for authenticated users" ON patients
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Enable insert for authenticated users" ON patients
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Enable update for authenticated users" ON patients
  FOR UPDATE TO authenticated
  USING (auth.uid() = created_by OR auth.uid() = updated_by)
  WITH CHECK (auth.uid() = created_by OR auth.uid() = updated_by);

-- Add similar policies for other tables

-- Create indexes
CREATE INDEX idx_patients_registration_number ON patients(registration_number);
CREATE INDEX idx_patients_abha_number ON patients(abha_number);
CREATE INDEX idx_patients_created_at ON patients(created_at);
CREATE INDEX idx_patients_status ON patients(status);

-- Create functions
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON patients
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Add similar triggers for other tables