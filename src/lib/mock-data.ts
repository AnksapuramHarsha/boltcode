// Mock data for patient registration and filtering
export const mockData = {
  states: [
    'Meghalaya',
    'Assam',
    'Arunachal Pradesh',
    'Manipur',
    'Mizoram',
    'Nagaland',
    'Tripura',
    'West Bengal',
    'Sikkim',
  ],
  
  districts: {
    Meghalaya: [
      'East Khasi Hills',
      'West Khasi Hills',
      'South West Khasi Hills',
      'Ri-Bhoi',
      'West Jaintia Hills',
      'East Jaintia Hills',
      'West Garo Hills',
      'East Garo Hills',
      'South Garo Hills',
      'North Garo Hills',
      'South West Garo Hills',
    ],
    Assam: [
      'Kamrup Metropolitan',
      'Kamrup Rural',
      'Dibrugarh',
      'Jorhat',
      'Nagaon',
      'Sivasagar',
      'Tinsukia',
    ],
    // Add districts for other states...
  },
  
  cities: {
    'East Khasi Hills': ['Shillong', 'Cherrapunji', 'Mawsynram', 'Pynursla', 'Mawryngkneng'],
    'West Khasi Hills': ['Nongstoin', 'Mairang', 'Mawkyrwat'],
    'Ri-Bhoi': ['Nongpoh', 'Umroi', 'Byrnihat'],
    'Kamrup Metropolitan': ['Guwahati', 'Dispur'],
    // Add cities for other districts...
  },
  
  religions: [
    'Christianity',
    'Hinduism',
    'Islam',
    'Sikhism',
    'Buddhism',
    'Jainism',
    'Others',
  ],
  
  castes: [
    'General',
    'SC',
    'ST',
    'OBC',
    'Others',
  ],
  
  occupations: [
    'Government Employee',
    'Private Sector',
    'Business Owner',
    'Self-Employed',
    'Farmer',
    'Student',
    'Homemaker',
    'Retired',
    'Unemployed',
    'Others',
  ],
  
  educationLevels: [
    'Primary',
    'Secondary',
    'Higher Secondary',
    'Graduate',
    'Post Graduate',
    'Doctorate',
    'Professional',
    'Others',
  ],
  
  annualIncomeRanges: [
    'Below ₹25,000',
    '₹25,000 - ₹50,000',
    '₹50,000 - ₹1,00,000',
    '₹1,00,000 - ₹2,50,000',
    '₹2,50,000 - ₹5,00,000',
    '₹5,00,000 - ₹10,00,000',
    'Above ₹10,00,000',
  ],
  
  relationships: [
    'Spouse',
    'Parent',
    'Child',
    'Sibling',
    'Grandparent',
    'Guardian',
    'Friend',
    'Other',
  ],
  
  guardianTypes: [
    'Father',
    'Mother',
    'Spouse',
    'Son',
    'Daughter',
    'Brother',
    'Sister',
    'Legal Guardian',
    'Other',
  ],
  
  documentTypes: [
    'Aadhaar Card',
    'PAN Card',
    'Voter ID',
    'Driving License',
    'Passport',
    'Birth Certificate',
    'Marriage Certificate',
    'Income Certificate',
    'Caste Certificate',
    'Medical Records',
    'Insurance Documents',
    'Other',
  ],

  languages: [
    'English',
    'Hindi',
    'Khasi',
    'Bengali',
    'Assamese',
    'Manipuri',
    'Mizo',
    'Nepali',
  ],

  insuranceProviders: [
    'Aditya Birla Health Insurance',
    'Bajaj Allianz Health Insurance',
    'HDFC ERGO Health Insurance',
    'ICICI Lombard Health Insurance',
    'Max Bupa Health Insurance',
    'National Insurance',
    'New India Assurance',
    'Oriental Insurance',
    'Reliance Health Insurance',
    'Star Health Insurance',
    'United India Insurance',
  ],

  registrationTypes: [
    'Walk-in',
    'Referral',
    'Emergency',
    'Transfer',
    'Online',
  ],

  billingTypes: [
    'General',
    'BPL',
    'Destitute',
    'Govt Employee',
    'Exemptions',
    'Remand Home',
    'Police Case',
    'Staff',
    'Outside/Private Referral',
    'Deluxe/Private Ward',
    'Student CHS',
    'MHIS',
    'PWD',
    'Senior Citizen',
  ],

  verificationMethods: [
    'Aadhaar OTP',
    'Mobile OTP',
    'Biometric',
    'Face Authentication',
    'Document Verification',
  ],

  documentCategories: [
    'Identification',
    'Address Proof',
    'Medical History',
    'Insurance',
    'Test Reports',
    'Prescriptions',
    'Discharge Summary',
    'Consent Forms',
    'Others',
  ],

  chronicConditions: [
    'Diabetes',
    'Hypertension',
    'Asthma',
    'Heart Disease',
    'Arthritis',
    'Thyroid',
    'Cancer',
    'Others',
  ],

  allergies: [
    'Drug Allergies',
    'Food Allergies',
    'Environmental Allergies',
    'Skin Allergies',
    'Others',
  ],

  bloodGroups: [
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-',
  ],

  maritalStatus: [
    'Single',
    'Married',
    'Divorced',
    'Widowed',
    'Separated',
  ],

  relationshipTypes: [
    'Spouse',
    'Parent',
    'Child',
    'Sibling',
    'Grandparent',
    'Guardian',
    'Friend',
    'Other',
  ],
};

// Mock data for patient registration timestamps
export const registrationTimestamps = {
  registeredBy: [
    'Dr. Sarah Johnson',
    'Dr. Michael Smith',
    'Nurse Emily Brown',
    'Receptionist David Wilson',
  ],
  
  registrationType: [
    'Walk-in',
    'Referral',
    'Emergency',
    'Transfer',
    'Online',
  ],
  
  registrationSource: [
    'OPD',
    'Emergency',
    'Referral',
    'Website',
    'Mobile App',
  ],
  
  registrationStatus: [
    'Completed',
    'Pending',
    'Cancelled',
  ],
};

// Mock data for ABHA verification
export const abhaVerificationStatuses = {
  status: [
    'Verified',
    'Pending',
    'Failed',
    'Not Found',
  ],
  
  verificationMethods: [
    'Aadhaar OTP',
    'Mobile OTP',
    'Biometric',
    'Face Authentication',
  ],
  
  verificationSources: [
    'ABDM',
    'Hospital System',
    'Third Party',
  ],
};

// Mock data for patient filters
export const filterOptions = {
  status: [
    'All',
    'Active',
    'Deceased',
  ],
  
  visitType: [
    'All',
    'OPD',
    'IPD',
    'Emergency',
    'Follow-up',
    'Procedure',
  ],
  
  department: [
    'All',
    'General Medicine',
    'Pediatrics',
    'Orthopedics',
    'Cardiology',
    'Neurology',
    'Gynecology',
    'Ophthalmology',
    'Dentistry',
  ],
  
  insuranceStatus: [
    'All',
    'Active',
    'Expired',
    'Cancelled',
  ],
  
  ageGroups: [
    'All',
    '0-18',
    '19-30',
    '31-50',
    '51-70',
    'Above 70',
  ],
  
  registrationPeriod: [
    'All Time',
    'Today',
    'This Week',
    'This Month',
    'This Year',
    'Custom Range',
  ],
};