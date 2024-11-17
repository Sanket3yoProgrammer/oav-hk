export interface User {
  id: string;
  name: string;
  role: 'teacher' | 'student';
  email: string;
  avatar?: string;
  uid: string;
  bio?: string;
  updatedAt?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  important: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image?: string;
}

export interface AboutSection {
  id: string;
  title: string;
  content: string;
  order: number;
}

export interface AcademicProgram {
  id: string;
  name: string;
  description: string;
  grades: string[];
  curriculum: string;
}

export interface AdmissionRequirement {
  id: string;
  title: string;
  description: string;
  documents: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  image?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: 'pending' | 'responded';
}