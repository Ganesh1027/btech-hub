import React, { useState } from 'react';

interface WelcomeModalProps {
  onNameSubmit: (name: string) => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onNameSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onNameSubmit(name.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-100 dark:bg-slate-900 z-50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 h-12 w-12 text-indigo-500 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/50 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3.5a1 1 0 00.02 1.84l7 3.5a1 1 0 00.748 0l7-3.5a1 1 0 00.02-1.84l-7-3.5zM3 9.363l7 3.5v5.327l-7-3.5V9.363zM17 9.363v5.327l-7 3.5v-5.327l7-3.5z" />
            </svg>
        </div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Welcome to the B.Tech Study Hub</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">Please enter your name to join the community.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="sr-only">Your Name</label>
            <input 
              type="text" 
              id="name" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required 
              placeholder="Enter your name..."
              className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm"
              autoFocus
            />
          </div>
          <button 
            type="submit" 
            className="w-full px-4 py-3 text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition duration-300 ease-in-out disabled:bg-indigo-400 disabled:cursor-not-allowed"
            disabled={!name.trim()}
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default WelcomeModal;
