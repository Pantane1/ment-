import React from 'react';
import { Course, CourseLevel } from '../types';
import { PlayCircle, Clock } from 'lucide-react';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const getLevelColor = (level: CourseLevel) => {
    switch (level) {
      case CourseLevel.Beginner: return 'text-green-400 bg-green-400/10';
      case CourseLevel.Intermediate: return 'text-yellow-400 bg-yellow-400/10';
      case CourseLevel.Advanced: return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-dark-800 border border-dark-700 rounded-xl overflow-hidden hover:border-primary-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10 group cursor-pointer">
      <div className="h-40 overflow-hidden relative">
        <img 
          src={course.imageUrl} 
          alt={course.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute top-2 right-2">
            <span className={`px-2 py-1 rounded text-xs font-semibold ${getLevelColor(course.level)}`}>
                {course.level}
            </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
            {course.title}
        </h3>
        <p className="text-slate-400 text-sm mb-4 line-clamp-2">
            {course.description}
        </p>
        
        {/* Progress Bar */}
        <div className="mb-4">
            <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Progress</span>
                <span>{course.progress}%</span>
            </div>
            <div className="w-full bg-dark-700 rounded-full h-2">
                <div 
                    className="bg-primary-500 h-2 rounded-full transition-all duration-1000" 
                    style={{ width: `${course.progress}%` }}
                ></div>
            </div>
        </div>

        <div className="flex items-center justify-between text-slate-400 text-sm border-t border-dark-700 pt-3">
            <div className="flex items-center space-x-1">
                <PlayCircle size={16} />
                <span>{course.modules} Modules</span>
            </div>
            <button className="text-white bg-primary-600 hover:bg-primary-500 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors">
                {course.progress > 0 ? 'Continue' : 'Start'}
            </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;