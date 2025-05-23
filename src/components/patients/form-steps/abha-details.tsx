import React from 'react';
import { Loader2, QrCode, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { usePatientForm } from '../patient-form-context';
import { PatientFormStep } from '../patient-form-step';

export function AbhaDetailsStep() {
  const { form, currentStep } = usePatientForm();
  const [verifying, setVerifying] = React.useState(false);
  const [scanning, setScanning] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const handleVerify = async () => {
    setVerifying(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setVerifying(false);
  };

  const handleScan = async () => {
    setScanning(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setScanning(false);
  };

  const handleCopy = async () => {
    const abhaNumber = form.getValues('dynamic.abhaNumber');
    if (abhaNumber) {
      await navigator.clipboard.writeText(abhaNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <PatientFormStep
      title="ABHA Details"
      description="Ayushman Bharat Health Account information"
    >
      <div className="space-y-6 w-full">
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleScan}
            disabled={scanning}
            className="w-full sm:w-auto"
          >
            {scanning ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <QrCode className="mr-2 h-4 w-4" />
            )}
            Scan ABHA QR
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              // Handle ABHA creation
            }}
            className="w-full sm:w-auto"
          >
            Create ABHA
          </Button>
        </div>

        {/* ABHA Number + Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="dynamic.abhaNumber"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>ABHA Number</FormLabel>
                <div className="flex flex-col sm:flex-row gap-2">
                  <FormControl className="flex-1">
                    <Input placeholder="XX-XXXX-XXXX-XXXX" {...field} />
                  </FormControl>
                  {field.value && (
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={handleCopy}
                      >
                        {copied ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleVerify}
                        disabled={verifying}
                      >
                        {verifying && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Verify
                      </Button>
                    </div>
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dynamic.abhaAddress"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>ABHA Address</FormLabel>
                <FormControl>
                  <Input placeholder="username@abdm" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Verification Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="dynamic.verificationMethod"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Verification Method</FormLabel>
                <FormControl>
                  <Input {...field} readOnly />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dynamic.verificationStatus"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Verification Status</FormLabel>
                <FormControl>
                  <Input {...field} readOnly />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </PatientFormStep>
  );
}
