import React from 'react'
import './scss/_button.scss'

function Button({children}) {
  return (
    <button className="block mx-auto mb-2 p-2 bg-green-500 font-semibold text-white m-auto hover:bg-green-600 transition-all">
        {children}
    </button>
  )
}

export default Button