
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Calendar, Users, LogOut, User } from 'lucide-react';

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const quizCategories = [
    {
      id: 1,
      title: "History & Geography",
      description: "Test your knowledge of world history and geography",
      questions: 500,
      completed: 45,
      color: "from-blue-500 to-cyan-500",
      icon: "🌍"
    },
    {
      id: 2,
      title: "Science & Technology",
      description: "Explore the wonders of science and modern technology",
      questions: 400,
      completed: 32,
      color: "from-green-500 to-emerald-500",
      icon: "🔬"
    },
    {
      id: 3,
      title: "Sports & Entertainment",
      description: "Fun facts about sports, movies, and entertainment",
      questions: 350,
      completed: 28,
      color: "from-purple-500 to-violet-500",
      icon: "⚽"
    },
    {
      id: 4,
      title: "Literature & Arts",
      description: "Dive into the world of literature and fine arts",
      questions: 300,
      completed: 15,
      color: "from-orange-500 to-red-500",
      icon: "📚"
    },
    {
      id: 5,
      title: "Current Affairs",
      description: "Stay updated with recent events and developments",
      questions: 250,
      completed: 8,
      color: "from-pink-500 to-rose-500",
      icon: "📰"
    },
    {
      id: 6,
      title: "Mixed Topics",
      description: "Random questions from all categories for practice",
      questions: 200,
      completed: 22,
      color: "from-indigo-500 to-purple-500",
      icon: "🎯"
    }
  ];

  const totalQuestions = quizCategories.reduce((sum, cat) => sum + cat.questions, 0);
  const totalCompleted = quizCategories.reduce((sum, cat) => sum + cat.completed, 0);
  const overallProgress = (totalCompleted / totalQuestions) * 100;

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                QuizMaster
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-500" />
                <span className="text-gray-700 font-medium">{user.name}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}! 👋
          </h2>
          <p className="text-gray-600 text-lg">
            Continue your learning journey and master general knowledge
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total Questions</p>
                  <p className="text-3xl font-bold">{totalQuestions}</p>
                </div>
                <BookOpen className="h-12 w-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Completed</p>
                  <p className="text-3xl font-bold">{totalCompleted}</p>
                </div>
                <Calendar className="h-12 w-12 text-green-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-purple-500 to-violet-500 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Progress</p>
                  <p className="text-3xl font-bold">{overallProgress.toFixed(1)}%</p>
                </div>
                <Users className="h-12 w-12 text-purple-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Categories</p>
                  <p className="text-3xl font-bold">{quizCategories.length}</p>
                </div>
                <BookOpen className="h-12 w-12 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Overall Progress */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Overall Progress</CardTitle>
            <CardDescription>Your learning journey across all categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Questions Answered: {totalCompleted} / {totalQuestions}</span>
                <span>{overallProgress.toFixed(1)}%</span>
              </div>
              <Progress value={overallProgress} className="h-3" />
            </div>
          </CardContent>
        </Card>

        {/* Quiz Categories */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900">Quiz Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizCategories.map((category) => {
              const progress = (category.completed / category.questions) * 100;
              return (
                <Card key={category.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center text-2xl`}>
                        {category.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                          {category.title}
                        </CardTitle>
                        <CardDescription>{category.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{category.completed} / {category.questions} completed</span>
                      <span>{progress.toFixed(1)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <Button 
                      className={`w-full bg-gradient-to-r ${category.color} hover:opacity-90 transition-all duration-300`}
                      onClick={() => navigate(`/quiz/${category.id}`)}
                    >
                      Start Quiz
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
