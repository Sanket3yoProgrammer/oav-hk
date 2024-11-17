import { BookOpen, GraduationCap, Users, Award } from 'lucide-react';
import type { AcademicProgram } from '../../types';

const programs: AcademicProgram[] = [
  {
    id: '1',
    name: 'Primary Education',
    description: 'Foundation years focusing on core subjects and holistic development.',
    grades: ['1st', '2nd', '3rd', '4th', '5th'],
    curriculum: 'State Board Curriculum with enhanced learning modules',
  },
  {
    id: '2',
    name: 'Middle School',
    description: 'Comprehensive education with focus on academic excellence and co-curricular activities.',
    grades: ['6th', '7th', '8th'],
    curriculum: 'Advanced curriculum with practical learning approach',
  },
  {
    id: '3',
    name: 'Secondary Education',
    description: 'Preparing students for board examinations with specialized subject focus.',
    grades: ['9th', '10th'],
    curriculum: 'Board-aligned curriculum with competitive exam preparation',
  },
];

export default function AcademicsSection() {
  return (
    <div className="bg-white py-24 sm:py-32 dark:bg-gray-900" id="academics">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Academics</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            Excellence in Learning
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-200">
            Our comprehensive academic programs are designed to nurture intellectual curiosity,
            critical thinking, and practical skills in students.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {programs.map((program) => (
              <div key={program.id} className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 dark:bg-gray-800 hover:scale-105 transition-transform duration-700 shadow-xl shadow-blue-600/20">
                <div className="px-6 py-8">
                  <div className="flex items-center gap-x-3">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{program.name}</h3>
                  </div>
                  <p className="mt-4 text-sm text-gray-600 dark:text-gray-200">{program.description}</p>
                  <div className="mt-6 border-t border-gray-100 pt-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">Grades</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {program.grades.map((grade) => (
                        <span
                          key={grade}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-white"
                        >
                          {grade}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">Curriculum</h4>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">{program.curriculum}</p>
                  </div>
                </div>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
          <div className="text-center">
            <div className="flex justify-center">
              <Users className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">Expert Faculty</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">Highly qualified and experienced teachers</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center">
              <BookOpen className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">Modern Facilities</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">State-of-the-art labs and library</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center">
              <GraduationCap className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">Career Guidance</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">Professional counseling and support</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center">
              <Award className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">Extra-curricular</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">Diverse activities for holistic growth</p>
          </div>
        </div>
      </div>
    </div>
  );
}