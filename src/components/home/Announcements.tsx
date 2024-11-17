import { Bell } from 'lucide-react';
import type { Announcement } from '../../types';

const announcements: Announcement[] = [
  {
    id: '1',
    title: 'Annual Sports Day Registration Open',
    content: 'Register now for our upcoming Annual Sports Day. Various events and exciting prizes await!',
    date: '2024-03-15',
    important: true,
  },
  {
    id: '2',
    title: 'Parent-Teacher Meeting',
    content: 'Scheduled for next Friday. Please check your email for timing details.',
    date: '2024-03-20',
    important: true,
  },
  {
    id: '3',
    title: 'Science Exhibition',
    content: 'Students from grades 6-10 are invited to participate in the upcoming science exhibition.',
    date: '2024-03-25',
    important: false,
  },
];

export default function Announcements() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl flex items-center gap-2">
            <Bell className="h-8 w-8 text-blue-600" />
            Latest Announcements
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Stay updated with the latest news and events from our school.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {announcements.map((post) => (
            <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={post.date} className="text-gray-500">
                  {new Date(post.date).toLocaleDateString()}
                </time>
                {post.important && (
                  <span className="relative z-10 rounded-full bg-red-50 px-3 py-1.5 font-medium text-red-600">
                    Important
                  </span>
                )}
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <a href="#">
                    <span className="absolute inset-0" />
                    {post.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.content}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}