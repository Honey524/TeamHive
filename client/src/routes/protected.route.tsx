import { DashboardSkeleton } from "@/components/skeleton-loaders/dashboard-skeleton";
import useAuth from "@/hooks/api/use-auth";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllWorkspacesUserIsMemberQueryFn } from "@/lib/api";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const { data: authData, isLoading } = useAuth();
  const user = authData?.user;

  const navigate = useNavigate();
  const location = useLocation();

  const { data: workspacesData } = useQuery({
    queryKey: ["userWorkspaces"],
    queryFn: getAllWorkspacesUserIsMemberQueryFn,
    enabled: !!user,
  });

  useEffect(() => {
    if (!user) return;
    const hasWorkspaceInPath = location.pathname.includes("/workspace/");
    const firstWorkspaceId = workspacesData?.workspaces?.[0]?._id;
    if (!hasWorkspaceInPath && firstWorkspaceId) {
      navigate(`/workspace/${firstWorkspaceId}`, { replace: true });
    }
  }, [user, workspacesData, location.pathname, navigate]);

  if (isLoading) {
    return <DashboardSkeleton />;
  }
  return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
