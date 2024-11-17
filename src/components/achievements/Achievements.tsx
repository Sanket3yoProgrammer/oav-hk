import { Trophy, Award, Star } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  image: string;
}

const achievements: Achievement[] = [
  {
    id: '1',
    title: 'Block Level Science Exhibition Winner',
    description: 'Our students secured second place in the state level science exhibition with their innovative project on renewable energy.',
    date: '2024-11-11',
    category: 'Academic',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: '2',
    title: 'National Sports Championship',
    description: 'School cricket team won the national inter-school sports championship.',
    date: '2024-01-20',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: '3',
    title: 'Cultural Excellence Award',
    description: 'Received the state cultural excellence award for promoting traditional arts and culture.',
    date: '2023-12-10',
    category: 'Cultural',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
  },
];

export default function Achievements() {
  return (
    <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">Achievements</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Our Pride and Glory
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Celebrating excellence in academics, sports, and cultural activities.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {achievements.map((achievement) => (
            <article
              key={achievement.id}
              className="flex flex-col items-start justify-between bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative w-full">
                <img
                  src={achievement.image}
                  alt={achievement.title}
                  className="aspect-[16/9] w-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  {achievement.category === 'Academic' && (
                    <Trophy className="h-6 w-6 text-yellow-500" />
                  )}
                  {achievement.category === 'Sports' && (
                    <Award className="h-6 w-6 text-blue-500" />
                  )}
                  {achievement.category === 'Cultural' && (
                    <Star className="h-6 w-6 text-purple-500" />
                  )}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={achievement.date} className="text-gray-500 dark:text-gray-400">
                    {new Date(achievement.date).toLocaleDateString()}
                  </time>
                  <span className="relative z-10 rounded-full bg-gray-100 dark:bg-gray-700 px-3 py-1.5 font-medium text-gray-600 dark:text-gray-300">
                    {achievement.category}
                  </span>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 dark:text-white group-hover:text-gray-600">
                    <a href={`/achievements/${achievement.id}`}>
                      <span className="absolute inset-0" />
                      {achievement.title}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                    {achievement.description}
                  </p>
                </div>
                <div className="mt-6">
                  <a
                    href={`/achievements/${achievement.id}`}
                    className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500"
                  >
                    Read more <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}