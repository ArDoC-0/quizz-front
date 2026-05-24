import React, { type ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

function Preview({children, fn}) {
    return (
        <div className='mt-2 relative'>
            <div className="absolute w-[20px] h-[20px] z-22 top-2 rounded-full right-2">
                <button 
                onClick={fn}
                className="cursor-pointer 
                text-red-600 
                block 
                text-xl 
                m-auto">x</button>

            </div>
            {children}
        </div>
    )
}

export default Preview