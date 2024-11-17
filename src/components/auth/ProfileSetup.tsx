import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, Lock, Image, FileText } from 'lucide-react';
import toast from 'react-hot-toast';
import { getAvatarColor, getInitials } from '../../utils/avatarUtils';

export default function ProfileSetup() {
  const navigate = useNavigate();
  const { updateUserProfile } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    bio: '',
    role: '',
    teacherKey: '',
    profilePicture: null as File | null,
  });
  const [isTeacher, setIsTeacher] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRoleChange = (role: string) => {
    setFormData({ ...formData, role });
    setIsTeacher(role === 'teacher');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData({ ...formData, profilePicture: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.username.trim()) {
      toast.error('Username is required');
      setLoading(false);
      return;
    }

    if (!formData.role) {
      toast.error('Please select a role');
      setLoading(false);
      return;
    }

    try {
      await updateUserProfile({
        username: formData.username.trim(),
        bio: formData.bio.trim(),
        role: formData.role,
        teacherKey: formData.teacherKey,
        profilePicture: formData.profilePicture,
      });
      toast.success('Profile setup completed!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Failed to setup profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Complete Your Profile
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please provide additional information to complete your profile
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1 relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <div className="mt-2 space-x-4">
                <button
                  type="button"
                  className={`inline-flex items-center px-4 py-2 border rounded-md ${
                    formData.role === 'student'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700'
                  }`}
                  onClick={() => handleRoleChange('student')}
                >
                  Student
                </button>
                <button
                  type="button"
                  className={`inline-flex items-center px-4 py-2 border rounded-md ${
                    formData.role === 'teacher'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700'
                  }`}
                  onClick={() => handleRoleChange('teacher')}
                >
                  Teacher
                </button>
              </div>
            </div>

            {isTeacher && (
              <div className="mb-4">
                <label htmlFor="teacherKey" className="block text-sm font-medium text-gray-700">
                  Teacher Access Key
                </label>
                <div className="mt-1 relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="teacherKey"
                    name="teacherKey"
                    type="password"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Enter teacher access key"
                    value={formData.teacherKey}
                    onChange={(e) => setFormData({ ...formData, teacherKey: e.target.value })}
                  />
                </div>
              </div>
            )}

            <div className="mb-4">
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <div className="mt-1 relative">
                <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <textarea
                  id="bio"
                  name="bio"
                  rows={3}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Tell us about yourself"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Profile Avatar</label>
              <div className="mt-1 flex items-center">
                <span className={`inline-block h-12 w-12 rounded-full overflow-hidden ${getAvatarColor(formData.username)}`}>
                  <div className="h-full w-full flex items-center justify-center text-white text-xl font-medium">
                    {formData.username ? getInitials(formData.username) : '?'}
                  </div>
                </span>
                <span className="ml-5 text-sm text-gray-500">
                  Avatar will be generated from your username
                </span>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? 'Setting up...' : 'Complete Setup'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 