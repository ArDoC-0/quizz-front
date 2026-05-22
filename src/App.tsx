import { useEffect, useState } from 'react'

import './App.css'
import './shared/styles/main.scss'
import LoginPage from './features/auth/LogInPage'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'
import { useAppDispatch } from './shared/hooks/hooks'
import { initializeAuth } from './features/auth/authSlice'
function App() {

  const dispatch = useAppDispatch()
  useEffect(()=> {
    dispatch(initializeAuth())
  })
  return <RouterProvider router={router}/>
}

export default App
