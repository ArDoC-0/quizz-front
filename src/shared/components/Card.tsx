import React, { type ReactNode } from 'react'

export default function Card({ children }: { children: ReactNode }) {  
    return (
    <div className='card w-full flex-1 p-4 rounded-3xl shadow-2xl bg-white'>
        {children}
    </div>
  )
}
