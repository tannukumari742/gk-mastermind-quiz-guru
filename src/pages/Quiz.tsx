
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Calendar, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const Quiz = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizStarted, setQuizStarted] = useState(false);

  // Sample questions for demo
  const sampleQuestions: Question[] = [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correct: 2,
      explanation: "Paris is the capital and largest city of France."
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correct: 1,
      explanation: "Mars is called the Red Planet due to its reddish appearance caused by iron oxide on its surface."
    },
    {
      id: 3,
      question: "Who painted the Mona Lisa?",
      options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
      correct: 2,
      explanation: "The Mona Lisa was painted by Leonardo da Vinci between 1503 and 1519."
    },
    {
      id: 4,
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Pacific Ocean", "Indian Ocean", "Arctic Ocean"],
      correct: 1,
      explanation: "The Pacific Ocean is the largest and deepest ocean on Earth."
    },
    {
      id: 5,
      question: "Which element has the chemical symbol 'O'?",
      options: ["Gold", "Oxygen", "Silver", "Carbon"],
      correct: 1,
      explanation: "Oxygen has the chemical symbol 'O' and is essential for life."
    }
  ];

  useEffect(() => {
    setQuestions(sampleQuestions);
  }, [categoryId]);

  useEffect(() => {
    if (quizStarted && timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleNextQuestion();
    }
  }, [timeLeft, quizStarted, showResult]);

  const startQuiz = () => {
    setQuizStarted(true);
    setTimeLeft(30);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1);
      toast({
        title: "Correct! 🎉",
        description: questions[currentQuestion].explanation,
      });
    } else {
      toast({
        title: "Incorrect",
        description: questions[currentQuestion].explanation,
        variant: "destructive",
      });
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setTimeLeft(30);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setTimeLeft(30);
    setQuizStarted(false);
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-blue-500 mx-auto mb-4 animate-pulse" />
          <h2 className="text-2xl font-bold text-gray-900">Loading Quiz...</h2>
        </div>
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-fit">
              <BookOpen className="h-12 w-12 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold">Ready to Start Quiz?</CardTitle>
            <p className="text-gray-600 text-lg">
              You're about to start a quiz with {questions.length} questions. Each question has a 30-second timer.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-blue-50 rounded-xl">
                <div className="text-2xl font-bold text-blue-600">{questions.length}</div>
                <div className="text-sm text-gray-600">Questions</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-xl">
                <div className="text-2xl font-bold text-purple-600">30s</div>
                <div className="text-sm text-gray-600">Per Question</div>
              </div>
              <div className="p-4 bg-green-50 rounded-xl">
                <div className="text-2xl font-bold text-green-600">Points</div>
                <div className="text-sm text-gray-600">For Correct</div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button 
                onClick={startQuiz}
                className="flex-1 h-12 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-lg"
              >
                Start Quiz
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/dashboard')}
                className="h-12 px-8"
              >
                Back to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showResult) {
    const percentage = (score / questions.length) * 100;
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto p-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full w-fit">
              <Calendar className="h-12 w-12 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold">Quiz Completed! 🎉</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {score}/{questions.length}
              </div>
              <div className="text-xl text-gray-600">
                You scored {percentage.toFixed(1)}%
              </div>
              <Progress value={percentage} className="h-4" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-green-50 rounded-xl">
                <div className="text-2xl font-bold text-green-600">{score}</div>
                <div className="text-sm text-gray-600">Correct</div>
              </div>
              <div className="p-4 bg-red-50 rounded-xl">
                <div className="text-2xl font-bold text-red-600">{questions.length - score}</div>
                <div className="text-sm text-gray-600">Incorrect</div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button 
                onClick={restartQuiz}
                className="flex-1 h-12 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                Try Again
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/dashboard')}
                className="h-12 px-8"
              >
                Back to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Card className="mb-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Quiz in Progress</h1>
                  <p className="text-gray-600">Question {currentQuestion + 1} of {questions.length}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{timeLeft}s</div>
                <div className="text-sm text-gray-600">Time Left</div>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        {/* Question */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl leading-relaxed">
              {questions[currentQuestion].question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswer === index ? "default" : "outline"}
                className={`w-full p-6 text-left justify-start text-lg h-auto ${
                  selectedAnswer === index 
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white" 
                    : "hover:bg-gray-50"
                }`}
                onClick={() => handleAnswerSelect(index)}
              >
                <span className="mr-4 font-bold">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </Button>
            ))}
            
            <div className="pt-6">
              <Button
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
                className="w-full h-12 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 disabled:opacity-50"
              >
                {currentQuestion + 1 === questions.length ? 'Finish Quiz' : 'Next Question'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Quiz;
