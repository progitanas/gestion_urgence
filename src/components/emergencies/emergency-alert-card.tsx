import type { EmergencyAlert } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Siren, MapPin, User, Clock, CheckCircle, XCircle, AlertTriangle, ArrowRightCircle, Hourglass } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface EmergencyAlertCardProps {
  alert: EmergencyAlert;
  onAction?: (alertId: string, action: 'accept' | 'refuse' | 'resolve' | 'view_details') => void;
  userRole: 'doctor' | 'staff' | null;
}

const statusMap = {
  pending: { label: 'Pending', color: 'bg-yellow-500 hover:bg-yellow-600', icon: <Hourglass className="h-4 w-4 mr-1" /> },
  in_progress: { label: 'In Progress', color: 'bg-blue-500 hover:bg-blue-600', icon: <Siren className="h-4 w-4 mr-1" /> },
  resolved: { label: 'Resolved', color: 'bg-green-500 hover:bg-green-600', icon: <CheckCircle className="h-4 w-4 mr-1" /> },
  refused: { label: 'Refused', color: 'bg-red-500 hover:bg-red-600', icon: <XCircle className="h-4 w-4 mr-1" /> },
};

const priorityMap = {
  1: { label: 'Critical', color: 'bg-red-600' },
  2: { label: 'High', color: 'bg-orange-500' },
  3: { label: 'Medium', color: 'bg-yellow-400 text-black' },
  4: { label: 'Low', color: 'bg-blue-400' },
  5: { label: 'Info', color: 'bg-gray-400' },
};


export function EmergencyAlertCard({ alert, onAction, userRole }: EmergencyAlertCardProps) {
  const timeAgo = formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true });
  const currentStatus = statusMap[alert.status] || statusMap.pending;
  const currentPriority = priorityMap[alert.priority] || priorityMap[5];

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow w-full break-inside-avoid-column">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-destructive" />
            {alert.emergencyType}
          </CardTitle>
          <Badge variant="default" className={`${currentPriority.color} text-white text-xs`}>
            Priority: {currentPriority.label}
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-1 text-sm">
          <User className="h-4 w-4" /> Patient: {alert.patientName}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-2 text-primary" />
          Location: {alert.location}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-2 text-primary" />
          Reported: {timeAgo}
        </div>
        {alert.assignedTo && (
          <div className="flex items-center text-sm text-muted-foreground">
            Assigned to: Dr. {alert.assignedTo}
          </div>
        )}
        <div className="flex items-center text-sm">
            <Badge variant="outline" className={`${currentStatus.color} text-white border-none`}>
                {currentStatus.icon} {currentStatus.label}
            </Badge>
        </div>
        {alert.notes && (
          <p className="text-sm text-muted-foreground border-l-2 border-primary pl-2 italic">Notes: {alert.notes}</p>
        )}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
        {userRole === 'doctor' && alert.status === 'pending' && (
          <>
            <Button variant="destructive" size="sm" onClick={() => onAction?.(alert.id, 'refuse')}>
              <XCircle className="mr-2 h-4 w-4" /> Refuse
            </Button>
            <Button variant="default" size="sm" onClick={() => onAction?.(alert.id, 'accept')}>
              <CheckCircle className="mr-2 h-4 w-4" /> Accept
            </Button>
          </>
        )}
        {userRole === 'doctor' && alert.status === 'in_progress' && (
           <Button variant="default" size="sm" onClick={() => onAction?.(alert.id, 'resolve')}>
             <CheckCircle className="mr-2 h-4 w-4" /> Mark Resolved
           </Button>
        )}
        <Button variant="outline" size="sm" onClick={() => onAction?.(alert.id, 'view_details')}>
          <ArrowRightCircle className="mr-2 h-4 w-4" /> View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
