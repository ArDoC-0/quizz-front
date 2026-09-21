import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { user } from "../../api/auth/authApi";
import { useAppSelector } from "../hooks/hooks";
import { useEffect } from "react";

export default function ProtectedRoute({ children, role, options = [{ default: true }] }: { children: React.ReactNode, role: number[], options: Record<string, boolean> }) {

  const user = useAppSelector((state) => state.auth.isInitialized);

  console.log(user)
  // if (!user) {
  //   return <Navigate to="/login" replace />;
  // }

  // if (role.includes(user.role_id))
  // {
  //   // options.forEach((e, i) => {
  //   //   if (e.key) {
  //   //     return <Navigate to="/login" replace />;

  //   //   }
  //   // })
  //   return children;
  // }

  return children;
}