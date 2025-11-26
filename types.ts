export enum CourseLevel {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
}

export interface Course {
  id: string;
  title: string;
  description: string;
  level: CourseLevel;
  progress: number;
  tags: string[];
  imageUrl: string;
  modules: number;
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  skills: string[];
  available: boolean;
  avatarUrl: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  likes: number;
  author: string;
  imageUrl: string;
  tags: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isThinking?: boolean;
}
