'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/lib/store';
import {
  LayoutDashboard,
  Lock,
  BookOpen,
  FileText,
  MapPin,
  Gavel,
  CreditCard,
  MessageCircle,
  LogOut,
  X
} from 'lucide-react';

const menuItems = [
  {
    title: 'My Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard
  },
  {
    title: 'Change Password',
    href: '/dashboard/change-password',
    icon: Lock
  },
  {
    title: 'Course Correction',
    href: '/dashboard/course-correction',
    icon: BookOpen
  },
  {
    title: 'PPA Letter',
    href: '/dashboard/ppa-letter',
    icon: FileText
  },
  {
    title: 'LGA Clearance',
    href: '/dashboard/lga-clearance',
    icon: MapPin
  },
  {
    title: 'Disciplinary Case',
    href: '/dashboard/disciplinary-case',
    icon: Gavel
  }
];

const secondaryItems = [
  {
    title: 'Payment Status',
    href: '/dashboard/payment-status',
    icon: CreditCard
  },
  {
    title: 'Contact Us',
    href: '/dashboard/contact',
    icon: MessageCircle
  }
];

interface SidebarProps {
  onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuthStore();

  return (
    <div className="pb-12 w-64">
      {/* Mobile close button */}
      <div className="lg:hidden flex justify-end p-4">
        <button
          onClick={onClose}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 smooth-transition"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-3 text-lg font-semibold tracking-tight text-nysc-primary">
            Dashboard
          </h2>
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center rounded-lg px-3 py-2 text-sm font-medium smooth-transition hover-lift',
                  pathname === item.href
                    ? 'bg-nysc-primary text-white hover:bg-nysc-dark'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        
        <div className="px-3 py-2">
          <h2 className="mb-2 px-3 text-lg font-semibold tracking-tight text-nysc-accent">
            Services
          </h2>
          <div className="space-y-1">
            {secondaryItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center rounded-lg px-3 py-2 text-sm font-medium smooth-transition hover-lift',
                  pathname === item.href
                    ? 'bg-nysc-primary text-white hover:bg-nysc-dark'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Link>
            ))}
            
            <button
              onClick={logout}
              className="flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 smooth-transition hover-lift"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}