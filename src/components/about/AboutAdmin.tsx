import { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Save, Plus, Trash } from 'lucide-react';
import type { AboutSection } from '../../types';

const initialSections: AboutSection[] = [
  {
    id: '1',
    title: 'Our Mission',
    content: 'To provide quality education that empowers students with knowledge, skills, and values to excel in life.',
    order: 1,
  },
  {
    id: '2',
    title: 'Our Vision',
    content: 'To be a leading institution that nurtures future leaders and responsible citizens of tomorrow.',
    order: 2,
  },
  {
    id: '3',
    title: 'Our Values',
    content: 'Excellence, integrity, innovation, and inclusivity form the cornerstone of our educational philosophy.',
    order: 3,
  },
];

export default function AboutAdmin() {
  const [sections, setSections] = useState<AboutSection[]>(initialSections);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSave = (id: string, content: string) => {
    setSections(sections.map(section => 
      section.id === id ? { ...section, content } : section
    ));
    setEditingId(null);
  };

  const handleAdd = () => {
    const newSection: AboutSection = {
      id: Date.now().toString(),
      title: 'New Section',
      content: 'Enter content here...',
      order: sections.length + 1,
    };
    setSections([...sections, newSection]);
    setEditingId(newSection.id);
  };

  const handleDelete = (id: string) => {
    setSections(sections.filter(section => section.id !== id));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Manage About Section</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Section
        </button>
      </div>

      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{section.title}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingId(section.id)}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(section.id)}
                  className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                >
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            </div>

            {editingId === section.id ? (
              <div className="space-y-4">
                <Editor
                  apiKey="your-tinymce-api-key"
                  initialValue={section.content}
                  init={{
                    height: 300,
                    menubar: false,
                    plugins: ['advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor',
                      'searchreplace', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media', 'table', 'code'],
                    toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat'
                  }}
                />
                <button
                  onClick={() => handleSave(section.id, section.content)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </button>
              </div>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: section.content }} className="prose max-w-none" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}