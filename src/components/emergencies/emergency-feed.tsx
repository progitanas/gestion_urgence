'use client';

import type { EmergencyAlert, UserRole } from '@/types';
import { EmergencyAlertCard } from './emergency-alert-card';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Filter } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthMock } from '@/context/auth-context-mock';
import { useToast } from '@/hooks/use-toast';

// Mock data generation
const generateMockAlerts = (count: number): EmergencyAlert[] => {
  const types = ['Cardiac Arrest', 'Stroke', 'Severe Bleeding', 'Respiratory Distress', 'Fall with Injury'];
  const locations = ['Room 101', 'ER Bay 3', 'Lobby', 'Parking Lot B', 'Ward C, Bed 2'];
  const patients = ['John Smith', 'Alice Johnson', 'Bob Williams', 'Eva Brown', 'Michael Davis'];
  const statuses: EmergencyAlert['status'][] = ['pending', 'in_progress', 'resolved', 'refused'];
  const doctors = ['Adams', 'Miller', 'Wilson'];

  return Array.from({ length: count }, (_, i) => ({
    id: `alert-${Date.now()}-${i}`,
    patientName: patients[Math.floor(Math.random() * patients.length)],
    emergencyType: types[Math.floor(Math.random() * types.length)],
    location: locations[Math.floor(Math.random() * locations.length)],
    priority: (Math.floor(Math.random() * 5) + 1) as EmergencyAlert['priority'],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    timestamp: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24), // Within last 24 hours
    assignedTo: Math.random() > 0.5 ? doctors[Math.floor(Math.random() * doctors.length)] : undefined,
    notes: Math.random() > 0.7 ? "Patient is conscious but disoriented." : undefined,
  }));
};


export function EmergencyFeed() {
  const [alerts, setAlerts] = useState<EmergencyAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthMock();
  const { toast } = useToast();

  const fetchAlerts = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const newAlerts = generateMockAlerts(10).sort((a,b) => b.timestamp.getTime() - a.timestamp.getTime());
      setAlerts(newAlerts);
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchAlerts();

    // Simulate real-time updates for pending alerts
    const intervalId = setInterval(() => {
      setAlerts(prevAlerts => {
        if (Math.random() < 0.2 && prevAlerts.filter(a => a.status === 'pending').length < 5) { // Add new alert occasionally
          const newAlert = generateMockAlerts(1)[0];
          newAlert.status = 'pending';
          newAlert.timestamp = new Date();
           toast({ title: "New Emergency Alert!", description: `${newAlert.emergencyType} for ${newAlert.patientName} at ${newAlert.location}.`, variant: "destructive" });
          return [newAlert, ...prevAlerts].sort((a,b) => b.timestamp.getTime() - a.timestamp.getTime());
        }
        return prevAlerts;
      });
    }, 15000); // Every 15 seconds

    return () => clearInterval(intervalId);
  }, []);

  const handleAlertAction = (alertId: string, action: 'accept' | 'refuse' | 'resolve' | 'view_details') => {
    console.log(`Action: ${action} on alert: ${alertId}`);
    toast({
      title: `Alert Action: ${action}`,
      description: `Action '${action}' initiated for alert ID ${alertId}.`,
    });

    setAlerts(prevAlerts =>
      prevAlerts.map(alert => {
        if (alert.id === alertId) {
          if (action === 'accept') return { ...alert, status: 'in_progress', assignedTo: user?.name || 'Current Doctor' };
          if (action === 'refuse') return { ...alert, status: 'refused' };
          if (action === 'resolve') return { ...alert, status: 'resolved' };
        }
        return alert;
      })
    );
  };
  
  const filterAlerts = (status: EmergencyAlert['status'] | 'all') => {
    if (status === 'all') return alerts;
    return alerts.filter(alert => alert.status === status);
  }

  const renderAlertList = (filteredAlerts: EmergencyAlert[]) => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-4 border rounded-lg shadow animate-pulse bg-card">
              <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-muted rounded w-full mb-2"></div>
              <div className="h-4 bg-muted rounded w-full mb-2"></div>
              <div className="h-10 bg-muted rounded w-1/3 mt-4 ml-auto"></div>
            </div>
          ))}
        </div>
      );
    }
    if (filteredAlerts.length === 0) {
      return <p className="text-center text-muted-foreground py-8">No alerts to display for this category.</p>;
    }
    return (
       <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {filteredAlerts.map(alert => (
          <EmergencyAlertCard key={alert.id} alert={alert} onAction={handleAlertAction} userRole={user?.role as UserRole} />
        ))}
      </div>
    );
  }


  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-foreground">Emergency Alerts</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchAlerts} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          {/* <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button> */}
        </div>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-4">
          <TabsTrigger value="pending">Pending ({filterAlerts('pending').length})</TabsTrigger>
          <TabsTrigger value="in_progress">In Progress ({filterAlerts('in_progress').length})</TabsTrigger>
          <TabsTrigger value="resolved">Resolved ({filterAlerts('resolved').length})</TabsTrigger>
          <TabsTrigger value="all">All ({alerts.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
            {renderAlertList(filterAlerts('pending'))}
        </TabsContent>
        <TabsContent value="in_progress">
            {renderAlertList(filterAlerts('in_progress'))}
        </TabsContent>
        <TabsContent value="resolved">
            {renderAlertList(filterAlerts('resolved'))}
        </TabsContent>
         <TabsContent value="all">
            {renderAlertList(filterAlerts('all'))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
