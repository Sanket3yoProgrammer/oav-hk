import { useState } from 'react';
import { Newspaper, Search, ThumbsUp, MessageCircle, BookmarkPlus, User, Calendar } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image?: string;
  likes: number;
  comments: { id: string; text: string; }[];
  featured?: boolean;
}

export default function NewsPage() {
  const { darkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  // Sample news data
  const newsArticles: NewsArticle[] = [
    {
      id: '1',
      title: 'School Wins State Championship',
      summary: 'Our school cricket team emerges victorious in the state finals.',
      content: 'Detailed content about the victory...',
      author: 'Sports Department',
      date: '2024-03-15',
      category: 'sports',
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3',
      likes: 45,
      comments: [],
      featured: true
    },
    {
      id: '2',
      title: 'New Science Lab Inauguration',
      summary: 'State-of-the-art science laboratory opened for students.',
      content: 'Details about the new lab facilities...',
      author: 'Science Department',
      date: '2024-03-14',
      category: 'academic',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3',
      likes: 32,
      comments: []
    },
    // Add more news articles as needed
  ];

  const categories = ['all', 'academic', 'sports', 'cultural', 'announcements'];

  const filteredNews = newsArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header Section */}
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
      {filteredNews.find(article => article.featured) && (
        <div className={`rounded-lg overflow-hidden shadow-sm ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="aspect-video w-full">
            <img
              src={filteredNews.find(article => article.featured)?.image}
              alt="Featured news"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                darkMode 
                  ? 'bg-blue-900 text-blue-300'
                  : 'bg-blue-100 text-blue-600'
              }`}>
                Featured
              </span>
            </div>
            <h2 className={`text-2xl font-bold mb-2 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {filteredNews.find(article => article.featured)?.title}
            </h2>
            <p className={`mb-4 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {filteredNews.find(article => article.featured)?.summary}
            </p>
            <div className={`flex items-center gap-4 text-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{filteredNews.find(article => article.featured)?.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(filteredNews.find(article => article.featured)?.date || '').toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.filter(article => !article.featured).map((article) => (
          <div
            key={article.id}
            className={`rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            {article.image && (
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                  darkMode 
                    ? 'bg-blue-900 text-blue-300'
                    : 'bg-blue-100 text-blue-600'
                }`}>
                  {article.category}
                </span>
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {article.title}
              </h3>
              <p className={`text-sm mb-4 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {article.summary}
              </p>
              <div className={`flex items-center gap-4 text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(article.date).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button className={`flex items-center gap-1 ${
                    darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-500'
                  }`}>
                    <ThumbsUp className="h-5 w-5" />
                    <span>{article.likes}</span>
                  </button>
                  <button className={`flex items-center gap-1 ${
                    darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-500'
                  }`}>
                    <MessageCircle className="h-5 w-5" />
                    <span>{article.comments.length}</span>
                  </button>
                  <button className={`flex items-center gap-1 ${
                    darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-500'
                  }`}>
                    <BookmarkPlus className="h-5 w-5" />
                  </button>
                </div>
                <button
                  onClick={() => setSelectedArticle(article)}
                  className={`text-sm font-medium ${
                    darkMode 
                      ? 'text-blue-400 hover:text-blue-300'
                      : 'text-blue-600 hover:text-blue-500'
                  }`}
                >
                  Read More →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredNews.length === 0 && (
        <div className={`text-center py-12 ${
          darkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <Newspaper className="mx-auto h-12 w-12 mb-4" />
          <h3 className={`text-lg font-medium mb-2 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            No News Found
          </h3>
          <p>There are no news articles matching your criteria.</p>
        </div>
      )}
    </div>
  );
} 