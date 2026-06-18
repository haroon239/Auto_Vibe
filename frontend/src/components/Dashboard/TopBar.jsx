import React from 'react';
import { Bell, Settings } from 'lucide-react';

const TopBar = () => {
  const username = localStorage.getItem('username') || 'Admin';

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0">
      {/* Search */}
      <div className="flex items-center gap-2 bg-[#f6f8fc] rounded-full px-4 py-2 w-72">
        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search analytics..."
          className="bg-transparent text-sm text-gray-500 outline-none w-full"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <button className="relative text-gray-500 hover:text-gray-700">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <button className="text-gray-500 hover:text-gray-700">
          <Settings size={20} />
        </button>
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">
          {username.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
};

export default TopBar;
