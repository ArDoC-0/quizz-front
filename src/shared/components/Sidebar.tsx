import React from 'react';
import "./sidebar.scss"
import Header from './Header';

const Sidebar = ({ children=null, role = 'admin' }) => {
  // Menu dynamique selon le rôle
  const menuItems = {
    admin: [
      { name: 'Dashboard', icon: '🏠' },
      { name: 'Utilisateurs', icon: '👤' },
      { name: 'Statistiques', icon: '📊' }
    ],
    prof: [
      { name: 'Questions', icon: '📝' },
      { name: 'Corrections', icon: '📑' },
      { name: 'Terminal', icon: '💻' }
    ],
    student: [
      { name: 'Examens', icon: '✍️' },
      { name: 'Résultats', icon: '🏆' }
    ]
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans antialiased">
      {/* SIDEBAR FIXED THEME */}
      <aside className="w-64 bg-[#0f172a] text-slate-400 flex flex-col shadow-xl">
        <div className="p-6 text-white font-bold text-2xl flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg"></div>
          EvalPlatform
        </div>

        <nav className="flex-1 mt-4">
          {menuItems[role].map((item, index) => (
            <div
              key={index}
              className={`sidebar-item flex items-center px-6 py-4 cursor-pointer hover:text-white ${index === 0 ? 'active' : ''}`}
            >
              <span className="mr-3 text-xl">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </div>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-700"></div>
            <div className="text-sm">
              <p className="text-white font-semibold">User Name</p>
              <p className="text-xs capitalize text-slate-500">{role}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* TOP BAR / HEADER */}
        <Header/>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            {/* {children} */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Sidebar;