
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { BookOpen, Users, LogIn } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation for demo
    if (email && password) {
      localStorage.setItem('user', JSON.stringify({ email, name: email.split('@')[0] }));
      toast({
        title: "Login Successful!",
        description: "Welcome back to QuizMaster!",
      });
      navigate('/dashboard');
    } else {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex items-center justify-center gap-12">
        {/* Left side - Brand and Features */}
        <div className="hidden lg:flex flex-col space-y-8 flex-1">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              QuizMaster
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Master 2000+ General Knowledge Questions with our Interactive Learning Platform
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4 p-4 bg-white/50 backdrop-blur-sm rounded-xl">
              <div className="p-3 bg-blue-100 rounded-full">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Interactive Learning</h3>
                <p className="text-gray-600">Engaging quizzes with instant feedback</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-white/50 backdrop-blur-sm rounded-xl">
              <div className="p-3 bg-purple-100 rounded-full">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Progress Tracking</h3>
                <p className="text-gray-600">Monitor your learning journey</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-2 text-center">
            <div className="mx-auto p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-fit">
              <LogIn className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription>Sign in to continue your learning journey</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
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
                  placeholder="Enter your password"
                  className="h-12"
                />
              </div>
              <Button type="submit" className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300">
                Sign In
              </Button>
            </form>
            
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
