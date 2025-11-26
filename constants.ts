import { Course, CourseLevel, Mentor, Project } from './types';

export const COURSES: Course[] = [
  {
    id: '1',
    title: 'Python for AI Beginners',
    description: 'Master the basics of Python and build your first Machine Learning model.',
    level: CourseLevel.Beginner,
    progress: 75,
    tags: ['Python', 'AI', 'Data'],
    imageUrl: 'https://picsum.photos/seed/python/400/200',
    modules: 12,
  },
  {
    id: '2',
    title: 'Fullstack Web Development',
    description: 'Build modern web apps using React, Node.js, and Tailwind CSS.',
    level: CourseLevel.Intermediate,
    progress: 30,
    tags: ['React', 'Node', 'Web'],
    imageUrl: 'https://picsum.photos/seed/react/400/200',
    modules: 20,
  },
  {
    id: '3',
    title: 'Cybersecurity Essentials',
    description: 'Learn ethical hacking, network defense, and security protocols.',
    level: CourseLevel.Beginner,
    progress: 0,
    tags: ['Security', 'Network', 'Linux'],
    imageUrl: 'https://picsum.photos/seed/cyber/400/200',
    modules: 8,
  },
  {
    id: '4',
    title: 'Advanced Data Structures',
    description: 'Prepare for technical interviews with complex algorithms.',
    level: CourseLevel.Advanced,
    progress: 10,
    tags: ['CS', 'Algorithms', 'Java'],
    imageUrl: 'https://picsum.photos/seed/algo/400/200',
    modules: 15,
  }
];

export const MENTORS: Mentor[] = [
  {
    id: 'm1',
    name: 'Sarah Chen',
    role: 'Senior Software Engineer',
    company: 'Google',
    skills: ['System Design', 'Go', 'React'],
    available: true,
    avatarUrl: 'https://picsum.photos/seed/sarah/100/100',
  },
  {
    id: 'm2',
    name: 'David Okafor',
    role: 'Cybersecurity Analyst',
    company: 'Microsoft',
    skills: ['Pen Testing', 'Network Security'],
    available: false,
    avatarUrl: 'https://picsum.photos/seed/david/100/100',
  },
  {
    id: 'm3',
    name: 'Elena Rodriguez',
    role: 'AI Researcher',
    company: 'OpenAI',
    skills: ['PyTorch', 'NLP', 'Ethics'],
    available: true,
    avatarUrl: 'https://picsum.photos/seed/elena/100/100',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'EcoTracker App',
    description: 'A React Native app to track daily carbon footprint usage.',
    likes: 124,
    author: 'Alex K.',
    imageUrl: 'https://picsum.photos/seed/eco/300/200',
    tags: ['Mobile', 'Green Tech'],
  },
  {
    id: 'p2',
    title: 'Stock Predictor',
    description: 'Python script using LSTM models to predict market trends.',
    likes: 89,
    author: 'Jordan B.',
    imageUrl: 'https://picsum.photos/seed/stock/300/200',
    tags: ['AI', 'Finance'],
  },
];