'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuthStore } from '@/lib/store';
import { BookOpen, Send, CheckCircle } from 'lucide-react';

const correctionSchema = z.object({
  requestType: z.string().min(1, 'Please select a request type'),
  course: z.string().min(1, 'Course is required'),
  classOfDegree: z.string().min(1, 'Class of degree is required'),
  qualification: z.string().min(1, 'Qualification is required'),
  reason: z.string().min(10, 'Please provide a detailed reason (minimum 10 characters)')
});

type CorrectionFormData = z.infer<typeof correctionSchema>;

export default function CourseCorrectionPage() {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user, updateUser } = useAuthStore();

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<CorrectionFormData>({
    resolver: zodResolver(correctionSchema),
    defaultValues: {
      course: user?.course || '',
      qualification: user?.qualification || ''
    }
  });

  const onSubmit = async (data: CorrectionFormData) => {
    setIsLoading(true);
    setMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update user data if it's a course correction
      if (data.requestType === 'course') {
        updateUser({ 
          course: data.course,
          qualification: data.qualification 
        });
      }
      
      setMessage('Your correction request has been submitted successfully! You will receive an update via email.');
      reset();
    } catch (err) {
      setMessage('Failed to submit request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Course Correction</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Request correction or rearrangement of your academic details
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-nysc-primary" />
            Correction Request Form
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="requestType">Request Type</Label>
              <Select onValueChange={(value) => setValue('requestType', value)}>
                <SelectTrigger className={errors.requestType ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Select correction type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name Correction</SelectItem>
                  <SelectItem value="course">Course Correction</SelectItem>
                  <SelectItem value="qualification">Qualification Correction</SelectItem>
                  <SelectItem value="institution">Institution Correction</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.requestType && (
                <p className="text-sm text-destructive">{errors.requestType.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="course">Course of Study</Label>
              <Input
                id="course"
                placeholder="Enter correct course name"
                {...register('course')}
                className={errors.course ? 'border-destructive' : ''}
              />
              {errors.course && (
                <p className="text-sm text-destructive">{errors.course.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="classOfDegree">Class of Degree</Label>
              <Select onValueChange={(value) => setValue('classOfDegree', value)}>
                <SelectTrigger className={errors.classOfDegree ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Select class of degree" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="first-class">First Class Honours</SelectItem>
                  <SelectItem value="second-upper">Second Class Honours (Upper Division)</SelectItem>
                  <SelectItem value="second-lower">Second Class Honours (Lower Division)</SelectItem>
                  <SelectItem value="third-class">Third Class Honours</SelectItem>
                  <SelectItem value="pass">Pass</SelectItem>
                  <SelectItem value="distinction">Distinction</SelectItem>
                  <SelectItem value="credit">Credit</SelectItem>
                  <SelectItem value="merit">Merit</SelectItem>
                </SelectContent>
              </Select>
              {errors.classOfDegree && (
                <p className="text-sm text-destructive">{errors.classOfDegree.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="qualification">Qualification</Label>
              <Select onValueChange={(value) => setValue('qualification', value)}>
                <SelectTrigger className={errors.qualification ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Select qualification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="B.Sc">B.Sc (Bachelor of Science)</SelectItem>
                  <SelectItem value="B.A">B.A (Bachelor of Arts)</SelectItem>
                  <SelectItem value="B.Eng">B.Eng (Bachelor of Engineering)</SelectItem>
                  <SelectItem value="B.Tech">B.Tech (Bachelor of Technology)</SelectItem>
                  <SelectItem value="B.Ed">B.Ed (Bachelor of Education)</SelectItem>
                  <SelectItem value="B.Com">B.Com (Bachelor of Commerce)</SelectItem>
                  <SelectItem value="LLB">LLB (Bachelor of Laws)</SelectItem>
                  <SelectItem value="HND">HND (Higher National Diploma)</SelectItem>
                  <SelectItem value="NCE">NCE (Nigeria Certificate in Education)</SelectItem>
                  <SelectItem value="OND">OND (Ordinary National Diploma)</SelectItem>
                </SelectContent>
              </Select>
              {errors.qualification && (
                <p className="text-sm text-destructive">{errors.qualification.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Correction</Label>
              <Textarea
                id="reason"
                placeholder="Please provide detailed explanation for the correction request..."
                rows={4}
                {...register('reason')}
                className={errors.reason ? 'border-destructive' : ''}
              />
              {errors.reason && (
                <p className="text-sm text-destructive">{errors.reason.message}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Provide supporting documents and clear explanation for faster processing
              </p>
            </div>

            {message && (
              <Alert className={message.includes('successfully') ? 'border-green-500 bg-green-50 dark:bg-green-950' : 'border-destructive bg-destructive/10'}>
                {message.includes('successfully') && <CheckCircle className="h-4 w-4 text-green-600" />}
                <AlertDescription className={message.includes('successfully') ? 'text-green-700 dark:text-green-400' : ''}>
                  {message}
                </AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit" 
              className="w-full bg-nysc-primary hover:bg-nysc-dark"
              disabled={isLoading}
            >
              <Send className="mr-2 h-4 w-4" />
              {isLoading ? 'Submitting Request...' : 'Send Request'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}