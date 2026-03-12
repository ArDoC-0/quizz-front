import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import LoginPage from '../features/auth/LogInPage';



export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage/>
  }]);