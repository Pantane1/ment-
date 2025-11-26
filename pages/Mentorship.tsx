import React, { useState } from 'react';
import { MENTORS } from '../constants';
import { Mentor } from '../types';
import { Search, Calendar, MessageCircle } from 'lucide-react';
import MentorChat from '../components/MentorChat';
import BookSessionModal from '../components/BookSessionModal';

const Mentorship: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [bookingMentor, setBookingMentor] = useState<Mentor | null>(null);

  const filteredMentors = MENTORS.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
            <h1 className="text-3xl font-bold text-white">Find a Mentor</h1>
            <p className="text-slate-400 mt-2">Connect with industry pros for 1-on-1 guidance and code reviews.</p>
        </div>
        <div className="mt-4 md:mt-0 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={20} />
            <input 
                type="text" 
                placeholder="Search by skill or name..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-primary-500 w-full md:w-64"
            />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentors.map((mentor) => (
            <div key={mentor.id} className="bg-dark-800 border border-dark-700 rounded-xl p-6 hover:border-primary-500/30 transition-all flex flex-col group">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                        <img src={mentor.avatarUrl} alt={mentor.name} className="w-16 h-16 rounded-full object-cover border-2 border-dark-700 group-hover:border-primary-500/50 transition-colors" />
                        <div>
                            <h3 className="font-bold text-lg text-white">{mentor.name}</h3>
                            <p className="text-sm text-slate-400">{mentor.role}</p>
                            <p className="text-xs text-primary-400">{mentor.company}</p>
                        </div>
                    </div>
                    {mentor.available ? (
                         <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded-full border border-green-500/20">Available</span>
                    ) : (
                        <span className="px-2 py-1 bg-slate-700 text-slate-400 text-xs rounded-full">Busy</span>
                    )}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                    {mentor.skills.map(skill => (
                        <span key={skill} className="text-xs bg-dark-900 border border-dark-600 text-slate-300 px-2 py-1 rounded">
                            {skill}
                        </span>
                    ))}
                </div>

                <div className="mt-auto grid grid-cols-2 gap-3">
                    <button 
                        onClick={() => setSelectedMentor(mentor)}
                        className="flex items-center justify-center space-x-2 bg-dark-700 hover:bg-dark-600 text-white py-2 rounded-lg transition-colors text-sm font-medium border border-transparent hover:border-dark-500"
                    >
                        <MessageCircle size={16} />
                        <span>Chat</span>
                    </button>
                    <button 
                        onClick={() => mentor.available && setBookingMentor(mentor)}
                        disabled={!mentor.available}
                        className={`flex items-center justify-center space-x-2 py-2 rounded-lg transition-colors text-sm font-medium ${
                            mentor.available 
                            ? 'bg-primary-600 hover:bg-primary-500 text-white' 
                            : 'bg-dark-700 text-slate-500 cursor-not-allowed opacity-50'
                        }`}
                    >
                        <Calendar size={16} />
                        <span>Book</span>
                    </button>
                </div>
            </div>
        ))}
      </div>
      
      {filteredMentors.length === 0 && (
          <div className="text-center py-20 text-slate-500">
              <p>No mentors found matching your search.</p>
          </div>
      )}

      {/* Mentor Chat Modal */}
      {selectedMentor && (
        <MentorChat 
            mentor={selectedMentor} 
            onClose={() => setSelectedMentor(null)} 
        />
      )}

      {/* Book Session Modal */}
      {bookingMentor && (
        <BookSessionModal
            mentor={bookingMentor}
            onClose={() => setBookingMentor(null)}
        />
      )}
    </div>
  );
};

export default Mentorship;