import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { AuthContextProps } from "../typescript/interfaces";

/**
 * @typedef {Object} RequireAuthProps
 * @description Props for the RequireAuth component.
 * @property {number[]} [allowedRoles] - An optional array of allowed roles.
 */
interface RequireAuthProps {
    allowedRoles?: number[];
}

/**
 * @typedef {Object} RequireAuth
 * @description This React component provides authentication protection for routes.
 * It checks if the user is authenticated and if their role is allowed to access the route.
 * If authentication is successful, it renders the nested routes (Outlet).
 * If authentication fails, it redirects to the appropriate route based on the authentication status.
 * @param {RequireAuthProps} props - The component props.
 */
const RequireAuth: React.FC<RequireAuthProps> = ({ allowedRoles }) => {
    const { auth } = useAuth() as AuthContextProps;
    const location = useLocation();

    return (
        auth?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.accessToken
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export {RequireAuth};
