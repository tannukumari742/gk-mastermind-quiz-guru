
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { User, BookOpen, Users } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords don't match",
        variant: "destructive",
      });
      return;
    }

    // Simple validation for demo
    localStorage.setItem('user', JSON.stringify({ email, name }));
    toast({
      title: "Account Created!",
      description: "Welcome to QuizMaster! Let's start learning.",
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex items-center justify-center gap-12">
        {/* Left side - Brand and Features */}
        <div className="hidden lg:flex flex-col space-y-8 flex-1">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              QuizMaster
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Join thousands of learners mastering General Knowledge through interactive quizzes
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4 p-4 bg-white/50 backdrop-blur-sm rounded-xl">
              <div className="p-3 bg-purple-100 rounded-full">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">2000+ Questions</h3>
                <p className="text-gray-600">Comprehensive General Knowledge database</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-white/50 backdrop-blur-sm rounded-xl">
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Smart Learning</h3>
                <p className="text-gray-600">Adaptive difficulty based on your progress</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Signup Form */}
        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-2 text-center">
            <div className="mx-auto p-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full w-fit">
              <User className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
            <CardDescription>Start your learning journey today</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="h-12"
                />
              </div>
              <Button type="submit" className="w-full h-12 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-300">
                Create Account
              </Button>
            </form>
            
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-purple-600 hover:text-purple-700 font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
