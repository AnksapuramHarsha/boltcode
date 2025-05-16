import React from 'react';
import { Check, Copy, RefreshCw } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Patient } from '@/lib/types';

interface AbhaDetailsProps {
  patient: Patient;
  onVerify: () => void;
  onRefresh: () => void;
}

export function AbhaDetails({
  patient,
  onVerify,
  onRefresh,
}: AbhaDetailsProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    if (patient?.abhaDetails?.abhaNumber) {
      try {
        await navigator.clipboard.writeText(patient?.abhaDetails?.abhaNumber);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error('Failed to copy ABHA number:', error);
      }
    }
  };

  const abhaNumber = patient?.abhaDetails?.abhaNumber ?? '';
  const abhaAddress = patient?.abhaDetails?.abhaNumber ?? '';
  const isVerified = abhaNumber.length > 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>ABHA Details</CardTitle>
            <CardDescription>
              Ayushman Bharat Health Account information
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={onRefresh}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* ABHA Number Section */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">ABHA Number</div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {abhaNumber || 'Not Available'}
                </span>
                {abhaNumber && (
                  <Button variant="ghost" size="sm" onClick={handleCopy}>
                    {copied ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                )}
              </div>
            </div>
            <Badge
              variant="outline"
              className={
                isVerified
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }
            >
              {isVerified ? 'Verified' : 'Not Verified'}
            </Badge>
          </div>

          {/* ABHA Address */}
          <div>
            <div className="text-sm font-medium">ABHA Address</div>
            <div className="text-sm text-muted-foreground">
              {abhaAddress || 'Not Available'}
            </div>
          </div>

          {/* Verify Button */}
          {!isVerified && (
            <Button className="w-full" onClick={onVerify}>
              Verify ABHA Details
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
