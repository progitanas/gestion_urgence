import { EmergencyCreationForm } from '@/components/staff/emergency-creation-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

export default function CreateEmergencyPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-3xl mx-auto shadow-xl">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="h-8 w-8 text-destructive" />
            <CardTitle className="text-3xl font-bold">Log New Emergency Alert</CardTitle>
          </div>
          <CardDescription>
            Complete the form below to create and dispatch a new emergency alert.
            Ensure all information is accurate and concise.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EmergencyCreationForm />
        </CardContent>
      </Card>
    </div>
  );
}
