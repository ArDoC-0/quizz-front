import React from 'react'
import Sidebar from '../shared/components/Sidebar'
import { Outlet } from 'react-router-dom'

export default function AdminLayout() {
    return (
        <div className='layout'>
            <Sidebar>
                <main>
                    <Outlet/>
                </main>
            </Sidebar>
        </div>
    )
}
