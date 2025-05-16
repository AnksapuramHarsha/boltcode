import React from 'react';
import { Clock, ArrowUpDown, MoreHorizontal } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WaitingListItem {
  id: string;
  patientName: string;
  patientId: string;
  requestedTime: Date;
  priority: 'high' | 'medium' | 'low';
  reason: string;
  status: 'waiting' | 'called' | 'cancelled';
}

interface WaitingListProps {
  items: WaitingListItem[];
  onStatusChange: (id: string, status: WaitingListItem['status']) => void;
  onPriorityChange: (id: string, priority: WaitingListItem['priority']) => void;
}

export function WaitingList({ items, onStatusChange, onPriorityChange }: WaitingListProps) {
  const getPriorityColor = (priority: WaitingListItem['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-800 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
      case 'medium':
        return 'text-yellow-800 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
      case 'low':
        return 'text-green-800 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
    }
  };

  const getStatusColor = (status: WaitingListItem['status']) => {
    switch (status) {
      case 'waiting':
        return 'text-blue-800 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30';
      case 'called':
        return 'text-green-800 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
      case 'cancelled':
        return 'text-red-800 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Waiting List</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Waiting Time</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage 
                        src={`https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${parseInt(item.id)}.jpg`}
                        alt={item.patientName}
                      />
                      <AvatarFallback>{item.patientName.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{item.patientName}</div>
                      <div className="text-sm text-muted-foreground">{item.patientId}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{formatWaitingTime(item.requestedTime)}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getPriorityColor(item.priority)}>
                    {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="max-w-[200px] truncate" title={item.reason}>
                    {item.reason}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(item.status)}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => onStatusChange(item.id, 'called')}
                        disabled={item.status === 'called'}
                      >
                        Call Patient
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onStatusChange(item.id, 'cancelled')}
                        disabled={item.status === 'cancelled'}
                      >
                        Cancel
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onPriorityChange(item.id, 'high')}>
                        Set High Priority
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onPriorityChange(item.id, 'medium')}>
                        Set Medium Priority
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onPriorityChange(item.id, 'low')}>
                        Set Low Priority
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function formatWaitingTime(requestedTime: Date) {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - requestedTime.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 60) {
    return `${diffInMinutes} min`;
  }
  
  const hours = Math.floor(diffInMinutes / 60);
  const minutes = diffInMinutes % 60;
  return `${hours}h ${minutes}m`;
}