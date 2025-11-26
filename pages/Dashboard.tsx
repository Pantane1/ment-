import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { COURSES } from '../constants';
import CourseCard from '../components/CourseCard';
import { Flame, Trophy, Target, Clock } from 'lucide-react';

const data = [
  { name: 'Mon', xp: 120 },
  { name: 'Tue', xp: 200 },
  { name: 'Wed', xp: 150 },
  { name: 'Thu', xp: 280 },
  { name: 'Fri', xp: 190 },
  { name: 'Sat', xp: 350 },
  { name: 'Sun', xp: 210 },
];

const StatCard = ({ icon: Icon, label, value, color }: any) => (
  <div className="bg-dark-800 border border-dark-700 p-6 rounded-xl flex items-center space-x-4">
    <div className={`p-3 rounded-lg bg-opacity-20 ${color.bg} ${color.text}`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-slate-400 text-sm">{label}</p>
      <h3 className="text-2xl font-bold text-white">{value}</h3>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
           <h1 className="text-3xl font-bold text-white">Welcome back, Alex! 🚀</h1>
           <p className="text-slate-400 mt-2">You're on a 5-day streak. Keep pushing!</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
            <button className="bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Daily Challenge
            </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon={Flame} 
          label="Current Streak" 
          value="5 Days" 
          color={{ bg: 'bg-orange-500', text: 'text-orange-500' }} 
        />
        <StatCard 
          icon={Trophy} 
          label="Total XP" 
          value="1,240" 
          color={{ bg: 'bg-yellow-500', text: 'text-yellow-500' }} 
        />
        <StatCard 
          icon={Target} 
          label="Courses Completed" 
          value="2" 
          color={{ bg: 'bg-green-500', text: 'text-green-500' }} 
        />
        <StatCard 
          icon={Clock} 
          label="Hours Learned" 
          value="24h" 
          color={{ bg: 'bg-blue-500', text: 'text-blue-500' }} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-dark-800 border border-dark-700 p-6 rounded-xl">
           <h3 className="text-xl font-bold text-white mb-6">Learning Activity</h3>
           <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={data}>
                 <XAxis 
                    dataKey="name" 
                    stroke="#94a3b8" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                 />
                 <YAxis 
                    stroke="#94a3b8" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                 />
                 <Tooltip 
                    cursor={{fill: '#334155', opacity: 0.2}}
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                 />
                 <Bar dataKey="xp" radius={[4, 4, 0, 0]}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.xp > 300 ? '#6366f1' : '#818cf8'} />
                    ))}
                 </Bar>
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Recommended Path */}
        <div className="bg-dark-800 border border-dark-700 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-white mb-4">Up Next</h3>
            <div className="bg-gradient-to-br from-primary-600 to-violet-600 rounded-xl p-5 text-white">
                <div className="flex justify-between items-start mb-4">
                    <span className="bg-white/20 px-2 py-1 rounded text-xs font-bold">Python</span>
                    <Clock size={16} />
                </div>
                <h4 className="font-bold text-lg mb-1">Data Structures</h4>
                <p className="text-white/80 text-sm mb-4">Module 4: Linked Lists & Trees</p>
                <button className="w-full bg-white text-primary-600 py-2 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                    Resume Mission
                </button>
            </div>
        </div>
      </div>

      {/* Course List */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Your Courses</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COURSES.map(course => (
                <CourseCard key={course.id} course={course} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;