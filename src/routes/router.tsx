import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import LoginPage from '../features/auth/LogInPage';
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../features/admin/views/Dashboard';
import UserForm from '../features/admin/views/UserForm';



export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage/>
  },
  {
    element: <AdminLayout/>,
    children: [
      {
        path: 'admin/dashboard',
        element: <Dashboard/>
      }
    ]
  },
  {
    element: <AdminLayout/>,
    children: [
      {
        path: '/admin/user/create',
        element: <UserForm/>
      }
    ]
  }
]);