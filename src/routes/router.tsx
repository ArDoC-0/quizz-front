import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import LoginPage from '../features/auth/LogInPage';
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../features/Student/Dashboard';
import UserForm from '../features/admin/views/UserForm';
import ProtectedRoute from '../shared/components/ProtectedRoute';
import Create from '../features/admin/views/Question/Create';
import { roles } from '../shared/constants/constants';
import StudentLayout from '../layouts/StudentLayout';
import Evaluation from '../features/Student/Evaluation';
import { authServices } from '../features/auth/services/authService';
import Results from '../features/Student/Results';
import Correction from '../features/trainer/views/Correction';



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
          <ProtectedRoute role={[roles.admin, 2]}>
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
          <ProtectedRoute role={[roles.admin, 2]}>
            <UserForm />
          </ProtectedRoute>
      },
      {
        path: '/admin/question/create',
        element:
          <ProtectedRoute role={[roles.admin, 2]}>
            <Create />
          </ProtectedRoute>
      }
    ]
  },
  {
    element: <StudentLayout />,
    children: [
      {
        path: '/dashboard',
        element:
          <ProtectedRoute role={[roles.student]}>
            <Dashboard />
          </ProtectedRoute>
      }
    ]
  },
  {
    // middleware: ,
    element: <ProtectedRoute role={[roles.student, roles.admin,]}>
      <Evaluation />
    </ProtectedRoute>,
    path: '/evaluation',

    // children: [
    //   {
    //     path:'/evaluation',
    //     element:

    //   }
    // ]
  },
  {
    element: <StudentLayout />,
    children: [
      {
        path: '/results',
        element:
          <ProtectedRoute role={[roles.student, roles.admin,]}>
            <Results />
          </ProtectedRoute>
      }
    ]
  },
  {
    element: <AdminLayout />,
    children: [
      {
        path: '/redaction/correction',
        element:
          <ProtectedRoute role={[roles.student, roles.admin,]}>
            <Correction />
          </ProtectedRoute>
      }
    ]
  },

]);