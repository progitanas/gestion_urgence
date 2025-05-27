
import { DashboardCard } from '@/components/dashboard/dashboard-card';
import { User, Siren, ListChecks, CalendarCheck2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data - replace with actual data fetching
const mockDoctorData = {
  activePatients: 78,
  pendingEmergencies: 3,
  completedConsultationsToday: 12,
  upcomingAppointments: 5,
};

const patientActivityData = [
  { name: 'Mon', consultations: 10, newPatients: 2 },
  { name: 'Tue', consultations: 15, newPatients: 3 },
  { name: 'Wed', consultations: 8, newPatients: 1 },
  { name: 'Thu', consultations: 12, newPatients: 4 },
  { name: 'Fri', consultations: 18, newPatients: 2 },
  { name: 'Sat', consultations: 5, newPatients: 0 },
];


export default function DoctorDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Doctor Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Active Patients"
          icon={User}
          value={mockDoctorData.activePatients.toString()}
          description="Patients currently under your care."
          href="/doctor/patients" // Changed from /dashboard/doctor/patients
          className="bg-primary/10"
        />
        <DashboardCard
          title="Pending Emergencies"
          icon={Siren}
          value={mockDoctorData.pendingEmergencies.toString()}
          description="Require immediate attention."
          href="/emergencies" // Changed from /dashboard/emergencies
          className="bg-destructive/10"
        />
        <DashboardCard
          title="Consultations Today"
          icon={ListChecks}
          value={mockDoctorData.completedConsultationsToday.toString()}
          description="Completed patient consultations."
           className="bg-green-500/10"
        />
         <DashboardCard
          title="Upcoming Appointments"
          icon={CalendarCheck2}
          value={mockDoctorData.upcomingAppointments.toString()}
          description="Scheduled for today/tomorrow."
          className="bg-accent/10"
        />
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Patient Activity This Week</CardTitle>
        </CardHeader>
        <CardContent className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={patientActivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--foreground)" />
              <YAxis stroke="var(--foreground)" />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--popover))', 
                  borderColor: 'hsl(var(--border))',
                  color: 'hsl(var(--popover-foreground))'
                }}
              />
              <Legend />
              <Bar dataKey="consultations" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="newPatients" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

       <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <DashboardCard title="View Patient List" href="/doctor/patients" icon={User} /> {/* Changed from /dashboard/doctor/patients */}
           <DashboardCard title="Manage Emergencies" href="/emergencies" icon={Siren} /> {/* Changed from /dashboard/emergencies */}
        </CardContent>
      </Card>

    </div>
  );
}

// Placeholder pages for navigation items
export function DoctorPatientsPage() { return <div>My Patients Page Content</div>; }
