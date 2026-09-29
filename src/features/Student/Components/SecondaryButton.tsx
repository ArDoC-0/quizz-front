import React from 'react'

function SecondaryButton({ children }) {
    return (
        <button className="block mx-auto mb-2 p-2 bg-blue-600 font-semibold text-white m-auto hover:bg-blue-500 transition-all">
            {children}
        </button>)
}

export default SecondaryButton