import { useState } from 'react';
import { Bell, AlertCircle, Pin, Calendar, Search } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  important: boolean;
  pinned: boolean;
  author: string;
}

export default function AnnouncementsPage() {
  const { darkMode } = useTheme();
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const announcements: Announcement[] = [
    {
      id: '1',
      title: 'Annual Sports Day',
      content: 'Annual Sports Day will be held on March 25th. All students must register by March 20th.',
      date: '2024-03-15',
      important: true,
      pinned: true,
      author: 'Principal'
    },
    // Add more announcements
  ];

  const filteredAnnouncements = announcements.filter(announcement => {
    if (filter === 'important' && !announcement.important) return false;
    if (filter === 'pinned' && !announcement.pinned) return false;
    if (searchQuery && !announcement.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`rounded-lg shadow-sm p-6 ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className={`h-6 w-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Announcements
            </h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                filter === 'all' 
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                  : darkMode
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('important')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                filter === 'important'
                  ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300'
                  : darkMode
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Important
            </button>
            <button
              onClick={() => setFilter('pinned')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                filter === 'pinned'
                  ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300'
                  : darkMode
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Pinned
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search announcements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 border rounded-md ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:ring-blue-500 focus:border-blue-500`}
            />
          </div>
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.map((announcement) => (
          <div
            key={announcement.id}
            className={`rounded-lg shadow-sm p-6 transition-all duration-200 hover:shadow-md ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  {announcement.important && (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                  {announcement.pinned && (
                    <Pin className="h-5 w-5 text-yellow-500" />
                  )}
                  <h2 className={`text-lg font-semibold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {announcement.title}
                  </h2>
                </div>
                <div className={`mt-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {announcement.content}
                </div>
                <div className={`mt-4 flex items-center gap-4 text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(announcement.date).toLocaleDateString()}
                  </div>
                  <div>Posted by: {announcement.author}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}