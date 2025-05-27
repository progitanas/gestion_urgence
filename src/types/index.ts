export type UserRole = 'patient' | 'doctor' | 'staff' | null;

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name?: string; // Optional: full name
}

export interface Patient {
  id: string;
  userId?: string; // Link to User table if patient is also a user
  firstName: string;
  lastName: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: Date;
  address: string;
  phone: string;
  medicalHistory: string;
}

export interface EmergencyAlert {
  id: string;
  patientName: string; // For simplicity, direct name. Could be patientId.
  emergencyType: string;
  location: string;
  priority: 1 | 2 | 3 | 4 | 5;
  status: 'pending' | 'in_progress' | 'resolved' | 'refused';
  timestamp: Date;
  assignedTo?: string; // Doctor's ID or name
  notes?: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  date: Date;
  notes: string;
  prescription?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: Date;
  reason: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}
