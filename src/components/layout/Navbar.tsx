import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, GraduationCap, Bell, Calendar, Users, BookOpen, Phone, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import DarkModeToggle from './DarkModeToggle';

const navigation = [
  { name: 'About Us', href: '#about', icon: Users },
  { name: 'Academics', href: '#academics', icon: BookOpen },
  { name: 'Admissions', href: '#admissions', icon: GraduationCap },
  { name: 'Events', href: '#events', icon: Calendar },
  { name: 'News', href: '#news', icon: Bell },
  { name: 'Contact', href: '#contact', icon: Phone },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50 dark:bg-gray-900">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5 flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-blue-600 bg-clip-text text-transparent">
              OAV H. Katapali
            </span>
          </a>
        </div>
        
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 flex items-center gap-1 transition-colors dark:text-gray-200"
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <div className="flex items-center gap-4">
            <DarkModeToggle />
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-700">Welcome, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm font-semibold leading-6 text-white bg-blue-600 px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-sm font-semibold leading-6 text-white bg-blue-600 px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                Log in
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`lg:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 z-50">
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 flex items-center gap-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}