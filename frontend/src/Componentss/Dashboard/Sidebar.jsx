import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Car,
  Package,
  LogOut,
  CreditCard
} from 'lucide-react';

const navItems = [
  { id: 'overview',  label: 'Overview',        icon: LayoutDashboard },
  { id: 'users',     label: 'Users',            icon: Users },
  { id: 'products',  label: 'Products',         icon: Car },
  { id: 'payments',  label: 'Payments',         icon:CreditCard },

  { id: 'packages',  label: 'Package Monitor',  icon: Package },
];

const Sidebar = ({ activePage, setActivePage }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('Token');
    localStorage.removeItem('id');
    localStorage.removeItem('username');
    navigate('/signin');
  };

  return (
    <aside className="w-56 bg-[#0a1f5c] flex flex-col h-full shrink-0">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/10">
        <h1 className="text-white text-xl font-bold tracking-tight">AutoVibe</h1>
        <p className="text-blue-300 text-xs mt-0.5 font-medium tracking-widest uppercase">Admin Console</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive = activePage === id;
          return (
            <button
              key={id}
              onClick={() => setActivePage(id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
                ${isActive
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-blue-200 hover:bg-white/10 hover:text-white'
                }`}
            >
              <Icon size={17} />
              {label}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-5 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-blue-200 hover:bg-white/10 hover:text-white transition-all"
        >
          <LogOut size={17} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
