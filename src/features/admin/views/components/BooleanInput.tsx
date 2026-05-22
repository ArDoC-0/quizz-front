import React, { type ChangeEvent } from 'react'

interface fn 
{
    fn: (e: ChangeEvent) => void
}
export default function BooleanInput(fn = (e: ChangeEvent)=> e, name: string, isChecked = false) {
    return (
        <div className="flex items-center">
            <div className="flex border-gray-500 border-b">
                <input type="text" placeholder='Réponse' />
            </div>
            <div className="flex flex-col">
                <label >
                    <input type="radio" 
                    checked={isChecked} name={name} 
                    onChange={(e)=> fn(e)} 
                    className='hidden peer accent-green-400' 
                    />
                        <div className="rounded-full w-4 h-4 border-red-400 border-2 peer-checked:bg-green-500
                                peer-checked:border-green-200">
                        </div>
                </label>
            </div>
        </div>
    )
}
