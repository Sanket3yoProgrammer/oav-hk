import { Users, GraduationCap, School, Crown } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

// Sample data for school stats and teachers
const schoolStats = {
  totalStudents: 850,
  totalTeachers: 45,
  yearsOfExcellence: 53,
  classesOffered: 12,
};

const teachers = [
  {
    id: 1,
    name: 'Mr. Nigamananda Mohapatra',
    subject: 'Science',
    gender: 'male',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3',
    bio: '"Education is not the filling of a pail, but the lighting of a fire." I believe in making science accessible and exciting for every student.',
  },
  {
    id: 2,
    name: 'Mrs. Chinmayee Bag',
    subject: 'Mathematics',
    gender: 'female',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3',
    bio: '"Mathematics is not about numbers, equations, computations, or algorithms: it is about understanding." I strive to make math enjoyable and relatable.',
  },
  {
    id: 3,
    name: 'Mr. Gulshan Sahu',
    subject: 'Social Science',
    gender: 'male',
    image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3',
    bio: '"Every great advance in science has issued from a new audacity of imagination." My goal is to inspire curiosity and scientific thinking.',
  },
  {
    id: 4,
    name: 'Mrs. Jyoti Bhoi',
    subject: 'Social Science',
    gender: 'female',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3',
    bio: '"The beauty of science lies in its endless possibilities." I aim to cultivate a deep appreciation for life sciences among students.',
  },
  {
    id: 5,
    name: 'Mr. Abhinash Panigrahi',
    subject: 'English Literature',
    gender: 'male',
    image: 'https://images.unsplash.com/photo-1480429370139-e0132c086e2a?ixlib=rb-4.0.3',
    bio: '"Technology is best when it brings people together." Teaching students to code is teaching them to think creatively.',
  },
  {
    id: 6,
    name: 'Mrs. Sujata Barik',
    subject: 'Odia',
    gender: 'female',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3',
    bio: '"Literature is the most agreeable way of ignoring life." I believe in the power of stories to transform minds and hearts.',
    isPrincipal: true,
  },
];

export default function FacultyPage() {
  const { darkMode } = useTheme();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <div className="flex items-center gap-3">
          <School className={`h-6 w-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            About Our School
          </h1>
        </div>
      </div>

      {/* School Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(schoolStats).map(([key, value]) => (
          <div
            key={key}
            className={`p-6 rounded-lg ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            } shadow-sm text-center`}
          >
            <div className={`text-3xl font-bold mb-2 ${
              darkMode ? 'text-blue-400' : 'text-blue-600'
            }`}>
              {value}
            </div>
            <div className={`text-sm capitalize ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </div>
          </div>
        ))}
      </div>

      {/* Faculty Section */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Users className={`h-6 w-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Our Faculty
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className={`relative rounded-lg overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              {teacher.isPrincipal && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-yellow-500/90 to-orange-500/90 backdrop-blur-sm">
                    <Crown className="h-4 w-4 text-white" />
                    <span className="text-sm font-medium text-white">Principal</span>
                  </div>
                </div>
              )}
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={teacher.image}
                  alt={teacher.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className={`text-lg font-semibold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {teacher.name}
                </h3>
                <p className={`text-sm ${
                  darkMode ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  {teacher.subject}
                </p>
                <p className={`mt-4 text-sm italic ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {teacher.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 
