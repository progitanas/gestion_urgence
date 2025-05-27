'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
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
import { Textarea } from '@/components/ui/textarea';
import { emergencyCreationSchema } from '@/lib/schemas';
import { AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function EmergencyCreationForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof emergencyCreationSchema>>({
    resolver: zodResolver(emergencyCreationSchema),
    defaultValues: {
      patientName: '',
      emergencyType: '',
      location: '',
      priority: 3, // Default to Medium
      notes: '',
    },
  });

  function onSubmit(values: z.infer<typeof emergencyCreationSchema>) {
    console.log(values); // Replace with actual submission logic
    // Typically, you would send this to an API endpoint
    // And then potentially update a global state or re-fetch emergencies.
    // For now, we'll just show a toast.
    toast({
      title: 'Emergency Alert Created',
      description: `Alert for ${values.patientName} of type "${values.emergencyType}" has been logged.`,
      variant: 'destructive', // Using destructive to make it noticeable
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="patientName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Patient Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter patient's full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="emergencyType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type of Emergency</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Cardiac Arrest, Fall, Allergic Reaction" {...field} />
              </FormControl>
              <FormDescription>
                Briefly describe the nature of the emergency.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Room 302, West Wing Lobby" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority Level</FormLabel>
              <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={String(field.value)}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">1 - Critical</SelectItem>
                  <SelectItem value="2">2 - High</SelectItem>
                  <SelectItem value="3">3 - Medium</SelectItem>
                  <SelectItem value="4">4 - Low</SelectItem>
                  <SelectItem value="5">5 - Informational</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any other relevant details, patient status, etc."
                  className="resize-y min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full md:w-auto" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Logging Alert..." : (
            <>
              <AlertTriangle className="mr-2 h-4 w-4" /> Log Emergency Alert
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
