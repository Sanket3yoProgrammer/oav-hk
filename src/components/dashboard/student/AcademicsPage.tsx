import { useState } from 'react';
import { Book, FileText, Download, Clock, CheckCircle } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

const subjects = [
  { id: 1, name: 'Mathematics', icon: '📐', color: 'bg-blue-500' },
  { id: 2, name: 'Science', icon: '🔬', color: 'bg-green-500' },
  { id: 3, name: 'English', icon: '📚', color: 'bg-yellow-500' },
  { id: 4, name: 'Odia', icon: '🏛️', color: 'bg-purple-500' },
  { id: 5, name: 'Social Science', icon: '🌍', color: 'bg-pink-500' },
];

const tabs = ['Resources', 'Assignments', 'Results'];

export default function AcademicsPage() {
  const { darkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('Resources');
  const [selectedSubject, setSelectedSubject] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      {/* Subjects Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {subjects.map((subject) => (
          <button
            key={subject.id}
            onClick={() => setSelectedSubject(subject)}
            className={`p-4 rounded-lg text-center transition-all duration-200 ${
              selectedSubject?.id === subject.id
                ? darkMode
                  ? 'bg-blue-900 text-blue-200'
                  : 'bg-blue-100 text-blue-600'
                : darkMode
                  ? 'bg-gray-800 text-white hover:bg-gray-700'
                  : 'bg-white text-gray-900 hover:bg-gray-50'
            }`}
          >
            <span className="text-2xl">{subject.icon}</span>
            <p className="mt-2 font-medium">{subject.name}</p>
          </button>
        ))}
      </div>

      {/* Tabs */}
      <div className={`rounded-lg p-4 ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex gap-4 border-b ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium border-b-2 -mb-px ${
                activeTab === tab
                  ? darkMode
                    ? 'border-blue-400 text-blue-400'
                    : 'border-blue-600 text-blue-600'
                  : darkMode
                    ? 'border-transparent text-gray-400 hover:text-gray-300'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Area */}
        {selectedSubject && (
          <div className="mt-6">
            <div className={`rounded-lg p-4 ${
              darkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              {activeTab === 'Resources' && (
                <div className="space-y-4">
                  <div className={`flex items-center justify-between p-4 rounded-lg shadow-sm ${
                    darkMode ? 'bg-gray-800' : 'bg-white'
                  }`}>
                    <div className="flex items-center gap-3">
                      <FileText className={`h-5 w-5 ${
                        darkMode ? 'text-blue-400' : 'text-blue-500'
                      }`} />
                      <div>
                        <h3 className={`font-medium ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}>Chapter 1 Notes</h3>
                        <p className={`text-sm ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>PDF Document</p>
                      </div>
                    </div>
                    <button className={`p-2 rounded-full ${
                      darkMode
                        ? 'text-blue-400 hover:bg-gray-700'
                        : 'text-blue-600 hover:bg-blue-50'
                    }`}>
                      <Download className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'Assignments' && (
                <div className="space-y-4">
                  <div className={`flex items-center justify-between p-4 rounded-lg shadow-sm ${
                    darkMode ? 'bg-gray-800' : 'bg-white'
                  }`}>
                    <div className="flex items-center gap-3">
                      <Book className={`h-5 w-5 ${
                        darkMode ? 'text-green-400' : 'text-green-500'
                      }`} />
                      <div>
                        <h3 className={`font-medium ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}>Assignment 1</h3>
                        <div className={`flex items-center gap-2 text-sm ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          <Clock className="h-4 w-4" />
                          <span>Due: March 20, 2024</span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                      darkMode
                        ? 'bg-yellow-900/50 text-yellow-200'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      Pending
                    </span>
                  </div>
                  {/* Add more assignments */}
                </div>
              )}

              {activeTab === 'Results' && (
                <div className="space-y-4">
                  {/* <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm"> */}
                  <div className={`flex items-center justify-between p-4 rounded-lg shadow-sm 
                    ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>

                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                      <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Mid-Term Test</h3>
                        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                            Score: 95/100</p>
                      </div>
                    </div>
                  </div>
                  {/* Add more results */}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}