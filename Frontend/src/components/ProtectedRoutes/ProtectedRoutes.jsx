import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ user, authLoading }) {
    if (authLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center font-medium">
                Checking Authentication...
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
