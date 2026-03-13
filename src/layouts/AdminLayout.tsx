import React from 'react'
import Sidebar from '../shared/components/Sidebar'
import { Outlet } from 'react-router-dom'
import Header from '../shared/components/Header'

export default function AdminLayout() {
    return (
        <div className='flex layout'>
            <Sidebar />
            {/* <div className="bg-gray-200">
                <Header />
            </div> */}

            <main className="flex-1 flex h-screen flex-col overflow-hidden bg-gray-200">
                {/* TOP BAR / HEADER */}
                <Header />

                {/* CONTENT */}
                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-6xl mx-auto">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    )
}
