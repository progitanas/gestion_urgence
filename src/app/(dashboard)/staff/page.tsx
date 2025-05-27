import { DashboardCard } from '@/components/dashboard/dashboard-card';
import { UserPlus, Users, Siren, AlertTriangle, CalendarPlus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

// Mock data for staff dashboard
const mockStaffData = {
  newPatientsToday: 5,
  totalEmergenciesLogged: 23,
  upcomingShifts: 2,
};

export default function StaffDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Staff Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="New Patients Today"
          icon={UserPlus}
          value={mockStaffData.newPatientsToday.toString()}
          description="Registered in the system today."
          href="/dashboard/staff/add-patient"
          className="bg-primary/10"
        />
        <DashboardCard
          title="Total Emergencies"
          icon={Siren}
          value={mockStaffData.totalEmergenciesLogged.toString()}
          description="Logged this month."
          href="/dashboard/emergencies"
          className="bg-destructive/10"
        />
        <DashboardCard
          title="Upcoming Shifts"
          icon={CalendarPlus}
          value={mockStaffData.upcomingShifts.toString()}
          description="In the next 48 hours."
          className="bg-accent/10"
        />
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Key Tasks</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <DashboardCard 
            title="Register New Patient" 
            description="Onboard new patients quickly."
            icon={UserPlus} 
            href="/dashboard/staff/add-patient" 
          />
          <DashboardCard 
            title="Log New Emergency" 
            description="Create and dispatch emergency alerts."
            icon={AlertTriangle} 
            href="/dashboard/staff/create-emergency" 
          />
          <DashboardCard 
            title="Manage Users" 
            description="Oversee user accounts and roles."
            icon={Users} 
            href="/dashboard/staff/manage-users" 
          />
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Team Communication Hub</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative w-full md:w-1/3 aspect-square overflow-hidden rounded-lg">
                <Image src="https://placehold.co/400x400.png" alt="Team Collaboration" layout="fill" objectFit="cover" data-ai-hint="team meeting" />
            </div>
            <div className="md:w-2/3">
                <p className="text-muted-foreground mb-2">
                    Stay connected with your team. Access shared documents, view shift schedules, and get important announcements here.
                </p>
                <p className="text-sm text-foreground font-semibold">Next team meeting: Friday, 3:00 PM.</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Placeholder page for navigation
export function ManageUsersPage() { return <div>Manage Users Page Content</div>; }
