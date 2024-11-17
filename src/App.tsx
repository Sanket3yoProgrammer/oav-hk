import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Hero from './components/home/Hero';
import AboutSection from './components/about/AboutSection';
import AcademicsSection from './components/academics/AcademicsSection';
import AdmissionsSection from './components/admissions/AdmissionsSection';
import EventsSection from './components/events/EventsSection';
import NewsSection from './components/news/NewsSection';
import ContactSection from './components/contact/ContactSection';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import Gallery from './components/gallery/Gallery';
import Achievements from './components/achievements/Achievements';
import AdminLayout from './components/layout/AdminLayout';
import AboutAdmin from './components/about/AboutAdmin';
import ProfileSetup from './components/auth/ProfileSetup';
import DashboardLayout from './components/dashboard/DashboardLayout';
import StudentDashboard from './components/dashboard/student/StudentDashboard';
import AcademicsPage from './components/dashboard/student/AcademicsPage';
import AnnouncementsPage from './components/dashboard/student/AnnouncementsPage';
import EventsPage from './components/dashboard/student/EventsPage';
import NewsPage from './components/dashboard/shared/NewsPage';
import VideoClassesPage from './components/dashboard/student/VideoClassesPage';
import QnAPage from './components/dashboard/student/QnAPage';
import GalleryPage from './components/dashboard/shared/GalleryPage';
import FacultyPage from './components/dashboard/student/FacultyPage';
function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const { darkMode } = useTheme();
  const hideNavbar = [
    '/login', 
    '/signup', 
    '/profile-setup',
    '/dashboard',
    '/dashboard/academics',
    '/dashboard/announcements',
    '/dashboard/events',
    '/dashboard/news',
    '/dashboard/classes',
    '/dashboard/qna',
    '/dashboard/gallery'
  ].some(path => location.pathname.startsWith(path));

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      {!hideNavbar && <Navbar />}
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={
          <main>
            <Hero />
            <AboutSection />
            <AcademicsSection />
            <AdmissionsSection />
            <EventsSection />
            <NewsSection />
            <ContactSection />
            <section className="relative h-[600px] w-full overflow-hidden">
              {/* Removed the overlay div that was blocking map interaction */}
              <iframe
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Odisha%20Adarsha%20Vidyalaya,%20H.Katapali,%20Jharsuguda,%20odisha+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                className="w-full h-full border-0 hover:scale-105 transition-transform duration-700"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                style={{ pointerEvents: "all" }}
              />
              <div className="absolute bottom-8 left-8 bg-white/90 dark:bg-gray-800/90 p-6 rounded-xl backdrop-blur-sm transform hover:-translate-y-2 transition-all duration-300 shadow-xl">
                <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text dark:text-white">
                  Visit Our Campus
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Odisha Adarsha Vidyalaya, H.Katapali<br />
                  NH-49, Jharsuguda, Odisha
                </p>
              </div>
            </section>
            <footer className="bg-gray-900 text-white py-16">
              <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="space-y-4 animate-fade-in">
                  <h4 className="text-xl font-bold">Contact Us</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 hover:text-primary-400 transition-colors">
                      <span>📧</span> info@school.edu
                    </li>
                    <li className="flex items-center gap-2 hover:text-primary-400 transition-colors">
                      <span>📞</span> (555) 123-4567
                    </li>
                  </ul>
                </div>
                <div className="space-y-4 animate-fade-in animation-delay-100">
                  <h4 className="text-xl font-bold">Quick Links</h4>
                  <ul className="space-y-2">
                    <li className="hover:text-primary-400 transition-colors">
                      <a href="#">Admissions</a>
                    </li>
                    <li className="hover:text-primary-400 transition-colors">
                      <a href="#">Programs</a>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4 animate-fade-in animation-delay-200">
                  <h4 className="text-xl font-bold">Follow Us</h4>
                  <div className="flex gap-4">
                    <a href="#" className="hover:scale-110 transition-transform">
                      <span className="sr-only">Facebook</span>
                      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                    <a href="#" className="hover:scale-110 transition-transform">
                      <span className="sr-only">Twitter</span>
                      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                    </a>
                    <a href="#" className="hover:scale-110 transition-transform">
                      <span className="sr-only">Instagram</span>
                      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-12 text-center text-sm text-gray-400">
                © {new Date().getFullYear()} Odisha Adarsha Vidyalaya, H.Katapali. All rights reserved.
                 A project by <a href="https://www.github.com/Sanket3yoprogrammer" className="hover:text-primary-400 transition-colors bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">Sanket Kumar Padhan</a>
              </div>
            </footer>
          </main>
        } />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/admin/*" element={
          <AdminLayout>
            <Routes>
              <Route path="about" element={<AboutAdmin />} />
            </Routes>
          </AdminLayout>
        } />
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/dashboard/*" element={
          <DashboardLayout>
            <Routes>
              <Route index element={<StudentDashboard />} />
              <Route path="academics" element={<AcademicsPage />} />
              <Route path="announcements" element={<AnnouncementsPage />} />
              <Route path="events" element={<EventsPage />} />
              <Route path="news" element={<NewsPage />} />
              <Route path="classes" element={<VideoClassesPage />} />
              <Route path="qna" element={<QnAPage />} />
              <Route path="gallery" element={<GalleryPage />} />
              <Route path="faculty" element={<FacultyPage />} />
            </Routes>
          </DashboardLayout>
        } />
      </Routes>
    </div>
  );
}

export default App;
