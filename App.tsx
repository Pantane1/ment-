import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Mentorship from './pages/Mentorship';
import Community from './pages/Community';
import { BookOpen, Rocket } from 'lucide-react';

// Placeholder components for routes not fully implemented in this demo
const CoursesPlaceholder = () => (
  <div className="text-center py-20">
    <BookOpen size={48} className="mx-auto text-primary-500 mb-4" />
    <h2 className="text-2xl font-bold text-white">Learning Paths</h2>
    <p className="text-slate-400 mt-2">Browse and start new courses here.</p>
  </div>
);

const ProjectsPlaceholder = () => (
  <div className="text-center py-20">
    <Rocket size={48} className="mx-auto text-primary-500 mb-4" />
    <h2 className="text-2xl font-bold text-white">Your Projects</h2>
    <p className="text-slate-400 mt-2">Manage your ongoing code challenges.</p>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="courses" element={<CoursesPlaceholder />} />
          <Route path="projects" element={<ProjectsPlaceholder />} />
          <Route path="mentorship" element={<Mentorship />} />
          <Route path="community" element={<Community />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;