import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  ActivitySquare,
  Calendar,
  ClipboardList,
  FilePlus2,
  HeartPulse,
  Home,
  LayoutDashboard,
  LibrarySquare,
  Pill,
  Settings,
  Stethoscope,
  TestTube,
  Users,
  Wallet,
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface NavItem {
  title: string;
  icon: React.ReactNode;
  href: string;
  badge?: number;
}

const navItems: NavItem[] = [
  { title: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" />, href: '/' },
  { title: 'Patients', icon: <Users className="h-5 w-5" />, href: '/patients' },
  { title: 'Vitals', icon: <HeartPulse className="h-5 w-5" />, href: '/vitals' },
  { title: 'Appointments', icon: <Calendar className="h-5 w-5" />, href: '/appointments', badge: 5 },
  { title: 'Doctors', icon: <Stethoscope className="h-5 w-5" />, href: '/doctors' },
  { title: 'Medical Records', icon: <ClipboardList className="h-5 w-5" />, href: '/medical-records' },
  { title: 'Laboratory', icon: <TestTube className="h-5 w-5" />, href: '/laboratory', badge: 3 },
  { title: 'Prescriptions', icon: <FilePlus2 className="h-5 w-5" />, href: '/prescriptions' },
  { title: 'Pharmacy', icon: <Pill className="h-5 w-5" />, href: '/pharmacy' },
  { title: 'Billing', icon: <Wallet className="h-5 w-5" />, href: '/billing' },
  { title: 'Inventory', icon: <LibrarySquare className="h-5 w-5" />, href: '/inventory' },
  { title: 'Reports', icon: <ActivitySquare className="h-5 w-5" />, href: '/reports' },
  { title: 'Settings', icon: <Settings className="h-5 w-5" />, href: '/settings' },
];

const Sidebar = ({ open, onOpenChange }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-20 bg-background/80 backdrop-blur-sm md:hidden",
          open ? "block" : "hidden"
        )}
        onClick={() => onOpenChange(false)}
      />
      
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 transform border-r bg-background transition-all duration-300 md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center border-b px-4">
          <div className="flex items-center gap-2">
            <HeartPulse className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">MediCare HMS</span>
          </div>
        </div>
        
        <nav className="flex flex-col gap-1 p-2">
          <TooltipProvider delayDuration={0}>
            {navItems.map((item) => (
              <Tooltip key={item.title}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "group relative flex h-10 w-full justify-start text-muted-foreground",
                      location.pathname === item.href && "bg-accent text-accent-foreground"
                    )}
                    onClick={() => {
                      navigate(item.href);
                      if (window.innerWidth < 768) {
                        onOpenChange(false);
                      }
                    }}
                  >
                    {item.icon}
                    <span className="ml-3">{item.title}</span>
                    {item.badge && (
                      <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                        {item.badge}
                      </span>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className="ml-1">
                  {item.title}
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </nav>
        
        <div className="absolute bottom-0 w-full p-4 border-t">
          <div className="flex items-center gap-3 px-2">
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://randomuser.me/api/portraits/men/1.jpg" alt="Dr. John Smith" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium leading-none">Dr. John Smith</span>
              <span className="text-xs text-muted-foreground">Cardiologist</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;