import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import { PatientFormProvider } from './patient-form-context';
import { AbhaDetailsStep } from './form-steps/abha-details';
import { PersonalDetailsStep } from './form-steps/personal-details';
import { ContactInformationStep } from './form-steps/contact-information';
import { AddressDetailsStep } from './form-steps/address-details';
import { EmergencyContactsStep } from './form-steps/emergency-contacts';
import { InsuranceDetailsStep } from './form-steps/insurance-details';
import { ConsentStep } from './form-steps/consent';
import { BillingStep } from './form-steps/billing';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { patientSchema } from '@/schemas/patientSchema';

import Patients from '@/pages/patients';

type PatientFormProps = {
  onSubmit: (data: any) => void;
  initialValues?: any;
};

export function PatientForm({ onSubmit, initialValues }: PatientFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const navigate=useNavigate();

  const form = useForm({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      title: null,
      facilityId: '',
      firstName: '',
      middleName: '',
      lastName: '',
      dateOfBirth: undefined,
      gender: null,
      bloodGroup: null,
      maritalStatus: 'Single',
      citizenship: 'Indian',
      religion: '',
      caste: '',
      occupation: '',
      education: '',
      annualIncome: '',
      identifierType: null,
      identifierNumber: '',
      addresses: [{
        addressType: 'Permanent',
        houseNoOrFlatNo: '',
        localityOrSector: '',
        cityOrVillage: '',
        city: '',
        districtId: '',
        stateId: '',
        country: 'India',
        pincode: '',
      }],
      contacts: [
        {
          mobileNumber: null,
          phoneNumber: '',
          email: null,
          preferredContactMode: 'Phone',
          phoneContactPreference: null,
          consentToShare: false,
        },
      ],
      emergencyContacts: [],
      insurance: {
        insuranceProvider: '',
        policyNumber: '',
        policyStartDate: undefined,
        policyEndDate: undefined,
        coverageAmount: 0,
      },
   billingReferral: {
  billingType: 'General',
  referredBy: '',
},


      informationSharing: {
        shareWithSpouse: false,
        shareWithChildren: false,
        shareWithCaregiver: false,
        shareWithOther: false
      },
      dynamic: {
        abhaNumber: '',
        abhaAddress: '',
        verificationMethod: '',
        verificationStatus: '',
      },
    },
  });

  useEffect(() => {
    console.log("initial valuessss", initialValues);
    if (initialValues) {
      form.reset({
        ...initialValues,
        facilityId: initialValues.facilityId || 'cB12Cb43-D178-1a37-6CEf-Ccaa39e6969a',
        dateOfBirth: initialValues.dateOfBirth ? new Date(initialValues.dateOfBirth) : new Date(),
        addresses: initialValues.addresses?.[0] || [{
          addressType: 'Permanent',
          houseNoOrFlatNo: '',
          localityOrSector: '',
          cityOrVillage: '',
          city: '',
          districtId: '',
          stateId: '',
          country: 'India',
          pincode: '',
        }],
        insurance: {
          insuranceProvider: initialValues.insurance?.insuranceProvider || '',
          policyNumber: initialValues.insurance?.policyNumber || '',
          policyStartDate: initialValues.insurance?.policyStartDate ? new Date(initialValues.insurance.policyStartDate) : '',
          policyEndDate: initialValues.insurance?.policyEndDate ? new Date(initialValues.insurance.policyEndDate) : '',
          coverageAmount: initialValues.insurance?.coverageAmount || 0,
        },
billingReferral: {
  billingType:
    initialValues.billingReferral && initialValues.billingReferral.billingType
      ? initialValues.billingReferral.billingType
      : 'General',
  referredBy:
    initialValues.billingReferral && initialValues.billingReferral.referredBy
      ? initialValues.billingReferral.referredBy
      : '',
},





        contacts: initialValues.contacts?.map((c: any) => ({
          mobileNumber: c.mobileNumber || '',
          phoneNumber: c.phoneNumber || '',
          email: c.email || null,
          preferredContactMode: c.preferredContactMode || null,
          phoneContactPreference: c.phoneContactPreference || null,
          consentToShare: !!c.consentToShare,
        })) || [
            {
              mobileNumber: null,
              phoneNumber: '',
              email: null,
              preferredContactMode: 'Phone',
              phoneContactPreference: null,
              consentToShare: false,
            },
          ],
        emergencyContacts: initialValues.emergencyContacts?.map((c: any) => ({
          contactName: c.contactName || '',
          relationship: c.relationship || '',
          phoneNumber: c.phoneNumber || '',
        })) || [],
        informationSharing: {
          shareWithSpouse: initialValues.informationSharing?.shareWithSpouse,
          shareWithChildren: initialValues.informationSharing?.shareWithChildren,
          shareWithCaregiver: initialValues.informationSharing?.shareWithCaregiver,
          shareWithOther: initialValues.informationSharing?.shareWithOther
        },
        dynamic: {
          abhaNumber: initialValues.dynamic?.abhaNumber || '',
          abhaAddress: initialValues.dynamic?.abhaAddress || '',
          verificationMethod: initialValues.dynamic?.verificationMethod || '',
          verificationStatus: initialValues.dynamic?.verificationStatus || '',
        },
        caste: initialValues.caste || '',
        religion: initialValues.religion || '',
        occupation: initialValues.occupation || '',
        education: initialValues.education || '',
        annualIncome: initialValues.annualIncome || '',
      });
    }
  }, [initialValues, form]);

  const handleSubmit = async (data: any) => {
    console.log('🧾 Raw form data before formatting:', data);

    setIsSubmitting(true);

    const findUndefinedFields = (obj: any, path = '') => {
      Object.entries(obj).forEach(([key, value]) => {
        const currentPath = path ? `${path}.${key}` : key;

        if (value === undefined) {
          console.warn(` Uncontrolled input: ${currentPath} is undefined`);
        } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          findUndefinedFields(value, currentPath);
        } else if (Array.isArray(value)) {
          value.forEach((item, index) => {
            if (typeof item === 'object' && item !== null) {
              findUndefinedFields(item, `${currentPath}[${index}]`);
            } else if (item === undefined) {
              console.warn(` Uncontrolled input: ${currentPath}[${index}] is undefined`);
            }
          });
        }
      });
    };

    findUndefinedFields(data);
    try {
      const formattedData = {
        ...data,
        facilityId: data.facilityId || 'cB12Cb43-D178-1a37-6CEf-Ccaa39e6969a',
        dateOfBirth: data.dateOfBirth ? format(new Date(data.dateOfBirth), 'yyyy-MM-dd') : null,
        insurance: {
          ...data.insurance,
          policyStartDate: data.insurance.policyStartDate ? format(new Date(data.insurance.policyStartDate), 'yyyy-MM-dd') : null,
          policyEndDate: data.insurance.policyEndDate ? format(new Date(data.insurance.policyEndDate), 'yyyy-MM-dd') : null,
          coverageAmount: Number(data.insurance.coverageAmount) || 0,
        },
        addresses: data.addresses,
        billingReferral: {
          billingType: data.billingReferral?.billingType || 'General',
          referredBy: data.billingReferral?.referredBy || null,
        },


        informationSharing: {
          shareWithSpouse: data.informationSharing?.shareWithSpouse,
          shareWithChildren: data.informationSharing?.shareWithChildren,
          shareWithCaregiver: data.informationSharing?.shareWithCaregiver,
          shareWithOther:data.informationSharing?.shareWithOther,
        },



        contacts: data.contacts.map((c: any) => ({
          ...c,
          preferredContactMode: c.preferredContactMode || null,
          phoneContactPreference: c.phoneContactPreference || null,
          mobileNumber: c.mobileNumber || null,
          email: c.email || null,
        })),
        dynamic: {
          ...data.dynamic,
          abhaNumber: data.dynamic.abhaNumber || null,
          abhaAddress: data.dynamic.abhaAddress || null,
        },
        caste: data.caste || null,
        religion: data.religion || null,
        occupation: data.occupation || null,
        education: data.education || null,
        annualIncome: data.annualIncome || null,



      };


      // delete formattedData.address;
      console.log("formated dataaa",formattedData)
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
                <AbhaDetailsStep />
                <PersonalDetailsStep />
                <ContactInformationStep />
                <AddressDetailsStep />
                <EmergencyContactsStep />
                <InsuranceDetailsStep />
                <ConsentStep />
                <BillingStep />
              </div>
            </CardContent>
          </Card>
<div className="flex justify-end space-x-4">
  <Button
    type="button"
    variant="outline"
    onClick={() => 
     { console.log("cancel button");
      navigate('/patients',{replace:true})}}
  >
    Cancel
  </Button>
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
