// src/schemas/patientSchema.ts
import { z } from "zod";

// Identifier number conditional validation
const identifierNumberSchema = z.string().refine((val, ctx) => {
  const type = ctx?.parent?.identifierType;
  if (!val) return false;

  switch (type) {
    case "ABHA":
      return /^\d{14}$/.test(val);
    case "Aadhar":
      return /^\d{12}$/.test(val);
    case "PAN":
      return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(val);
    case "Passport":
      return /^[A-PR-WY][1-9]\d\s?\d{4}[1-9]$/.test(val);
    case "Driving_License":
      return /^[A-Z]{2}\d{2}\s?\d{11}$/.test(val);
    default:
      return true;
  }
}, {
  message: "Invalid identifierNumber for selected type"
});

export const patientSchema = z.object({
  title: z.enum(["Mr", "Mrs", "Ms", "Dr", "Master", "Miss", "Other"]),
  facilityId: z.string().min(1, "Facility is required"),
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.date({ required_error: "Date of birth is required" }),
  gender: z.enum(["Male", "Female", "Other"]),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]).optional(),
  maritalStatus: z.enum(["Single", "Married", "Divorced", "Widowed"]),
  citizenship: z.string().optional(),
  religion: z.string().optional(),
  caste: z.string().optional(),
  occupation: z.string().optional(),
  education: z.string().optional(),
  annualIncome: z.string().optional(),

  identifierType: z.enum(["ABHA", "Aadhar", "Passport", "Driving_License", "PAN"]),
  identifierNumber: identifierNumberSchema,

  addresses: z.array(z.object({
    addressType: z.enum(["Present", "Permanent"]),
    houseNoOrFlatNo: z.string().optional(),
    localityOrSector: z.string().optional(),
    cityOrVillage: z.string().optional(),
    city: z.string().optional(),
    districtId: z.string().optional(),
    stateId: z.string().optional(),
    country: z.string().optional(),
    pincode: z
      .string()
      .optional()
      .refine(val => !val || /^\d{6}$/.test(val), {
        message: "Pincode must be 6 digits",
      }),
  })),

  contacts: z
    .array(
      z.object({
        mobileNumber: z
          .string()
          .nullable()
          .refine(val => val === null || /^\d{10}$/.test(val), {
            message: "Mobile number must be 10 digits",
          }),
        phoneNumber: z
          .string()
          .min(10, "Phone number is required")
          .refine(val => /^\d{10}$/.test(val), {
            message: "Phone number must be 10 digits",
          }),
        email: z.string().email("Invalid email").nullable().optional(),
        preferredContactMode: z.enum(["Phone", "Email", "None"]).optional().nullable(),
        phoneContactPreference: z.enum(["Call", "SMS", "WhatsApp"]).optional().nullable(),
        consentToShare: z.boolean(),
      })
    )
    .min(1, "At least one contact is required"),

  emergencyContacts: z.array(
    z.object({
      contactName: z.string().min(1, "Contact name is required"),
      relationship: z.string().min(1, "Relationship is required"),
      phoneNumber: z
        .string()
        .min(10, "Phone number is required")
        .refine(val => /^\d{10}$/.test(val), {
          message: "Phone number must be 10 digits",
        }),
    })
  ).optional(),

  insurance: z.object({
    insuranceProvider: z.string().min(1, "Insurance provider is required"),
    policyNumber: z.string().min(1, "Policy number is required"),
    policyStartDate: z.date({ required_error: "Start date required" }),
    policyEndDate: z.date({ required_error: "End date required" }),
    coverageAmount: z.number().min(1, "Coverage must be greater than 0"),
  }),

  billingReferral: z.object({
    billingType: z.string().min(1, "Billing type is required"),
    referredBy: z.string().optional(),
  }),

  informationSharing: z.object({
    shareWithSpouse: z.boolean(),
    shareWithChildren: z.boolean(),
    shareWithCaregiver: z.boolean(),
    shareWithOther: z.boolean(),
    shareWithOtherDetails: z.string().optional(),
  }),

  dynamic: z.object({
    abhaNumber: z.string().optional().nullable(),
    abhaAddress: z.string().optional().nullable(),
    verificationMethod: z.string().optional(),
    verificationStatus: z.string().optional(),
  }),
});
