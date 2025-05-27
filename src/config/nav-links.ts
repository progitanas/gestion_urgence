
import type { UserRole } from '@/types';
import type { LucideIcon } from 'lucide-react';
import { LayoutDashboard, UserPlus, Briefcase, User, Activity, Siren, CalendarDays, FileText, ShoppingCart, LogOut, AlertTriangle } from 'lucide-react';

export interface NavLink {
  href: string;
  label: string;
  icon: LucideIcon;
  roles: UserRole[];
  isBottom?: boolean; // To position logout at the bottom
}

export const navLinks: NavLink[] = [
  {
    href: '/home', // Changed from /dashboard/home
    label: 'Dashboard',
    icon: LayoutDashboard,
    roles: ['patient', 'doctor', 'staff'],
  },
  // Patient specific
  {
    href: '/patient/appointments', // Changed from /dashboard/patient/appointments
    label: 'My Appointments',
    icon: CalendarDays,
    roles: ['patient'],
  },
  {
    href: '/patient/records', // Changed from /dashboard/patient/records
    label: 'Medical Records',
    icon: FileText,
    roles: ['patient'],
  },
  {
    href: '/patient/prescriptions', // Changed from /dashboard/patient/prescriptions
    label: 'Prescriptions',
    icon: ShoppingCart, // Placeholder for prescription icon
    roles: ['patient'],
  },
  // Doctor specific
  {
    href: '/doctor/patients', // Changed from /dashboard/doctor/patients
    label: 'My Patients',
    icon: User, // Represents multiple patients or patient focus
    roles: ['doctor'],
  },
  {
    href: '/emergencies', // Changed from /dashboard/emergencies
    label: 'Emergencies',
    icon: Siren,
    roles: ['doctor', 'staff'],
  },
  // Staff specific
  {
    href: '/staff/add-patient', // Changed from /dashboard/staff/add-patient
    label: 'Add Patient',
    icon: UserPlus,
    roles: ['staff'],
  },
  {
    href: '/staff/create-emergency', // Changed from /dashboard/staff/create-emergency
    label: 'Create Emergency',
    icon: AlertTriangle,
    roles: ['staff'],
  },
  {
    href: '/staff/manage-users', // Changed from /dashboard/staff/manage-users
    label: 'Manage Users',
    icon: Briefcase,
    roles: ['staff'],
  },
];
