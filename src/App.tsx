import { useState } from 'react'

import './App.css'
import './shared/styles/main.scss'
import LoginPage from './features/auth/LogInPage'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'
function App() {

  return <RouterProvider router={router}/>
}

export default App
