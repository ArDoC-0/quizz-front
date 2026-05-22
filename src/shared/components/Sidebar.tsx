import React from 'react';
import "./sidebar.scss"
import Header from './Header';
import { useAppSelector } from '../hooks/hooks';
import { roleName } from '../utils/utils';

type menuItems = {
  name: string,
  icon: string,
  link: string
}
const Sidebar = ({menuItems, role}:{menuItems: menuItems[], role:string})  => {

  const user = useAppSelector(state => state.auth.user)
  return (
    <div className="flex h-screen bg-slate-50 font-sans antialiased">
      {/* SIDEBAR FIXED THEME */}
      <aside className="w-64 bg-[#0f172a] text-slate-400 flex flex-col shadow-xl">
        <div className="p-6 text-white font-bold text-2xl flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg"></div>
          EvalPlatform
        </div>

        <nav className="flex-1 mt-4">
          {menuItems.map((item: menuItems, index: number) => (
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
              <p className="text-white font-semibold">{user?.name +" " +user?.first_name}</p>
              <p className="text-xs capitalize text-slate-500">{roleName(user?.id)}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}

    </div>
  );
};

export default Sidebar;