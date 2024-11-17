import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useTheme } from '../../../context/ThemeContext';
import { 
  Newspaper, Search, Filter, Calendar, Clock, 
  ThumbsUp, MessageCircle, Share2, Edit, Trash2,
  BookmarkPlus, MoreVertical 
} from 'lucide-react';

interface NewsArticle {
  id: string;
  title: string;
  content: string;
  summary: string;
  category: string;
  author: {
    name: string;
    role: 'teacher' | 'admin';
    avatar?: string;
  };
  date: string;
  image?: string;
  likes: number;
  comments: Comment[];
  tags: string[];
  featured: boolean;
}

interface Comment {
  id: string;
  author: {
    name: string;
    role: 'teacher' | 'student';
    avatar?: string;
  };
  content: string;
  date: string;
}

export default function NewsPage() {
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [newArticle, setNewArticle] = useState({
    title: '',
    content: '',
    summary: '',
    category: '',
    tags: '',
    image: null as File | null,
    featured: false
  });

  const categories = [
    'all',
    'academic',
    'sports',
    'cultural',
    'announcements',
    'achievements'
  ];

  const newsArticles: NewsArticle[] = [
    {
      id: '1',
      title: 'School Wins Block Level Science Competition',
      content: 'Our school\'s science team has won second place in the Block Level Science Competition...',
      summary: 'School achieves remarkable victory in block level competition',
      category: 'achievements',
      author: {
        name: 'Principal Sujata Barik',
        role: 'admin'
      },
      date: '2024-11-11',
      image: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&q=80',
      likes: 45,
      comments: [],
      tags: ['science', 'competition', 'achievement'],
      featured: true
    },
    // Add more articles
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`p-6 rounded-lg ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      } shadow-sm`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Newspaper className={`h-6 w-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              School News
            </h1>
          </div>
          {user?.role === 'teacher' && (
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Post News
            </button>
          )}
        </div>

        {/* Search and Filters */}
        <div className="mt-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 border rounded-md ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:ring-blue-500 focus:border-blue-500`}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-md text-sm font-medium capitalize whitespace-nowrap ${
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

      {/* Featured News */}
      {newsArticles.find(article => article.featured) && (
        <div className={`rounded-lg overflow-hidden ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        } shadow-sm`}>
          {newsArticles
            .filter(article => article.featured)
            .map(article => (
              <div key={article.id} className="relative">
                {article.image && (
                  <div className="relative h-96">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <span className="px-3 py-1 bg-blue-600 rounded-full text-sm font-medium">
                        Featured
                      </span>
                      <h2 className="mt-2 text-3xl font-bold">{article.title}</h2>
                      <p className="mt-2 text-lg text-gray-200">{article.summary}</p>
                      <div className="mt-4 flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-5 w-5" />
                          {new Date(article.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{article.author.name}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      )}

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsArticles
          .filter(article => 
            !article.featured &&
            (selectedCategory === 'all' || article.category === selectedCategory) &&
            (article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             article.content.toLowerCase().includes(searchQuery.toLowerCase()))
          )
          .map((article) => (
            <div
              key={article.id}
              className={`rounded-lg overflow-hidden ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              } shadow-sm hover:shadow-md transition-all duration-200`}
            >
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                      darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {article.category}
                    </span>
                    <h3 className={`mt-2 text-xl font-semibold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {article.title}
                    </h3>
                  </div>
                  {user?.role === 'teacher' && (
                    <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                      <MoreVertical className="h-5 w-5 text-gray-500" />
                    </button>
                  )}
                </div>

                <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {article.summary}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500">
                      <ThumbsUp className="h-5 w-5" />
                      <span>{article.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500">
                      <MessageCircle className="h-5 w-5" />
                      <span>{article.comments.length}</span>
                    </button>
                    <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500">
                      <BookmarkPlus className="h-5 w-5" />
                    </button>
                  </div>
                  <button
                    onClick={() => setSelectedArticle(article)}
                    className={`text-sm font-medium ${
                      darkMode ? 'text-blue-400' : 'text-blue-600'
                    } hover:underline`}
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Add News Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`max-w-2xl w-full rounded-lg ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } p-6`}>
            <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Post News Article
            </h2>
            <div className="space-y-4">
              {/* Form fields */}
              <div>
                <label className={`block text-sm font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                } mb-1`}>
                  Title
                </label>
                <input
                  type="text"
                  value={newArticle.title}
                  onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                  className={`w-full p-2 border rounded-md ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
              {/* Add more form fields */}
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowAddModal(false)}
                  className={`px-4 py-2 rounded-md ${
                    darkMode
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle news post submission
                    setShowAddModal(false);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          {/* Add detailed article view */}
        </div>
      )}
    </div>
  );
}