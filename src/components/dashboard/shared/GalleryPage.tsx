import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useTheme } from '../../../context/ThemeContext';
import { 
  Image, Upload, MessageCircle, Heart, Share2, 
  MoreVertical, Trash2, Edit, Search 
} from 'lucide-react';

interface GalleryPost {
  id: string;
  imageUrl: string;
  caption: string;
  author: {
    name: string;
    role: 'teacher' | 'student';
    avatar?: string;
  };
  date: string;
  likes: number;
  comments: Comment[];
  tags: string[];
}

interface Comment {
  id: string;
  author: {
    name: string;
    role: 'teacher' | 'student';
    avatar?: string;
  };
  content: string;
  date: string;
}

export default function GalleryPage() {
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newPost, setNewPost] = useState({
    caption: '',
    tags: '',
    image: null as File | null,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');

  const posts: GalleryPost[] = [
    {
      id: '1',
      imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80',
      caption: 'Annual Science Exhibition 2024',
      author: {
        name: 'Mr. Nigamananda Mohapatra',
        role: 'teacher'
      },
      date: '2024-03-15',
      likes: 24,
      comments: [
        {
          id: 'c1',
          author: {
            name: 'Joker Anshu',
            role: 'student'
          },
          content: 'Amazing projects this year!',
          date: '2024-03-15'
        }
      ],
      tags: ['science', 'exhibition', 'projects']
    },
    // Add more posts
  ];

  const allTags = Array.from(
    new Set(posts.flatMap(post => post.tags))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`p-6 rounded-lg ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      } shadow-sm`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image className={`h-6 w-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Gallery
            </h1>
          </div>
          {user?.role === 'teacher' && (
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Upload Image
            </button>
          )}
        </div>

        {/* Search and Filters */}
        <div className="mt-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search gallery..."
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
            <button
              onClick={() => setSelectedTag('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                selectedTag === 'all'
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                  : darkMode
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                  selectedTag === tag
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                    : darkMode
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts
          .filter(post => 
            (selectedTag === 'all' || post.tags.includes(selectedTag)) &&
            (post.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
             post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
          )
          .map((post) => (
            <div
              key={post.id}
              className={`rounded-lg overflow-hidden ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              } shadow-sm hover:shadow-md transition-all duration-200`}
            >
              <img
                src={post.imageUrl}
                alt={post.caption}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white ${
                      post.author.role === 'teacher' ? 'bg-purple-500' : 'bg-blue-500'
                    }`}>
                      {post.author.name[0]}
                    </div>
                    <div>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {post.author.name}
                      </p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {new Date(post.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  {user?.role === 'teacher' && (
                    <button className={`p-2 rounded-full ${
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}>
                      <MoreVertical className="h-5 w-5 text-gray-500" />
                    </button>
                  )}
                </div>

                <p className={`mt-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {post.caption}
                </p>

                <div className="mt-2 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-sm px-2 py-1 rounded-md ${
                        darkMode
                          ? 'bg-gray-700 text-gray-300'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-gray-500 hover:text-red-500">
                      <Heart className="h-5 w-5" />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500">
                      <MessageCircle className="h-5 w-5" />
                      <span>{post.comments.length}</span>
                    </button>
                    <button className="flex items-center gap-1 text-gray-500 hover:text-green-500">
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Comments */}
                <div className="mt-4 space-y-3">
                  {post.comments.map((comment) => (
                    <div key={comment.id} className={`p-3 rounded-lg ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-50'
                    }`}>
                      <div className="flex items-center gap-2">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white ${
                          comment.author.role === 'teacher' ? 'bg-purple-500' : 'bg-blue-500'
                        }`}>
                          {comment.author.name[0]}
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {comment.author.name}
                          </p>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {comment.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Comment Input */}
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className={`w-full px-4 py-2 rounded-md ${
                      darkMode
                        ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600'
                        : 'bg-gray-50 text-gray-900 placeholder-gray-500 border-gray-300'
                    } border focus:ring-blue-500 focus:border-blue-500`}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`max-w-md w-full rounded-lg ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } p-6`}>
            <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Upload Image
            </h2>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                } mb-1`}>
                  Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewPost({ ...newPost, image: e.target.files?.[0] || null })}
                  className={`w-full p-2 border rounded-md ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                } mb-1`}>
                  Caption
                </label>
                <textarea
                  value={newPost.caption}
                  onChange={(e) => setNewPost({ ...newPost, caption: e.target.value })}
                  className={`w-full p-2 border rounded-md ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  rows={3}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                } mb-1`}>
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={newPost.tags}
                  onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                  className={`w-full p-2 border rounded-md ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className={`px-4 py-2 rounded-md ${
                    darkMode
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle upload logic
                    setShowUploadModal(false);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}