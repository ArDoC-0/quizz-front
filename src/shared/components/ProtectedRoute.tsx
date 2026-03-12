import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {

  const user = useSelector((state: any) => state.auth.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}