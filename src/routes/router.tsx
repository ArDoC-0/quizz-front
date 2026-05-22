import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import LoginPage from '../features/auth/LogInPage';
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../features/admin/views/Dashboard';
import UserForm from '../features/admin/views/UserForm';
import ProtectedRoute from '../shared/components/ProtectedRoute';
import Form from '../features/admin/views/Question/Form/Form';
import Create from '../features/admin/views/Question/Create';



export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    element: <AdminLayout />,
    children: [
      {
        path: 'admin/dashboard',
        element:
          <ProtectedRoute role={1}>
            <Dashboard />
          </ProtectedRoute>
      }
    ]
  },
  {
    element: <AdminLayout />,
    children: [
      {
        path: '/admin/user/create',
        element:
          <ProtectedRoute role={1}>
            <UserForm />
          </ProtectedRoute>
      },
      {
        path: '/admin/question/create',
        element:
        <ProtectedRoute role = {2}>
          <Create/>
        </ProtectedRoute>
      }
    ]
  },

]);