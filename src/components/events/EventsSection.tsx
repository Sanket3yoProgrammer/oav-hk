import { Calendar, MapPin, Clock } from 'lucide-react';
import type { Event } from '../../types';

const events: Event[] = [
  {
    id: '1',
    title: 'Annual Sports Day 2024',
    description: 'Join us for a day of athletic excellence and sporting spirit. Various competitions and exciting prizes await!',
    date: '2024-03-25',
    time: '9:00 AM',
    location: 'School Sports Ground',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: '2',
    title: 'Science Exhibition',
    description: 'Witness innovative projects and experiments by our talented students showcasing their scientific prowess.',
    date: '2024-04-15',
    time: '10:00 AM',
    location: 'School Auditorium',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: '3',
    title: 'Cultural Festival',
    description: 'A celebration of art, music, and dance featuring performances by students across all grades.',
    date: '2024-05-10',
    time: '5:00 PM',
    location: 'School Amphitheater',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80'
  },
];

export default function EventsSection() {
  return (
    <div className="bg-white py-24 sm:py-32 dark:bg-gray-900" id="events">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Events</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            Upcoming School Events
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-200">
            Stay updated with our latest events and activities. Join us in celebrating learning,
            creativity, and achievement.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {events.map((event) => (
            <article
              key={event.id}
              className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80 dark:bg-gray-800 shadow-xl shadow-blue-600/20 hover:scale-105 transition-transform duration-700"
            >
              <img
                src={event.image}
                alt={event.title}
                className="absolute inset-0 -z-10 h-full w-full object-cover"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
              <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

              <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                <div className="flex items-center gap-x-2">
                  <Calendar className="h-5 w-5" />
                  {new Date(event.date).toLocaleDateString()}
                </div>
                <div className="ml-4 flex items-center gap-x-2">
                  <Clock className="h-5 w-5" />
                  {event.time}
                </div>
              </div>
              <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                <a href="#">
                  <span className="absolute inset-0" />
                  {event.title}
                </a>
              </h3>
              <div className="mt-2 text-sm text-gray-300 line-clamp-3">{event.description}</div>
              <div className="mt-4 flex items-center gap-x-2 text-sm text-gray-300">
                <MapPin className="h-5 w-5" />
                {event.location}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}