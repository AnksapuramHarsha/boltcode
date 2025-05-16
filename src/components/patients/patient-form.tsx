import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';

import { AbhaDetailsStep } from './form-steps/abha-details';
import { PersonalDetailsStep } from './form-steps/personal-details';
import { ContactInformationStep } from './form-steps/contact-information';
import { AddressDetailsStep } from './form-steps/address-details';
import { EmergencyContactsStep } from './form-steps/emergency-contacts';
import { InsuranceDetailsStep } from './form-steps/insurance-details';
import { ConsentStep } from './form-steps/consent';
import { BillingStep } from './form-steps/billing';
import { format } from 'date-fns';
import { PatientFormProvider } from './patient-form-context';

type PatientFormProps = {
  onSubmit: (data: any) => void;
  initialValues?: any;
};

export function PatientForm({ onSubmit, initialValues }: PatientFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

 const form = useForm({
  defaultValues: {
    title: '',
    facilityId: '',
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: new Date(),
    gender: 'male',
    bloodGroup: 'A+',
    maritalStatus: 'Single',
    citizenship: 'Indian',
    religion: '',
    isActive: true,
    isDeceased: false,
    address: {
      addressType: 'Permanent',
      houseNoOrFlatNo: '',
      localityOrSector: '',
      cityOrVillage: '',
      city: '',
      districtId: '',
      stateId: '',
      country: 'India',
      pincode: '',
    },
    govtIdType: 'aadhar',
    govtIdValue: '',
    emergencyContacts: [{ contactName: '', phoneNumber: '', relationship: '' }],
    informationSharing: {
      shareWithSpouse: false,
      shareWithChildren: false,
      shareWithCaregiver: false,
      shareWithOther: false,
      shareWithOtherDetails: '',
    },
    billing: {
      billingType: 'General',
    },
    insurance: {
      insuranceProvider: '',
      policyNumber: '',
      policyStartDate: '',
      policyEndDate: '',
      coverageAmount: '',
    },
    documents: {
      idProof: null,
      addressProof: null,
      medicalRecords: [],
    },
    dynamic: {
      abhaNumber: '',
      abhaAddress: '',
      verificationMethod: '',
      verificationStatus: '',
    },
    contacts: [
      {
        mobileNumber: '',
        phoneNumber: '',
        email: '',
        preferredContactMode: 'Phone',
        phoneContactPreference: null,
        consentToShare: false,
      },
    ],
  },
});
useEffect(() => {
  if (initialValues) {
    form.reset({
      ...initialValues,
      dateOfBirth: initialValues.dateOfBirth ? new Date(initialValues.dateOfBirth) : new Date(),
      address: initialValues.addresses?.[0] || {},
      insurance: {
        ...initialValues.insurance,
        policyStartDate: initialValues.insurance?.policyStartDate
          ? new Date(initialValues.insurance.policyStartDate)
          : '',
        policyEndDate: initialValues.insurance?.policyEndDate
          ? new Date(initialValues.insurance.policyEndDate)
          : '',
      },
      billing: {
        ...initialValues.billing,
        billingType: initialValues.billingReferral?.billingType || 'General',
      },
      billingReferral: initialValues.billingReferral?.referredBy || '',
      contacts: initialValues.contacts || [
        {
          mobileNumber: initialValues.contactInformation?.mobileNumber || '',
          phoneNumber: '',
          email: initialValues.contactInformation?.emailId || '',
          preferredContactMode: initialValues.contactInformation?.preferredContactMode || 'Phone',
          phoneContactPreference: null,
          consentToShare: initialValues.contactInformation?.consentToShare || false,
        },
      ],
    });
  }
}, [initialValues, form]);



  const handleSubmit = async (data: any) => {
    console.log('data before formatting ---------------------', data);
    setIsSubmitting(true);

    try {
      const formattedData = {
        ...data,
        dateOfBirth: data.dateOfBirth
          ? format(new Date(data.dateOfBirth), 'yyyy-MM-dd')
          : null,
        insurance: {
          ...data.insurance,
          policyStartDate: data.insurance.policyStartDate
            ? format(new Date(data.insurance.policyStartDate), 'yyyy-MM-dd')
            : null,
          policyEndDate: data.insurance.policyEndDate
            ? format(new Date(data.insurance.policyEndDate), 'yyyy-MM-dd')
            : null,
        },
        addresses: [data.address],
        billingReferral: {
          billingType: data.billing.billingType,
          referredBy: data.billingReferral || null,
        },
      };

      delete formattedData.address;

      await onSubmit(formattedData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PatientFormProvider form={form} currentStep={currentStep} setCurrentStep={setCurrentStep}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-8">
                <div className="space-y-4">
                  {/* <h3 className="text-lg font-medium">ABHA Details</h3> */}
                  <AbhaDetailsStep />
                </div>

                <div className="space-y-4">
                  {/* <h3 className="text-lg font-medium">Personal Details</h3> */}
                  <PersonalDetailsStep />
                </div>

                <div className="space-y-4">
                  {/* <h3 className="text-lg font-medium">Contact Information</h3> */}
                  <ContactInformationStep />
                </div>

                <div className="space-y-4">
                  {/* <h3 className="text-lg font-medium">Address Details</h3> */}
                  <AddressDetailsStep />
                </div>

                <div className="space-y-4">
                  {/* <h3 className="text-lg font-medium">Emergency Contacts</h3> */}
                  <EmergencyContactsStep />
                </div>

                <div className="space-y-4">
                  {/* <h3 className="text-lg font-medium">Insurance Details</h3> */}
                  <InsuranceDetailsStep />
                </div>

                <div className="space-y-4">
                  {/* <h3 className="text-lg font-medium">Consent Information</h3> */}
                  <ConsentStep />
                </div>

                <div className="space-y-4">
                  {/* <h3 className="text-lg font-medium">Billing Information</h3> */}
                  <BillingStep />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {initialValues
                ? isSubmitting
                  ? 'Updating...'
                  : 'Update Patient'
                : isSubmitting
                ? 'Registering...'
                : 'Register Patient'}
            </Button>
          </div>
        </form>
      </Form>
    </PatientFormProvider>
  );
}
