import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  MessageSquare, 
  Menu, 
  X, 
  Rocket, 
  Award,
  LogOut
} from 'lucide-react';
import MentorBot from './MentorBot';

const Layout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/courses', icon: BookOpen, label: 'Learning Paths' },
    { to: '/projects', icon: Rocket, label: 'Projects' },
    { to: '/mentorship', icon: Users, label: 'Mentors' },
    { to: '/community', icon: MessageSquare, label: 'Community' },
  ];

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-dark-900 text-slate-50 flex">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-dark-800 border-b border-dark-700 z-40 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2 font-bold text-xl text-primary-400">
           <Award />
           <span>GPMentor</span>
        </div>
        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-slate-200">
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-dark-800 border-r border-dark-700 transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:inset-auto ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center px-6 border-b border-dark-700">
             <Award className="text-primary-500 mr-2" />
             <span className="font-bold text-xl tracking-tight">GPMentor</span>
          </div>

          <nav className="flex-1 py-6 px-3 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-lg transition-colors group ${
                    isActive
                      ? 'bg-primary-600/10 text-primary-400 border border-primary-600/20'
                      : 'text-slate-400 hover:bg-dark-700 hover:text-white'
                  }`
                }
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="p-4 border-t border-dark-700">
             <div className="flex items-center space-x-3 mb-4">
                <img src="https://picsum.photos/seed/user123/40/40" alt="User" className="w-10 h-10 rounded-full border border-primary-500" />
                <div>
                   <p className="text-sm font-semibold text-white">Alex Student</p>
                   <p className="text-xs text-slate-400">Level 4 • 1240 XP</p>
                </div>
             </div>
             <button className="flex items-center w-full px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
             </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pt-16 md:pt-0 overflow-x-hidden">
        <div className="max-w-7xl mx-auto p-4 md:p-8">
           <Outlet />
        </div>
      </main>

      {/* Floating AI Bot */}
      <MentorBot />
    </div>
  );
};

export default Layout;