import React from 'react';
import { PROJECTS } from '../constants';
import { Heart, MessageSquare, Share2, Code } from 'lucide-react';

const Community: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Project Showcase 💡</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
            Discover what other learners are building. Share your projects, get feedback, and find collaborators for the next Hackathon.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map(project => (
            <div key={project.id} className="bg-dark-800 border border-dark-700 rounded-xl overflow-hidden group">
                <div className="h-48 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent opacity-60 z-10" />
                    <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute bottom-3 left-3 z-20 flex space-x-2">
                        {project.tags.map(tag => (
                            <span key={tag} className="text-xs bg-black/50 backdrop-blur-md text-white px-2 py-1 rounded border border-white/10">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-white group-hover:text-primary-400 transition-colors">{project.title}</h3>
                    </div>
                    <p className="text-slate-400 text-sm mb-4">{project.description}</p>
                    
                    <div className="flex items-center justify-between text-slate-500 text-sm pt-4 border-t border-dark-700">
                         <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center text-xs text-white font-bold">
                                {project.author.charAt(0)}
                            </div>
                            <span className="text-slate-300">{project.author}</span>
                         </div>
                         <div className="flex space-x-4">
                            <button className="flex items-center space-x-1 hover:text-red-400 transition-colors">
                                <Heart size={16} />
                                <span>{project.likes}</span>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-white transition-colors">
                                <MessageSquare size={16} />
                            </button>
                         </div>
                    </div>
                </div>
            </div>
        ))}
        
        {/* Call to Action Card */}
        <div className="bg-gradient-to-br from-dark-800 to-dark-700 border border-dashed border-dark-600 rounded-xl flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 bg-primary-600/20 rounded-full flex items-center justify-center mb-4 text-primary-400">
                <Code size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Build & Share</h3>
            <p className="text-slate-400 text-sm mb-6">Finished a mission? Upload your code to get feedback from mentors.</p>
            <button className="bg-white text-dark-900 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                Submit Project
            </button>
        </div>
      </div>
    </div>
  );
};

export default Community;