import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { user } from "../../api/auth/authApi";
import { useAppSelector } from "../hooks/hooks";

export default function ProtectedRoute({ children, role}: { children: React.ReactNode, role: number }) {

  const user = useAppSelector((state) =>  state.auth);

  console.log(user)
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if(user.role_id !== role)
  {
    return children;
  }

  return children;
}