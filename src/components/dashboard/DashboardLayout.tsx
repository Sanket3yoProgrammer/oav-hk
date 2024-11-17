import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, X, Home, Book, Bell, Calendar, Newspaper,
  Users, Video, HelpCircle, Image, LogOut, Settings,
  Sun, Moon, ChevronRight, User
} from 'lucide-react';
import toast from 'react-hot-toast';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

interface NavItem {
  name: string;
  icon: any;
  href: string;
}

const studentNavItems: NavItem[] = [
  { name: 'Home', icon: Home, href: '/dashboard' },
  { name: 'Academics', icon: Book, href: '/dashboard/academics' },
  { name: 'Announcements', icon: Bell, href: '/dashboard/announcements' },
  { name: 'Events', icon: Calendar, href: '/dashboard/events' },
  { name: 'News', icon: Newspaper, href: '/dashboard/news' },
  { name: 'Live Classes', icon: Video, href: '/dashboard/classes' },
  { name: 'Q&A Forum', icon: HelpCircle, href: '/dashboard/qna' },
  { name: 'Gallery', icon: Image, href: '/dashboard/gallery' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout, updateUserProfile } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    username: user?.name || '',
    // bio: user?.bio || '',
    bio: (user as any)?.bio || '',
  });
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const handleProfileUpdate = async () => {
    try {
      await updateUserProfile({
        username: profileData.username,
        bio: profileData.bio,
        updatedAt: new Date().toISOString()
      });
      setShowEditProfile(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Top Navigation */}
      <div className={`fixed top-0 left-0 right-0 z-30 ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      } shadow-sm`}>
        <div className="flex items-center justify-between px-4 h-16">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  {user?.name?.[0].toUpperCase()}
                </div>
                <span className="hidden sm:block">{user?.name}</span>
              </button>

              {showProfileMenu && (
                <div 
                  className={`absolute right-0 mt-2 w-80 rounded-lg shadow-lg ${
                    darkMode ? 'bg-gray-800' : 'bg-white'
                  } ring-1 ring-black ring-opacity-5 transform transition-all duration-200 ease-out`}
                >
                  {/* Profile Info Section */}
                  <div className="p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold">
                        {user?.name?.[0]?.toUpperCase() || '?'}
                      </div>
                      <div>
                        <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {user?.name || 'No name set'}
                        </h3>
                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {user?.role || 'Role not set'}
                        </span>
                      </div>
                    </div>

                    {/* Bio Section with Animation */}
                    <div className={`p-3 rounded-lg ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-50'
                    } transform transition-all duration-200 hover:scale-[1.02]`}>
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {user?.bio || 'No bio added yet'}
                      </p>
                    </div>

                    {/* Last Updated Info */}
                    <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      Last updated: {user?.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : 'Never'}
                    </div>

                    {/* Divider */}
                    <div className={`h-px ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />

                    {/* Actions */}
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          setShowEditProfile(true);
                          setShowProfileMenu(false);
                        }}
                        className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg transition-colors duration-200 
                          ${darkMode 
                            ? 'hover:bg-gray-700 text-white' 
                            : 'hover:bg-gray-50 text-gray-900'}`}
                      >
                        <User className="h-4 w-4" />
                        Edit Profile
                      </button>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-4 py-2 rounded-lg text-red-600 transition-colors duration-200 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } w-64 transition-transform duration-300 ease-in-out z-30 ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      } shadow-lg`}>
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-xl font-bold">Dashboard</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-1">
            {studentNavItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  location.pathname === item.href
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`max-w-md w-full rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6`}>
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Username</label>
                <input
                  type="text"
                  value={profileData.username}
                  onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                  className={`w-full p-2 border rounded-md ${
                    darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Bio</label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  className={`w-full p-2 border rounded-md ${
                    darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                  }`}
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowEditProfile(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleProfileUpdate}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="pt-16">
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}