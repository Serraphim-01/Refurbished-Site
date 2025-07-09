'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, CreditCard, Calendar, DollarSign, CheckCircle, Clock, XCircle } from 'lucide-react';
import { paymentStatuses } from '@/lib/data';

const searchSchema = z.object({
  searchTerm: z.string().min(1, 'Please enter transaction ID or email')
});

type SearchFormData = z.infer<typeof searchSchema>;

export default function PaymentStatusPage() {
  const [searchResults, setSearchResults] = useState<typeof paymentStatuses>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema)
  });

  const onSubmit = async (data: SearchFormData) => {
    setIsSearching(true);
    setHasSearched(true);

    // Simulate API search
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Filter dummy data based on search term
    const results = paymentStatuses.filter(payment => 
      payment.id.toLowerCase().includes(data.searchTerm.toLowerCase()) ||
      payment.email.toLowerCase().includes(data.searchTerm.toLowerCase())
    );

    setSearchResults(results);
    setIsSearching(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Payment Status</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Check the status of your transactions and payments
        </p>
      </div>

      {/* Search Form */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-nysc-primary" />
            Transaction Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="searchTerm">Transaction ID or Email Address</Label>
              <div className="flex gap-2">
                <Input
                  id="searchTerm"
                  placeholder="Enter transaction ID or email address"
                  {...register('searchTerm')}
                  className={`flex-1 ${errors.searchTerm ? 'border-destructive' : ''}`}
                />
                <Button 
                  type="submit" 
                  className="bg-nysc-primary hover:bg-nysc-dark"
                  disabled={isSearching}
                >
                  <Search className="mr-2 h-4 w-4" />
                  {isSearching ? 'Searching...' : 'Search'}
                </Button>
              </div>
              {errors.searchTerm && (
                <p className="text-sm text-destructive">{errors.searchTerm.message}</p>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Search Results */}
      {hasSearched && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-nysc-primary" />
              Transaction Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            {searchResults.length === 0 ? (
              <div className="text-center py-8">
                <CreditCard className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No transactions found</h3>
                <p className="text-muted-foreground">
                  No transactions match your search criteria. Please check the transaction ID or email address and try again.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {searchResults.map((payment) => (
                  <div key={payment.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">{payment.id}</span>
                          <Badge className={getStatusColor(payment.status)}>
                            {getStatusIcon(payment.status)}
                            <span className="ml-1 capitalize">{payment.status}</span>
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{payment.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          ₦{payment.amount}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Date:</span>
                        <span>{new Date(payment.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Email:</span>
                        <span>{payment.email}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Demo Data Notice */}
      {!hasSearched && (
        <Card>
          <CardHeader>
            <CardTitle>Demo Transaction Data</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Try searching with these demo transaction IDs or email:
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span className="font-mono">TXN123456789</span>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Completed
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span className="font-mono">TXN987654321</span>
                <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                  Pending
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span className="font-mono">user@example.com</span>
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  Email Search
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}