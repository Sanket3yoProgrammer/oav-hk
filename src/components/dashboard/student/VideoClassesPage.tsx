import { useState } from 'react';
import { Video, Calendar, Clock, Users, ExternalLink, Search } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

interface VideoClass {
  id: string;
  subject: string;
  topic: string;
  teacher: string;
  date: string;
  time: string;
  duration: string;
  link: string;
  participants: number;
  status: 'upcoming' | 'live' | 'completed';
}

export default function VideoClassesPage() {
  const { darkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const classes: VideoClass[] = [
    {
      id: '1',
      subject: 'Mathematics',
      topic: 'Quadratic Equations',
      teacher: 'Mrs. Chinmayee Bag',
      date: '2024-03-20',
      time: '10:00 AM',
      duration: '1 hour',
      link: 'https://meet.google.com/abc-defg-hij',
      participants: 25,
      status: 'upcoming'
    },
    // Add more classes
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'text-red-500 bg-red-100 dark:bg-red-900 dark:text-red-300';
      case 'upcoming':
        return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      case 'completed':
        return 'text-green-500 bg-green-100 dark:bg-green-900 dark:text-green-300';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className={`p-6 rounded-lg ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      } shadow-sm`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Video className={`h-6 w-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Video Classes
            </h1>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          <input
            type="text"
            placeholder="Search classes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full px-4 py-2 rounded-md border ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'bg-white border-gray-300 text-gray-900'
            } focus:ring-blue-500 focus:border-blue-500`}
          />

          <div className="flex gap-2">
            {['all', 'live', 'upcoming', 'completed'].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 rounded-md text-sm font-medium capitalize ${
                  selectedStatus === status
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                    : darkMode
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {classes.map((videoClass) => (
          <div
            key={videoClass.id}
            className={`p-6 rounded-lg ${
              darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
            } shadow-sm transition-all duration-200`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {videoClass.subject}
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {videoClass.topic}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(videoClass.status)}`}>
                {videoClass.status}
              </span>
            </div>

            <div className="mt-4 space-y-2">
              <div className={`flex items-center gap-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <Users className="h-4 w-4" />
                <span>Teacher: {videoClass.teacher}</span>
              </div>
              <div className={`flex items-center gap-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <Calendar className="h-4 w-4" />
                <span>{new Date(videoClass.date).toLocaleDateString()}</span>
              </div>
              <div className={`flex items-center gap-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <Clock className="h-4 w-4" />
                <span>{videoClass.time} ({videoClass.duration})</span>
              </div>
            </div>

            <a
              href={videoClass.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-4 flex items-center justify-center gap-2 w-full px-4 py-2 rounded-md ${
                videoClass.status === 'live'
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              } transition-colors duration-200`}
            >
              <ExternalLink className="h-4 w-4" />
              {videoClass.status === 'live' ? 'Join Now' : 'View Details'}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}