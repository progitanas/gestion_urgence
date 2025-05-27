import { PatientOnboardingForm } from '@/components/staff/patient-onboarding-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus } from 'lucide-react';

export default function AddPatientPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-3xl mx-auto shadow-xl">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <UserPlus className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl font-bold">Register New Patient</CardTitle>
          </div>
          <CardDescription>
            Fill out the form below to add a new patient to the HealthLink system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PatientOnboardingForm />
        </CardContent>
      </Card>
    </div>
  );
}
