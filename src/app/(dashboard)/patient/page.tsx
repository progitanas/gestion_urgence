import { DashboardCard } from '@/components/dashboard/dashboard-card';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CalendarDays, FileText, HeartPulse, Pill } from 'lucide-react';
import Image from 'next/image';

// Mock data - replace with actual data fetching
const mockPatientData = {
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  nextAppointment: {
    date: 'October 26, 2023',
    time: '10:00 AM',
    doctor: 'Dr. Smith',
  },
  recentRecord: {
    title: 'Annual Check-up',
    date: 'September 15, 2023',
  },
  activePrescriptions: 2,
};

export default function PatientDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Patient Dashboard</h1>
      
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="https://placehold.co/100x100.png" alt={mockPatientData.name} data-ai-hint="profile person" />
              <AvatarFallback>{mockPatientData.name.substring(0,2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{mockPatientData.name}</CardTitle>
              <CardDescription>{mockPatientData.email}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Welcome to your personal health dashboard.</p>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Upcoming Appointment"
          icon={CalendarDays}
          href="/dashboard/patient/appointments"
          className="bg-primary/10"
        >
          <p className="text-xl font-semibold text-foreground">{mockPatientData.nextAppointment.date}</p>
          <p className="text-md text-muted-foreground">{mockPatientData.nextAppointment.time} with {mockPatientData.nextAppointment.doctor}</p>
        </DashboardCard>

        <DashboardCard
          title="Medical Records"
          icon={FileText}
          href="/dashboard/patient/records"
           className="bg-accent/10"
        >
          <p className="text-md text-foreground">Last entry: {mockPatientData.recentRecord.title}</p>
          <p className="text-sm text-muted-foreground">Dated: {mockPatientData.recentRecord.date}</p>
        </DashboardCard>
        
        <DashboardCard
          title="Prescriptions"
          icon={Pill}
          value={`${mockPatientData.activePrescriptions} Active`}
          href="/dashboard/patient/prescriptions"
          className="bg-green-500/10"
        >
          <p className="text-xs text-muted-foreground pt-1">Manage and view your prescriptions.</p>
        </DashboardCard>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HeartPulse className="text-primary h-6 w-6" />
            Health Tips & Updates
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <div className="relative aspect-video overflow-hidden rounded-lg">
             <Image src="https://placehold.co/600x400.png" alt="Healthy Eating" layout="fill" objectFit="cover" data-ai-hint="healthy food" />
          </div>
          <p className="text-muted-foreground">
            Stay informed with the latest health advice. Remember to maintain a balanced diet and exercise regularly. 
            Your well-being is our priority. Check back often for new tips.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

// Placeholder pages for navigation items
export function PatientAppointmentsPage() { return <div>My Appointments Page Content</div>; }
export function PatientRecordsPage() { return <div>Medical Records Page Content</div>; }
export function PatientPrescriptionsPage() { return <div>Prescriptions Page Content</div>; }
