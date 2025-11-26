import React, { useState, useMemo } from 'react';
import { Mentor } from '../types';
import { X, Calendar, Clock, CheckCircle, Loader2 } from 'lucide-react';

interface BookSessionModalProps {
  mentor: Mentor;
  onClose: () => void;
}

const BookSessionModal: React.FC<BookSessionModalProps> = ({ mentor, onClose }) => {
  const [step, setStep] = useState<'select' | 'success'>('select');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [topic, setTopic] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate next 5 days
  const availableDates = useMemo(() => {
    const days = [];
    const today = new Date();
    for (let i = 1; i <= 5; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      days.push({
        fullDate: d.toISOString().split('T')[0],
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        dateNum: d.getDate(),
      });
    }
    return days;
  }, []);

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', 
    '01:00 PM', '02:30 PM', '04:00 PM'
  ];

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('success');
    }, 1500);
  };

  if (step === 'success') {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200">
        <div className="bg-dark-800 border border-dark-700 w-full max-w-md rounded-2xl shadow-2xl p-8 flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6 ring-4 ring-green-500/10">
            <CheckCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Session Confirmed!</h2>
          <p className="text-slate-400 mb-6">
            You are booked with <span className="text-white font-medium">{mentor.name}</span> on <span className="text-primary-400">{new Date(selectedDate!).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric'})}</span> at <span className="text-primary-400">{selectedTime}</span>.
          </p>
          <div className="w-full space-y-3">
             <button 
              onClick={onClose}
              className="w-full bg-primary-600 hover:bg-primary-500 text-white py-3 rounded-xl font-bold transition-colors shadow-lg shadow-primary-600/20"
            >
              Done
            </button>
            <button className="w-full text-slate-400 hover:text-white text-sm font-medium transition-colors">
              Add to Calendar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-dark-800 border border-dark-700 w-full max-w-lg rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-dark-700 flex justify-between items-center bg-dark-900">
          <div>
            <h2 className="text-xl font-bold text-white">Book a Session</h2>
            <p className="text-slate-400 text-sm">with {mentor.name}</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 text-slate-400 hover:text-white hover:bg-dark-700 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 custom-scrollbar">
          
          {/* Date Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3 flex items-center">
              <Calendar size={16} className="mr-2 text-primary-400" />
              Select Date
            </label>
            <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
              {availableDates.map((date) => (
                <button
                  key={date.fullDate}
                  onClick={() => setSelectedDate(date.fullDate)}
                  className={`flex flex-col items-center justify-center min-w-[72px] p-3 rounded-xl border transition-all duration-200 ${
                    selectedDate === date.fullDate
                      ? 'bg-primary-600 border-primary-500 text-white shadow-lg shadow-primary-900/50 scale-105'
                      : 'bg-dark-900 border-dark-600 text-slate-400 hover:border-dark-500 hover:bg-dark-800'
                  }`}
                >
                  <span className="text-xs font-medium uppercase tracking-wider opacity-80">{date.dayName}</span>
                  <span className="text-xl font-bold mt-1">{date.dateNum}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div className={`transition-opacity duration-300 ${selectedDate ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
             <label className="block text-sm font-medium text-slate-300 mb-3 flex items-center">
              <Clock size={16} className="mr-2 text-primary-400" />
              Select Time
            </label>
            <div className="grid grid-cols-3 gap-3">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-2 px-3 rounded-lg text-sm font-medium border transition-all duration-200 ${
                    selectedTime === time
                      ? 'bg-primary-600/20 border-primary-500 text-primary-400 shadow-inner'
                      : 'bg-dark-900 border-dark-600 text-slate-400 hover:border-dark-500 hover:text-slate-200'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Topic */}
          <div className={`transition-opacity duration-300 ${selectedTime ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              What do you want to discuss? <span className="text-slate-500 font-normal">(Optional)</span>
            </label>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Code review for my React project, career advice..."
              className="w-full bg-dark-900 border border-dark-600 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 min-h-[80px] text-sm transition-all"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-dark-700 bg-dark-900 flex justify-end space-x-3">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-slate-300 hover:text-white font-medium hover:bg-dark-700 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleConfirm}
            disabled={!selectedDate || !selectedTime || isSubmitting}
            className={`px-6 py-2.5 rounded-xl font-bold text-white flex items-center space-x-2 transition-all ${
              !selectedDate || !selectedTime || isSubmitting
                ? 'bg-dark-700 text-slate-500 cursor-not-allowed'
                : 'bg-primary-600 hover:bg-primary-500 shadow-lg shadow-primary-600/20 hover:scale-105 active:scale-95'
            }`}
          >
            {isSubmitting ? (
              <>
                 <Loader2 className="w-4 h-4 animate-spin" />
                 <span>Booking...</span>
              </>
            ) : (
              <span>Confirm Booking</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookSessionModal;
