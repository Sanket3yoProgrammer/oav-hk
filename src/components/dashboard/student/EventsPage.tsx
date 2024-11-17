import { useState } from 'react';
import { Calendar, Search, MapPin, Clock, Filter } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

// Define the Event type
interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image?: string;
}

export default function EventsPage() {
  const { darkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample events data
  const events: Event[] = [
    {
      id: '1',
      title: 'Annual Sports Day',
      description: 'Join us for a day of athletic competitions and team sports.',
      date: '2024-04-15',
      time: '9:00 AM',
      location: 'School Sports Ground',
      category: 'sports',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3'
    },
    {
      id: '2',
      title: 'Science Exhibition',
      description: 'Students showcase their innovative science projects.',
      date: '2024-04-20',
      time: '10:00 AM',
      location: 'School Auditorium',
      category: 'academic',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3'
    },
    {
      id: '3',
      title: 'Cultural Festival',
      description: 'A celebration of art, music, and dance performances.',
      date: '2024-04-25',
      time: '5:00 PM',
      location: 'School Amphitheater',
      category: 'cultural',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3'
    },
    {
      id: '4',
      title: 'Parent-Teacher Meeting',
      description: 'Discuss student progress and academic performance.',
      date: '2024-04-30',
      time: '2:00 PM',
      location: 'Classrooms',
      category: 'academic'
    }
  ];

  // Filter events based on search and category
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
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
            <Calendar className={`h-6 w-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              School Events
            </h1>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mt-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
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
            {['all', 'academic', 'cultural', 'sports'].map((category) => (
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

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className={`rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            {event.image && (
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  darkMode 
                    ? 'bg-blue-900 text-blue-300'
                    : 'bg-blue-100 text-blue-600'
                }`}>
                  {event.category}
                </span>
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {event.title}
              </h3>
              <p className={`text-sm mb-4 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {event.description}
              </p>
              <div className={`flex flex-col gap-2 text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  className={`text-sm font-medium ${
                    darkMode 
                      ? 'text-blue-400 hover:text-blue-300'
                      : 'text-blue-600 hover:text-blue-500'
                  }`}
                >
                  View Details →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <div className={`text-center py-12 ${
          darkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <Calendar className="mx-auto h-12 w-12 mb-4" />
          <h3 className={`text-lg font-medium mb-2 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            No Events Found
          </h3>
          <p>There are no events matching your criteria.</p>
        </div>
      )}
    </div>
  );
}