'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { NotificationPopup } from '@/components/notification-popup';
import { Header } from '@/components/header';
import { 
  Shield, 
  CreditCard, 
  ExternalLink, 
  FileText, 
  Banknote, 
  Calendar, 
  HelpCircle,
  Users,
  GraduationCap,
  Fingerprint,
  Building2,
  ArrowRight,
  Smartphone,
  Globe,
  Award,
  BookOpen
} from 'lucide-react';
import { menuItems, guidelines, importantInfo, remobilizationData } from '@/lib/data';

const iconMap = {
  Shield,
  CreditCard,
  ExternalLink,
  FileText,
  Banknote,
  Calendar,
  HelpCircle,
  Users,
  GraduationCap,
  Fingerprint,
  Building2
};

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      <NotificationPopup />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Illustration */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-nysc-primary rounded-full animate-pulse-slow"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-nysc-accent rounded-full animate-bounce-slow"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-nysc-light rounded-full animate-pulse-slow"></div>
        </div>
        
        <div className="container mx-auto mobile-padding py-8 sm:py-12 lg:py-16">
          <div className="text-center space-y-6 sm:space-y-8">
            <div className={`mx-auto w-24 h-24 sm:w-32 sm:h-32 bg-nysc-primary rounded-full flex items-center justify-center shadow-lg hover-scale smooth-transition ${isVisible ? 'animate-scaleIn' : 'opacity-0'}`}>
              <span className="text-white font-bold text-2xl sm:text-4xl">NYSC</span>
            </div>
            
            <div className={`space-y-3 sm:space-y-4 ${isVisible ? 'animate-fadeInUp animate-delay-200' : 'opacity-0'}`}>
              <h1 className="mobile-heading font-bold text-gray-900 dark:text-white leading-tight">
                Welcome to <span className="text-nysc-primary bg-gradient-to-r from-nysc-primary to-nysc-light bg-clip-text text-transparent">NYSC Portal</span>
              </h1>
              <p className="mobile-subheading text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
                Your gateway to seamless National Youth Service Corps experience
              </p>
            </div>

            <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${isVisible ? 'animate-fadeInUp animate-delay-300' : 'opacity-0'}`}>
              <div className="bg-nysc-accent/10 border border-nysc-accent rounded-lg p-3 sm:p-4 hover-lift smooth-transition">
                <div className="text-xs sm:text-sm font-medium text-nysc-accent">Remobilization {remobilizationData.batch}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Ending Date: {new Date(remobilizationData.endingDate).toLocaleDateString()}
                </div>
              </div>
              
              <Button asChild size="lg" className="bg-nysc-primary hover:bg-nysc-dark smooth-transition hover-scale w-full sm:w-auto">
                <Link href="/login">
                  Login Here
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            {/* Mobile illustration */}
            <div className={`mt-8 flex justify-center space-x-4 ${isVisible ? 'animate-fadeInUp animate-delay-500' : 'opacity-0'}`}>
              <div className="flex items-center space-x-2 text-nysc-primary">
                <Smartphone className="h-5 w-5" />
                <span className="text-sm">Mobile Friendly</span>
              </div>
              <div className="flex items-center space-x-2 text-nysc-accent">
                <Globe className="h-5 w-5" />
                <span className="text-sm">24/7 Access</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white/50 dark:bg-gray-800/50">
        <div className="container mx-auto mobile-padding">
          <h2 className="mobile-subheading font-bold text-center mb-8 sm:mb-12 text-gray-900 dark:text-white animate-fadeInUp">
            Quick Actions
          </h2>
          
          <div className="tablet-grid gap-4 sm:gap-6 lg:gap-8">
            <Card className="hover:shadow-lg smooth-transition border-nysc-primary/20 hover-lift animate-fadeInUp">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-nysc-primary text-sm sm:text-base">
                  <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                  Application for Remobilisation
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  New: Online Application for Remobilization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full bg-nysc-primary hover:bg-nysc-dark smooth-transition text-xs sm:text-sm">
                  <Link href="/remobilization">
                    Click here to apply for remobilisation
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {menuItems.map((item, index) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap];
              return (
                <Card key={index} className={`hover:shadow-lg smooth-transition hover-lift animate-fadeInUp animate-delay-${(index + 1) * 100}`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-nysc-primary text-sm sm:text-base">
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline" className="w-full border-nysc-primary text-nysc-primary hover:bg-nysc-primary hover:text-white smooth-transition text-xs sm:text-sm">
                      <Link href={item.href}>
                        Access {item.title}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Guidelines */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto mobile-padding">
          <h2 className="mobile-subheading font-bold text-center mb-8 sm:mb-12 text-gray-900 dark:text-white animate-fadeInUp">
            Guidelines
          </h2>
          
          <div className="mobile-grid gap-4 sm:gap-6">
            {guidelines.map((item, index) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap];
              return (
                <Card key={index} className={`text-center hover:shadow-lg smooth-transition hover-scale animate-fadeInUp animate-delay-${index * 100}`}>
                  <CardHeader>
                    <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 bg-nysc-light/20 rounded-full flex items-center justify-center hover-scale smooth-transition">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-nysc-primary" />
                    </div>
                    <CardTitle className="text-xs sm:text-sm">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="ghost" size="sm" className="text-nysc-primary hover:bg-nysc-primary hover:text-white smooth-transition text-xs">
                      <Link href={item.href}>
                        View Details
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Important Information */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto mobile-padding">
          <h2 className="mobile-subheading font-bold text-center mb-8 sm:mb-12 text-gray-900 dark:text-white animate-fadeInUp">
            Important Information
          </h2>
          
          <div className="mobile-grid gap-4 sm:gap-6">
            {importantInfo.map((item, index) => {
              const icons = [Users, GraduationCap, Fingerprint, Building2];
              const Icon = icons[index];
              return (
                <Card key={index} className={`text-center hover:shadow-lg smooth-transition hover-scale animate-fadeInUp animate-delay-${index * 100}`}>
                  <CardHeader>
                    <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 bg-nysc-accent/20 rounded-full flex items-center justify-center hover-scale smooth-transition">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-nysc-accent" />
                    </div>
                    <CardTitle className="text-xs sm:text-sm">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="ghost" size="sm" className="text-nysc-accent hover:bg-nysc-accent hover:text-white smooth-transition text-xs">
                      <Link href={item.href}>
                        View List
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-nysc-primary text-white py-6 sm:py-8">
        <div className="container mx-auto mobile-padding text-center">
          <div className="flex justify-center mb-4">
            <Award className="h-8 w-8 animate-pulse-slow" />
          </div>
          <p className="text-base sm:text-lg font-semibold mb-2">National Youth Service Corps</p>
          <p className="text-xs sm:text-sm opacity-90">Service to Fatherland</p>
          <div className="mt-3 sm:mt-4 text-xs opacity-75">
            © 2025 NYSC Portal. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}