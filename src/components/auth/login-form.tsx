'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { loginSchema } from '@/lib/schemas';
import { useAuthMock } from '@/context/auth-context-mock';
import { LogIn, User, Briefcase, Activity } from 'lucide-react';
import type { UserRole } from '@/types';
import { useToast } from '@/hooks/use-toast';

export function LoginForm() {
  const { login, isLoading } = useAuthMock();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      role: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    // Simulate API call
    try {
        login(values.email, values.role as UserRole); // Role is validated by zod enum
        toast({
          title: "Login Successful",
          description: `Welcome back! Redirecting to your ${values.role} dashboard.`,
        });
    } catch (error) {
        toast({
          title: "Login Failed",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
    }
  }

  const roleIcons = {
    patient: <User className="mr-2 h-4 w-4" />,
    doctor: <Activity className="mr-2 h-4 w-4" />, // Stethoscope might be too specific, Activity is more general for doctor
    staff: <Briefcase className="mr-2 h-4 w-4" />,
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="m@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="patient">
                    <div className="flex items-center">{roleIcons.patient} Patient</div>
                  </SelectItem>
                  <SelectItem value="doctor">
                    <div className="flex items-center">{roleIcons.doctor} Doctor</div>
                  </SelectItem>
                  <SelectItem value="staff">
                    <div className="flex items-center">{roleIcons.staff} Staff</div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            'Logging in...'
          ) : (
            <>
              <LogIn className="mr-2 h-4 w-4" /> Sign In
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
