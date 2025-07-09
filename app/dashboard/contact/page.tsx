'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { contactInfo } from '@/lib/data';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Contact Us</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          We would like to hear from you. Get in touch with us for support and inquiries.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* NYSC Contact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-nysc-primary">
              <MessageCircle className="h-5 w-5" />
              {contactInfo.nysc.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-nysc-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-sm text-muted-foreground">{contactInfo.nysc.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-nysc-primary flex-shrink-0" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">{contactInfo.nysc.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-nysc-primary flex-shrink-0" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{contactInfo.nysc.email}</p>
                </div>
              </div>
            </div>

            <div className="bg-nysc-primary/5 border border-nysc-primary/20 rounded-lg p-4 mt-6">
              <h4 className="font-semibold text-nysc-primary mb-2">Office Hours</h4>
              <div className="text-sm space-y-1">
                <p><strong>Monday - Friday:</strong> 8:00 AM - 4:00 PM</p>
                <p><strong>Saturday:</strong> 9:00 AM - 1:00 PM</p>
                <p><strong>Sunday:</strong> Closed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sidmach Contact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-nysc-accent">
              <MessageCircle className="h-5 w-5" />
              {contactInfo.sidmach.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-nysc-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-sm text-muted-foreground">{contactInfo.sidmach.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-nysc-accent flex-shrink-0" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">{contactInfo.sidmach.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-nysc-accent flex-shrink-0" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{contactInfo.sidmach.email}</p>
                </div>
              </div>
            </div>

            <div className="bg-nysc-accent/5 border border-nysc-accent/20 rounded-lg p-4 mt-6">
              <h4 className="font-semibold text-nysc-accent mb-2">Technical Support</h4>
              <div className="text-sm space-y-1">
                <p><strong>Available:</strong> 24/7</p>
                <p><strong>Response Time:</strong> Within 2-4 hours</p>
                <p><strong>Support Type:</strong> Portal Technical Issues</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Support Categories */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Support Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold mb-2">General Inquiries</h4>
              <p className="text-sm text-muted-foreground">
                General questions about NYSC programs, policies, and procedures
              </p>
            </div>

            <div className="text-center p-4 border rounded-lg">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <Phone className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-2">Technical Support</h4>
              <p className="text-sm text-muted-foreground">
                Portal issues, login problems, and technical difficulties
              </p>
            </div>

            <div className="text-center p-4 border rounded-lg">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <Mail className="h-6 w-6 text-orange-600" />
              </div>
              <h4 className="font-semibold mb-2">Document Issues</h4>
              <p className="text-sm text-muted-foreground">
                Certificate verification, corrections, and document-related queries
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}