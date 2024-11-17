import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  if (!user || user.role !== 'teacher') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-10">
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}