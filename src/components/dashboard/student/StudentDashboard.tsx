import { Calendar, Book, Bell, Users, Video, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useTheme } from '../../../context/ThemeContext';

const quickLinks = [
  { name: 'Academics', icon: Book, href: '/dashboard/academics', color: 'bg-blue-500' },
  { name: 'Announcements', icon: Bell, href: '/dashboard/announcements', color: 'bg-yellow-500' },
  { name: 'Live Classes', icon: Video, href: '/dashboard/classes', color: 'bg-purple-500' },
  { name: 'Q&A Forum', icon: HelpCircle, href: '/dashboard/qna', color: 'bg-green-500' },
  { name: 'Events', icon: Calendar, href: '/dashboard/events', color: 'bg-pink-500' },
  { name: 'Faculty', icon: Users, href: '/dashboard/faculty', color: 'bg-orange-500' },
];

export default function StudentDashboard() {
  const { user, isLoading } = useAuth();
  const { darkMode } = useTheme();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Please log in to view your dashboard</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg p-6 sm:p-8">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center">
            <span className="text-2xl font-bold text-blue-600">
              {user?.name?.[0].toUpperCase()}
            </span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-blue-100">Have a great day of learning ahead.</p>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickLinks.map((link) => (
          <Link
            key={link.name}
            to={link.href}
            className={`group p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 
              ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'}`}
          >
            <div className="flex items-center gap-4">
              <div className={`${link.color} p-3 rounded-lg text-white`}>
                <link.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className={`font-semibold group-hover:text-blue-600 
                  ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {link.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className={`rounded-lg shadow-sm p-6 
        ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>

        <h2 className={`text-lg font-semibold mb-4 
            ${darkMode ? 'text-white' : 'text-gray-900'}`}>Recent Activity</h2>
        <div className="space-y-4">
          {/* Add recent activities here */}
          <div className="flex items-center gap-4 p-3 rounded-lg">
            <div className="bg-blue-100 p-2 rounded-full">
              <Book className="h-5 w-5 text-blue-600" />
            </div>
            <div>
            <p className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>New assignment posted in Mathematics</p>
            <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>2 hours ago</p>
            </div>
          </div>
          {/* Add more activities */}
        </div>
      </div>
    </div>
  );
}