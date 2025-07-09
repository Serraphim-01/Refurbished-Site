'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/lib/store';
import { Download, FileText, Eye, Calendar, MapPin, Building2 } from 'lucide-react';

export default function PPALetterPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const { user } = useAuthStore();

  const handleDownload = async () => {
    setIsGenerating(true);
    // Simulate PDF generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
    
    // In a real app, this would generate and download the actual PDF
    alert('PPA Letter downloaded successfully!');
  };

  const handlePreview = () => {
    // In a real app, this would open the PDF in a modal or new tab
    alert('PDF preview would open here');
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">PPA Letter</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Download your Primary Place of Assignment (PPA) letter
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* PPA Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-nysc-primary" />
              PPA Assignment Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Organization</p>
              <p className="font-semibold">{user.ppaDetails?.organization || 'Lagos State Ministry of Education'}</p>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Address</p>
              <p className="font-semibold flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-nysc-primary flex-shrink-0" />
                {user.ppaDetails?.address || 'Alausa Secretariat, Block A, Room 201, Ikeja, Lagos State'}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Reporting Date</p>
              <p className="font-semibold flex items-center gap-2">
                <Calendar className="h-4 w-4 text-nysc-primary" />
                {user.ppaDetails?.startDate ? new Date(user.ppaDetails.startDate).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                }) : '15th March, 2025'}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Department</p>
              <p className="font-semibold">Information Technology Unit</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Supervisor</p>
              <p className="font-semibold">Mr. Adebayo Olamide</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Contact Number</p>
              <p className="font-semibold">+234-1-7031234</p>
            </div>
          </CardContent>
        </Card>

        {/* Download Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-nysc-primary" />
              PPA Letter Document
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <FileText className="h-16 w-16 text-nysc-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Official PPA Letter</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Your official Primary Place of Assignment letter containing all necessary details for your service year.
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Document Type:</span>
                  <span className="font-medium">PDF</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>File Size:</span>
                  <span className="font-medium">~250KB</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Last Updated:</span>
                  <span className="font-medium">10 Jan 2025</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={handlePreview}
                variant="outline" 
                className="w-full border-nysc-primary text-nysc-primary hover:bg-nysc-primary hover:text-white"
              >
                <Eye className="mr-2 h-4 w-4" />
                Preview Document
              </Button>
              
              <Button 
                onClick={handleDownload}
                className="w-full bg-nysc-primary hover:bg-nysc-dark"
                disabled={isGenerating}
              >
                <Download className="mr-2 h-4 w-4" />
                {isGenerating ? 'Generating PDF...' : 'Download PPA Letter'}
              </Button>
            </div>

            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Present this letter to your PPA organization on resumption</p>
              <p>• Keep multiple copies for your records</p>
              <p>• Contact NYSC if there are any discrepancies</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Important Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-nysc-primary">Before Reporting</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-nysc-primary">•</span>
                  Print and carry multiple copies of this letter
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-nysc-primary">•</span>
                  Contact your supervisor before resuming
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-nysc-primary">•</span>
                  Confirm the reporting time and dress code
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-nysc-primary">•</span>
                  Bring your discharge certificate and other documents
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-nysc-primary">On Resumption Day</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-nysc-primary">•</span>
                  Report to the organization early
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-nysc-primary">•</span>
                  Present yourself to the designated supervisor
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-nysc-primary">•</span>
                  Complete all required documentation
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-nysc-primary">•</span>
                  Begin orientation and integration process
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}