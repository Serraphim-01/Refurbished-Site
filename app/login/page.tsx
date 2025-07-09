'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuthStore } from '@/lib/store';
import { Eye, EyeOff, ArrowLeft, Shield, Lock } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .regex(/[a-zA-Z]/, 'Password must contain at least one letter')
    .regex(/\d.*\d/, 'Password must contain at least two numbers')
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const { login } = useAuthStore();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError('');

    try {
      const success = await login(data.email, data.password);
      if (success) {
        router.push('/dashboard');
      } else {
        setError('Password must contain at least 1 letter, 2 numbers, and be 6+ characters long');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-nysc-primary/10 via-white to-nysc-light/10 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center mobile-padding">
      {/* Background Illustrations */}
      <div className="absolute inset-0 overflow-hidden opacity-5 dark:opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-nysc-primary rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-nysc-accent rounded-full animate-bounce-slow"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-nysc-light rounded-full animate-pulse-slow"></div>
        <Shield className="absolute top-10 right-1/4 h-20 w-20 text-nysc-primary animate-pulse-slow" />
        <Lock className="absolute bottom-10 left-1/3 h-16 w-16 text-nysc-accent animate-bounce-slow" />
      </div>
      
      <div className={`w-full max-w-md space-y-4 sm:space-y-6 relative z-10 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
        <div className="text-center">
          <Link href="/" className="inline-flex items-center text-nysc-primary hover:text-nysc-dark mb-3 sm:mb-4 smooth-transition hover-scale text-sm sm:text-base">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          
          <div className={`mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-nysc-primary rounded-full flex items-center justify-center shadow-lg mb-3 sm:mb-4 hover-scale smooth-transition ${isVisible ? 'animate-scaleIn animate-delay-200' : 'opacity-0'}`}>
            <span className="text-white font-bold text-lg sm:text-2xl">NYSC</span>
          </div>
          
          <h1 className={`text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white ${isVisible ? 'animate-fadeInUp animate-delay-300' : 'opacity-0'}`}>
            Welcome Back
          </h1>
          <p className={`text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2 ${isVisible ? 'animate-fadeInUp animate-delay-500' : 'opacity-0'}`}>
            Sign in to your NYSC account
          </p>
        </div>

        <Card className={`shadow-xl border-0 hover-lift smooth-transition ${isVisible ? 'animate-fadeInUp animate-delay-500' : 'opacity-0'}`}>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Login to Your Account</CardTitle>
            <CardDescription className="text-sm">
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register('email')}
                  className={`smooth-transition ${errors.email ? 'border-destructive' : ''}`}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    {...register('password')}
                    className={`smooth-transition ${errors.password ? 'border-destructive' : ''}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 smooth-transition"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password.message}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Password must contain at least 1 letter, 2 numbers, and be 6+ characters long
                </p>
              </div>

              {error && (
                <Alert variant="destructive" className="animate-slideInDown">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full bg-nysc-primary hover:bg-nysc-dark smooth-transition hover-scale"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-4 sm:mt-6 text-center">
              <p className="text-xs sm:text-sm text-muted-foreground">
                Demo credentials: Any email with a password containing 1 letter, 2 numbers, 6+ chars
              </p>
              <p className="text-xs text-muted-foreground mt-1 sm:mt-2">
                Example: test@example.com / password12
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}