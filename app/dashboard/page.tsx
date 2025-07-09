'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuthStore } from '@/lib/store';
import { 
  User, 
  Hash, 
  MapPin, 
  Calendar, 
  Download, 
  ArrowRight, 
  BookOpen, 
  Award, 
  MessageSquare, 
  FileText,
  AlertTriangle,
  Smartphone,
  Globe
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [showAddendum, setShowAddendum] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!user) return null;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Addendum Popup */}
      <Dialog open={showAddendum} onOpenChange={setShowAddendum}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-nysc-primary">Important Notice - Addendum</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Please download and review the latest addendum to your service requirements.
            </p>
            <Button className="w-full bg-nysc-primary hover:bg-nysc-dark smooth-transition">
              <Download className="mr-2 h-4 w-4" />
              Download Addendum PDF
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Welcome Header */}
      <div className={`bg-gradient-to-r from-nysc-primary to-nysc-light text-white rounded-lg p-4 sm:p-6 relative overflow-hidden ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
        {/* Background illustration */}
        <div className="absolute top-0 right-0 opacity-10">
          <Smartphone className="h-24 w-24 sm:h-32 sm:w-32" />
        </div>
        <div className="absolute bottom-0 left-0 opacity-10">
          <Globe className="h-20 w-20 sm:h-24 sm:w-24" />
        </div>
        
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 relative z-10">Welcome back, {user.name.split(' ')[0]}!</h1>
        <p className="text-sm sm:text-base lg:text-lg opacity-90 relative z-10">Manage your NYSC journey from your dashboard</p>
        <Button 
          variant="secondary" 
          className="mt-3 sm:mt-4 smooth-transition hover-scale text-xs sm:text-sm relative z-10"
          onClick={() => setShowAddendum(true)}
        >
          <AlertTriangle className="mr-2 h-4 w-4" />
          View Important Notice
        </Button>
      </div>

      {/* Basic Details */}
      <Card className={`hover-lift smooth-transition ${isVisible ? 'animate-fadeInUp animate-delay-200' : 'opacity-0'}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-nysc-primary" />
            Basic Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Full Name</p>
              <p className="font-semibold text-sm sm:text-base">{user.name}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Batch</p>
              <Badge variant="secondary" className="text-xs sm:text-sm">{user.batch}</Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Gender</p>
              <p className="font-semibold text-sm sm:text-base">{user.gender}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Call Up Number</p>
              <p className="font-semibold flex items-center gap-1 text-sm sm:text-base">
                <Hash className="h-4 w-4" />
                {user.callUpNumber}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">State Code</p>
              <p className="font-semibold flex items-center gap-1 text-sm sm:text-base">
                <MapPin className="h-4 w-4" />
                {user.stateCode}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Course</p>
              <p className="font-semibold text-sm sm:text-base">{user.course}</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6">
            <Button className="bg-nysc-primary hover:bg-nysc-dark smooth-transition hover-scale text-xs sm:text-sm">
              <Download className="mr-2 h-4 w-4" />
              Print Slip
            </Button>
            <Button variant="outline" className="border-nysc-primary text-nysc-primary hover:bg-nysc-primary hover:text-white smooth-transition text-xs sm:text-sm">
              <ArrowRight className="mr-2 h-4 w-4" />
              Request Relocation
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 ${isVisible ? 'animate-fadeInUp animate-delay-300' : 'opacity-0'}`}>
        <Card className="hover:shadow-lg smooth-transition cursor-pointer border-nysc-primary/20 hover-lift">
          <CardHeader className="pb-3">
            <CardTitle className="text-xs sm:text-sm flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-nysc-primary" />
              Course Correction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground mb-2 sm:mb-3">
              Apply for name/course arrangement and correction
            </p>
            <Button size="sm" variant="outline" className="w-full smooth-transition text-xs">
              Apply Now
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg smooth-transition cursor-pointer border-nysc-accent/20 hover-lift">
          <CardHeader className="pb-3">
            <CardTitle className="text-xs sm:text-sm flex items-center gap-2">
              <Award className="h-4 w-4 text-nysc-accent" />
              Scholarship
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground mb-2 sm:mb-3">
              Apply for NYSC scholarship opportunities
            </p>
            <Button size="sm" variant="outline" className="w-full smooth-transition text-xs">
              Apply Now
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg smooth-transition cursor-pointer hover-lift">
          <CardHeader className="pb-3">
            <CardTitle className="text-xs sm:text-sm flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-blue-600" />
              Advice
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground mb-2 sm:mb-3">
              Get guidance and advice for your service year
            </p>
            <Button size="sm" variant="outline" className="w-full smooth-transition text-xs">
              Get Advice
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg smooth-transition cursor-pointer border-green-200 hover-lift">
          <CardHeader className="pb-3">
            <CardTitle className="text-xs sm:text-sm flex items-center gap-2">
              <FileText className="h-4 w-4 text-green-600" />
              Clearance Note
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground mb-2 sm:mb-3">
              View your clearance status and notes
            </p>
            <Button size="sm" variant="outline" className="w-full smooth-transition text-xs">
              View Status
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Details Note */}
      <Card className={`hover-lift smooth-transition ${isVisible ? 'animate-fadeInUp animate-delay-500' : 'opacity-0'}`}>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Service Details Note</CardTitle>
          <CardDescription className="text-sm">
            Important information regarding your service year
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/50 rounded-lg p-3 sm:p-4 space-y-2">
            <p className="text-sm">
              <strong>PPA Assignment:</strong> {user.ppaDetails?.organization || 'Pending Assignment'}
            </p>
            <p className="text-sm">
              <strong>Service Location:</strong> {user.ppaDetails?.address || 'To be announced'}
            </p>
            <p className="text-sm">
              <strong>Expected Start Date:</strong> {user.ppaDetails?.startDate ? new Date(user.ppaDetails.startDate).toLocaleDateString() : 'TBA'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}