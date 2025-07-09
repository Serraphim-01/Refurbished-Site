'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/lib/store';
import { CheckCircle, AlertCircle, Clock, User, Calendar, MessageSquare, Send } from 'lucide-react';
import { useState } from 'react';

export default function DisciplinaryCasePage() {
  const [appealMessage, setAppealMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuthStore();

  const disciplinaryRecord = {
    hasCase: false,
    cases: [],
    status: 'clear'
  };

  const handleAppealSubmit = async () => {
    if (!appealMessage.trim()) return;
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setAppealMessage('');
    alert('Appeal submitted successfully!');
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Disciplinary Case</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          View your disciplinary record and submit appeals if necessary
        </p>
      </div>

      {/* Personal Details */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-nysc-primary" />
            Personal Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Full Name</p>
              <p className="font-semibold">{user.name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Call Up Number</p>
              <p className="font-semibold">{user.callUpNumber}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">State Code</p>
              <p className="font-semibold">{user.stateCode}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Batch</p>
              <p className="font-semibold">{user.batch}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">PPA</p>
              <p className="font-semibold">{user.ppaDetails?.organization || 'Not Assigned'}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Service Status</p>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                <CheckCircle className="h-3 w-3 mr-1" />
                Active
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disciplinary Case History */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-nysc-primary" />
            Disciplinary Case History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!disciplinaryRecord.hasCase ? (
            <div className="text-center py-8">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-green-700 dark:text-green-400">
                Excellent Record!
              </h3>
              <p className="text-muted-foreground">
                You have no disciplinary cases on record. Keep up the great work during your service year!
              </p>
              <div className="mt-4">
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Clean Disciplinary Record
                </Badge>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {disciplinaryRecord.cases.map((caseItem: any, index: number) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{caseItem.title}</h4>
                      <p className="text-sm text-muted-foreground">{caseItem.description}</p>
                    </div>
                    <Badge className={
                      caseItem.status === 'resolved' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }>
                      {caseItem.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(caseItem.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Appeal Message History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-nysc-primary" />
            Appeal Message
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="appealMessage">Submit an Appeal or Inquiry</Label>
              <p className="text-sm text-muted-foreground mb-2">
                If you have any concerns about your disciplinary record or need to submit an appeal, please write your message below.
              </p>
              <Textarea
                id="appealMessage"
                placeholder="Type your appeal message or inquiry here..."
                value={appealMessage}
                onChange={(e) => setAppealMessage(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>

            <Button 
              onClick={handleAppealSubmit}
              disabled={!appealMessage.trim() || isSubmitting}
              className="bg-nysc-primary hover:bg-nysc-dark"
            >
              <Send className="mr-2 h-4 w-4" />
              {isSubmitting ? 'Submitting...' : 'Submit Appeal'}
            </Button>

            {/* Previous Messages (if any) */}
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-3">Message History</h4>
              <div className="text-center py-4 text-muted-foreground">
                <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No previous messages</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Information Panel */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Important Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-nysc-primary">Guidelines for Appeals</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-nysc-primary">•</span>
                  Appeals must be submitted within 30 days of the disciplinary action
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-nysc-primary">•</span>
                  Provide clear and factual information in your appeal
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-nysc-primary">•</span>
                  Include any supporting evidence or documentation
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-nysc-primary">•</span>
                  Appeals are reviewed by the disciplinary committee
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-nysc-primary">Contact for Assistance</h4>
              <div className="text-sm space-y-2">
                <p><strong>Disciplinary Office:</strong> +234-9-4707999</p>
                <p><strong>Email:</strong> disciplinary@nysc.gov.ng</p>
                <p><strong>Office Hours:</strong> Mon-Fri, 9:00 AM - 3:00 PM</p>
                <p><strong>Response Time:</strong> 5-10 working days</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}