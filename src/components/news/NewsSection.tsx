import { Calendar, User } from 'lucide-react';
import type { NewsItem } from '../../types';

const news: NewsItem[] = [
  {
    id: '1',
    title: 'Outstanding Board Exam Results',
    content: 'Our students have achieved exceptional results in the recent board examinations, with 95% scoring distinction.',
    date: '2024-03-10',
    author: 'Principal\'s Office',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: '2',
    title: 'New STEM Lab Inauguration',
    content: 'State-of-the-art STEM laboratory inaugurated to enhance practical learning experience for students.',
    date: '2024-03-05',
    author: 'Admin Office',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1186&q=80',
  },
  {
    id: '3',
    title: 'Inter-School Debate Competition Victory',
    content: 'Our school debate team secured first place in the state-level inter-school debate competition.',
    date: '2024-02-28',
    author: 'Activities Department',
    image: 'https://images.unsplash.com/photo-1544531585-9847b68c8c86?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
  },
];

export default function NewsSection() {
  return (
    <div className="bg-white py-24 sm:py-32 dark:bg-gray-900" id="news">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">News</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            Latest School News
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-200">
            Stay informed about our school's achievements, announcements, and important updates.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 dark:shadow-xl shadow-blue-600/20 hover:scale-105 transition-transform duration-700">
          {news.map((item) => (
            <article key={item.id} className="flex flex-col items-start">
              <div className="relative w-full">
                <img
                  src={item.image}
                  alt={item.title}
                  className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2] "
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div className="max-w-xl">
                <div className="mt-8 flex items-center gap-x-4 text-xs">
                  <time dateTime={item.date} className="text-gray-500 flex items-center dark:text-gray-200">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(item.date).toLocaleDateString()}
                  </time>
                  <div className="flex items-center text-gray-500 dark:text-gray-200">
                    <User className="h-4 w-4 mr-1" />
                    {item.author}
                  </div>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600 dark:text-white">
                    <a href="#">
                      <span className="absolute inset-0" />
                      {item.title}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-200">{item.content}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}