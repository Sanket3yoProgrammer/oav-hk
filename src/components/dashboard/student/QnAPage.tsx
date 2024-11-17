import { useState } from 'react';
import { HelpCircle, Search, MessageCircle, ThumbsUp, Filter, Plus } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

interface Question {
  id: string;
  title: string;
  content: string;
  status: 'answered' | 'unanswered';
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  subject: string;
  likes: number;
  answers: any[]; // You can make this more specific based on your needs
}

export default function QnAPage() {
  const { darkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAskQuestion, setShowAskQuestion] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className={`p-6 rounded-lg ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      } shadow-sm`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HelpCircle className={`h-6 w-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Questions & Answers
            </h1>
          </div>
          <button
            onClick={() => setShowAskQuestion(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Ask Question
          </button>
        </div>

        {/* Search and Filters */}
        <div className="mt-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 border rounded-md ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:ring-blue-500 focus:border-blue-500`}
            />
          </div>
          <div className="flex gap-2">
            {['all', 'unanswered', 'answered', 'my questions'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-md text-sm font-medium capitalize ${
                  selectedCategory === category
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                    : darkMode
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {questions.map((question) => (
          <div
            key={question.id}
            className={`rounded-lg shadow-sm p-6 transition-all duration-200 hover:shadow-md ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className={`text-lg font-semibold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {question.title}
                  </h2>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    question.status === 'answered'
                      ? darkMode 
                        ? 'bg-green-900 text-green-300'
                        : 'bg-green-100 text-green-600'
                      : darkMode
                        ? 'bg-yellow-900 text-yellow-300'
                        : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {question.status}
                  </span>
                </div>
                <p className={`mt-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {question.content}
                </p>
                <div className={`mt-4 flex items-center gap-4 text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <div className="flex items-center gap-2">
                    <img
                      src={question.author.avatar}
                      alt={question.author.name}
                      className="h-6 w-6 rounded-full"
                    />
                    <span>{question.author.name}</span>
                  </div>
                  <span>•</span>
                  <span>{new Date(question.date).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{question.subject}</span>
                </div>
                <div className="mt-4 flex items-center gap-4">
                  <button className={`flex items-center gap-1 ${
                    darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-500'
                  }`}>
                    <ThumbsUp className="h-5 w-5" />
                    <span>{question.likes}</span>
                  </button>
                  <button className={`flex items-center gap-1 ${
                    darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-500'
                  }`}>
                    <MessageCircle className="h-5 w-5" />
                    <span>{question.answers.length} answers</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {questions.length === 0 && (
        <div className={`text-center py-12 ${
          darkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <HelpCircle className="mx-auto h-12 w-12 mb-4" />
          <h3 className={`text-lg font-medium mb-2 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            No Questions Found
          </h3>
          <p>There are no questions matching your criteria.</p>
        </div>
      )}

      {/* Ask Question Modal */}
      {showAskQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-2xl rounded-lg ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } p-6`}>
            <h2 className={`text-xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Ask a Question
            </h2>
            <form className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Title
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-2 border rounded-md ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="What's your question?"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Details
                </label>
                <textarea
                  rows={4}
                  className={`w-full px-4 py-2 border rounded-md ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Provide more details about your question..."
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAskQuestion(false)}
                  className={`px-4 py-2 rounded-md ${
                    darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Post Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 