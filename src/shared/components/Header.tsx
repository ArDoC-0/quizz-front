import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header() {
    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
            <h1 className="text-slate-800 font-semibold text-lg">Tableau de bord</h1>
            <div className="flex items-center gap-4">
                <div  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                    Nouvelle Action
                </div>

            </div>
        </header>)
}
