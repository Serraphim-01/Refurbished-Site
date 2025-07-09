'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useAuthStore } from '@/lib/store';
import { LogOut, User } from 'lucide-react';

export function Header() {
  const { isAuthenticated, logout, user } = useAuthStore();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-30">
      <div className="container mx-auto mobile-padding h-14 sm:h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 hover-scale smooth-transition">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-nysc-primary rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xs sm:text-sm">NYSC</span>
          </div>
          <span className="font-bold text-sm sm:text-lg">NYSC Portal</span>
        </Link>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <ThemeToggle />
          {isAuthenticated ? (
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="hidden sm:flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span className="text-xs sm:text-sm font-medium truncate max-w-32">{user?.name}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-destructive hover:text-destructive smooth-transition"
              >
                <LogOut className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          ) : (
            <Button asChild className="bg-nysc-primary hover:bg-nysc-dark smooth-transition text-xs sm:text-sm">
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}