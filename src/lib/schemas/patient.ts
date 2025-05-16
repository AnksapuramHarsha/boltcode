import * as z from 'zod';

export const patientFormSchema = z.object({
  // Core Information
  title: z.enum(['Mr', 'Ms', 'Mrs', 'Dr', 'Prof']),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  middleName: z.string().optional(),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  dateOfBirth: z.date({
    required_error: 'Date of birth is required',
  }),
  age: z.object({
    years: z.number(),
    months: z.number(),
    days: z.number(),
  }),
  gender: z.enum(['male', 'female', 'other']),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  maritalStatus: z.enum(['Single', 'Married', 'Divorced', 'Widowed', 'Separated']),
  citizenship: z.string().min(1, 'Citizenship is required'),
  religion: z.string().min(1, 'Religion is required'),
  caste: z.string().optional(),
  occupation: z.string().optional(),
  education: z.string().optional(),
  annualIncome: z.string().optional(),
  isActive: z.boolean().default(true),
  isDeceased: z.boolean().default(false),

  // Contact Information
  contactInformation: z.object({
    mobileNumber: z.string().min(10, 'Mobile number must be at least 10 digits'),
    emailId: z.string().email('Invalid email address').optional(),
    phoneNumber: z.string().optional(),
    preferredContactMode: z.enum(['mobile', 'email', 'phone']),
    phoneContactPreference: z.enum(['anytime', 'morning', 'afternoon', 'evening']).optional(),
    consentToShare: z.boolean(),
  }),

  // Address Information
  address: z.object({
    addressType: z.enum(['permanent', 'current', 'office']),
    houseNoOrFlatNo: z.string().min(1, 'House/Flat number is required'),
    localityOrSector: z.string().min(1, 'Locality/Sector is required'),
    cityOrVillage: z.string().min(1, 'City/Village is required'),
    city: z.string().min(1, 'City is required'),
    districtId: z.string().min(1, 'District is required'),
    stateId: z.string().min(1, 'State is required'),
    stateProvince: z.string().min(1, 'State/Province is required'),
    country: z.string().min(1, 'Country is required'),
    pincode: z.string().min(6, 'PIN code must be 6 digits'),
  }),

  // ID and Document Info
  govtIdType: z.enum(['aadhaar', 'pan', 'voter', 'driving_license', 'passport']),
  govtIdValue: z.string().min(1, 'Government ID is required'),
  abhaNumber: z.string().regex(/^\d{2}-\d{4}-\d{4}-\d{4}$/, 'Invalid ABHA number format').optional(),
  abhaAddress: z.string().optional(),
  idProofUpload: z.string().optional(),
  photoOrIdPath: z.string().optional(),

  // Insurance Information
  insurance: z.object({
    provider: z.string().min(1, 'Insurance provider is required'),
    number: z.string().min(1, 'Insurance number is required'),
    startDate: z.date(),
    endDate: z.date(),
    coverageAmount: z.number().min(0),
  }).optional(),

  // Emergency Contacts
  emergencyContacts: z.array(z.object({
    name: z.string().min(1, 'Contact name is required'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    relation: z.string().min(1, 'Relationship is required'),
  })).min(1, 'At least one emergency contact is required'),

  // Information Sharing
  informationSharing: z.object({
    shareWithSpouse: z.boolean(),
    shareWithChildren: z.boolean(),
    shareWithCaregiver: z.boolean(),
    shareWithOther: z.boolean(),
    otherDetails: z.string().optional(),
  }),

  // Referral Information
  referral: z.object({
    fromFacilityId: z.string().optional(),
    toFacilityId: z.string().optional(),
    referralDate: z.date().optional(),
    reason: z.string().optional(),
  }).optional(),

  // Billing Information
  billing: z.object({
    billingType: z.string().min(1, 'Billing type is required'),
    referredBy: z.string().optional(),
  }),

  // Token Information
  token: z.object({
    tokenNumber: z.string().optional(),
    issueDate: z.date().optional(),
    expiryDate: z.date().optional(),
    status: z.enum(['active', 'expired', 'cancelled']).optional(),
    isRegistered: z.boolean().default(false),
    allocatedTo: z.string().optional(),
  }).optional(),
});

export type PatientFormValues = z.infer<typeof patientFormSchema>;