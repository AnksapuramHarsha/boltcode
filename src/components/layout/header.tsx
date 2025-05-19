import React from 'react';
import {
  Bell,
  Calendar,
  HelpCircle,
  Menu,
  MessageSquare,
  Search,
  User,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header = ({ sidebarOpen, setSidebarOpen }: HeaderProps) => {
  // Hide header only on small screens when sidebar is open
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const shouldHideHeader = sidebarOpen && isMobile;

  return (
    <header
      className={`z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 transition-all duration-300 ${
        shouldHideHeader ? 'hidden' : 'sticky top-0'
      }`}
    >
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        <span className="sr-only">Toggle Menu</span>
      </Button>

      {/* Search bar - hidden on very small screens */}
      <div className="hidden sm:block flex-1 md:w-64 lg:w-72">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full bg-background pl-8"
          />
        </div>
      </div>

      {/* Right-side Icons */}
      <div className="flex items-center gap-2 sm:gap-4 ml-auto">
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Calendar className="h-5 w-5" />
          <span className="sr-only">Calendar</span>
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-muted-foreground">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                3
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="max-w-xs w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {[1, 2, 3].map((i) => (
              <DropdownMenuItem
                key={i}
                className="cursor-pointer flex flex-col items-start px-4 py-2"
              >
                <div className="flex w-full items-center justify-between mb-1">
                  <div className="font-medium">New appointment</div>
                  <div className="text-xs text-muted-foreground">10 min ago</div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Patient John Doe has requested a new appointment.
                </p>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center font-medium">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Messages */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-muted-foreground">
              <MessageSquare className="h-5 w-5" />
              <span className="sr-only">Messages</span>
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                2
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="max-w-xs w-80">
            <DropdownMenuLabel>Messages</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {[1, 2].map((i) => (
              <DropdownMenuItem
                key={i}
                className="cursor-pointer flex items-start gap-4 px-4 py-2"
              >
                <Avatar>
                  <AvatarImage
                    src={`https://randomuser.me/api/portraits/women/${i + 20}.jpg`}
                    alt="User"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <div className="flex w-full items-center justify-between mb-1">
                    <div className="font-medium">Dr. Sarah Johnson</div>
                    <div className="text-xs text-muted-foreground">15 min ago</div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Can we discuss the lab results for patient #12345?
                  </p>
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center font-medium">
              View all messages
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <HelpCircle className="h-5 w-5" />
          <span className="sr-only">Help</span>
        </Button>

        {/* User Avatar */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src="https://randomuser.me/api/portraits/men/1.jpg"
                  alt="User"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
