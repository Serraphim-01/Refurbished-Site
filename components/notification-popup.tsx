'use client';

import { useState, useEffect } from 'react';
import { X, Bell } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { importantNotifications } from '@/lib/data';

export function NotificationPopup() {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [notification] = importantNotifications;

  useEffect(() => {
    const hasSeenNotification = localStorage.getItem(`notification-${notification.id}`);
    if (!hasSeenNotification) {
      setTimeout(() => {
        setOpen(true);
        setIsVisible(true);
      }, 1000);
    }
  }, [notification.id]);

  const handleClose = () => {
    localStorage.setItem(`notification-${notification.id}`, 'seen');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={`sm:max-w-md ${isVisible ? 'animate-scaleIn' : 'opacity-0'}`}>
        <DialogHeader>
          <DialogTitle className="text-center text-nysc-primary font-bold flex items-center justify-center gap-2">
            <Bell className="h-5 w-5 animate-bounce" />
            {notification.title}
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 hover-scale smooth-transition"
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <div className="space-y-4">
          <div className="whitespace-pre-line text-xs sm:text-sm text-muted-foreground text-center">
            {notification.content}
          </div>
          <Button onClick={handleClose} className="w-full bg-nysc-primary hover:bg-nysc-dark smooth-transition hover-scale">
            Understood
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}