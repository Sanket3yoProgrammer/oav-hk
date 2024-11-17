import { Users, Award, BookOpen, Target } from 'lucide-react';

const features = [
  {
    name: 'Our Mission',
    description: 'To provide quality education that empowers students with knowledge, skills, and values to excel in life.',
    icon: Target,
  },
  {
    name: 'Our Vision',
    description: 'To be a leading institution that nurtures future leaders and responsible citizens of tomorrow.',
    icon: Award,
  },
  {
    name: 'Our Values',
    description: 'Excellence, integrity, innovation, and inclusivity form the cornerstone of our educational philosophy.',
    icon: BookOpen,
  },
];

export default function AboutSection() {
  return (
    <div className="bg-white py-24 sm:py-32 dark:bg-gray-900" id="about">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">About Us</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            Excellence in Education Since 1970
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-200">
            Odisha Adarsha Vidyalaya, H. Katapali is committed to providing comprehensive education
            that focuses on academic excellence, character development, and holistic growth.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col dark:bg-gray-800 rounded-xl p-4 shadow-lg hover:scale-105 transition-transform duration-700 shadow-blue-600/20">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <feature.icon className="h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-200">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}