'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, AlertCircle, MapPin, Calendar, Download } from 'lucide-react';

export default function LGAClearancePage() {
  const clearanceStatus = {
    status: 'approved',
    dateApproved: '2025-01-10',
    lga: 'Ikeja Local Government Area',
    state: 'Lagos State',
    clearedBy: 'Mrs. Adunni Olatunji',
    designation: 'LGA NYSC Coordinator',
    remarks: 'Corps member has successfully completed all required community development activities and has shown excellent conduct throughout the service year.'
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'rejected':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">LGA Clearance</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          View your Local Government Area clearance status and details
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Clearance Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-nysc-primary" />
              Clearance Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              {getStatusIcon(clearanceStatus.status)}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Status:</span>
                  <Badge className={getStatusColor(clearanceStatus.status)}>
                    {clearanceStatus.status.charAt(0).toUpperCase() + clearanceStatus.status.slice(1)}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Date Approved:</span>
                <span className="text-sm">{new Date(clearanceStatus.dateApproved).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}</span>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <span className="text-sm font-medium">LGA:</span>
                  <p className="text-sm">{clearanceStatus.lga}</p>
                  <p className="text-sm text-muted-foreground">{clearanceStatus.state}</p>
                </div>
              </div>

              <div>
                <span className="text-sm font-medium">Cleared By:</span>
                <p className="text-sm">{clearanceStatus.clearedBy}</p>
                <p className="text-sm text-muted-foreground">{clearanceStatus.designation}</p>
              </div>
            </div>

            <Button className="w-full bg-nysc-primary hover:bg-nysc-dark">
              <Download className="mr-2 h-4 w-4" />
              Download Clearance Certificate
            </Button>
          </CardContent>
        </Card>

        {/* Clearance Details */}
        <Card>
          <CardHeader>
            <CardTitle>Clearance Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Coordinator's Remarks</h4>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm">{clearanceStatus.remarks}</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Clearance Requirements Completed</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Community Development Service (CDS)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Monthly Clearance Forms</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">LGA Registration</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Final Assessment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Documentation Submission</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Important Information */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Important Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-nysc-primary">Next Steps</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-nysc-primary">•</span>
                  Download your clearance certificate for records
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-nysc-primary">•</span>
                  Proceed with state clearance if not completed
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-nysc-primary">•</span>
                  Prepare for final documentation and discharge
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-nysc-primary">•</span>
                  Keep all clearance documents safe
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-nysc-primary">Contact Information</h4>
              <div className="text-sm space-y-2">
                <p><strong>LGA Office:</strong> +234-1-7031234</p>
                <p><strong>Email:</strong> ikeja@nysc.gov.ng</p>
                <p><strong>Office Hours:</strong> Mon-Fri, 8:00 AM - 4:00 PM</p>
                <p><strong>Location:</strong> NYSC LGA Office, Ikeja</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}