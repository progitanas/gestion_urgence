import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  role: z.enum(['patient', 'doctor', 'staff'], { required_error: 'Please select a role.' }),
});

export const patientOnboardingSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required.' }),
  lastName: z.string().min(1, { message: 'Last name is required.' }),
  gender: z.enum(['male', 'female', 'other'], { required_error: 'Gender is required.' }),
  dateOfBirth: z.date({ required_error: 'Date of birth is required.' }),
  address: z.string().min(1, { message: 'Address is required.' }),
  phone: z.string().min(10, { message: 'Phone number must be at least 10 digits.' }).regex(/^\+?[0-9\s\-()]+$/, { message: 'Invalid phone number format.'}),
  medicalHistory: z.string().optional(),
});

export const emergencyCreationSchema = z.object({
  patientName: z.string().min(1, { message: "Patient name is required." }),
  emergencyType: z.string().min(1, { message: "Type of emergency is required." }),
  location: z.string().min(1, { message: "Location is required." }),
  priority: z.coerce.number().min(1).max(5).int(),
  notes: z.string().optional(),
});
