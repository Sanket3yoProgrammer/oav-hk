import { useState } from 'react';
import { Camera, MessageSquare, ThumbsUp, Share2 } from 'lucide-react';

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description: string;
  date: string;
  likes: number;
  comments: Comment[];
}

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  date: string;
}

const images: GalleryImage[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1171&q=80',
    title: 'Annual Day Celebration',
    description: 'Students performing at the annual day celebration',
    date: '2024-03-15',
    likes: 42,
    comments: [
      {
        id: '1',
        author: {
          name: 'John Doe',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        content: 'Amazing performance by everyone!',
        date: '2024-03-16',
      },
    ],
  },
  // Add more gallery images here
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = (imageId: string) => {
    if (!newComment.trim()) return;
    // Add comment logic here
    setNewComment('');
  };

  return (
    <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">Gallery</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            School Memories
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Explore our collection of memorable moments and achievements.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image) => (
            <div key={image.id} className="relative group">
              <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                <img
                  src={image.url}
                  alt={image.title}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  onClick={() => setSelectedImage(image)}
                />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{image.title}</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{image.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                      <ThumbsUp className="h-5 w-5 mr-1" />
                      {image.likes}
                    </button>
                    <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                      <MessageSquare className="h-5 w-5 mr-1" />
                      {image.comments.length}
                    </button>
                  </div>
                  <button className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for selected image */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                      <img
                        src={selectedImage.url}
                        alt={selectedImage.title}
                        className="w-full h-auto rounded-lg"
                      />
                      <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mt-4">
                        {selectedImage.title}
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {selectedImage.description}
                        </p>
                      </div>
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Comments</h4>
                        <div className="mt-2 space-y-4">
                          {selectedImage.comments.map((comment) => (
                            <div key={comment.id} className="flex space-x-3">
                              <img
                                src={comment.author.avatar}
                                alt={comment.author.name}
                                className="h-8 w-8 rounded-full"
                              />
                              <div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {comment.author.name}
                                </div>
                                <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                  {comment.content}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4">
                          <div className="flex items-start space-x-4">
                            <div className="min-w-0 flex-1">
                              <form onSubmit={(e) => {
                                e.preventDefault();
                                handleAddComment(selectedImage.id);
                              }}>
                                <div className="border-b border-gray-200 dark:border-gray-700 focus-within:border-blue-600">
                                  <textarea
                                    rows={3}
                                    name="comment"
                                    id="comment"
                                    className="block w-full resize-none border-0 border-b border-transparent bg-transparent p-0 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-0 sm:text-sm"
                                    placeholder="Add a comment..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                  />
                                </div>
                                <div className="pt-2 flex justify-end">
                                  <button
                                    type="submit"
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                  >
                                    Post
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setSelectedImage(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}