import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
import { AuthContextProps } from "../typescript/interfaces";

/**
 * @typedef {Object} PersistLogin
 * @description This React component provides persistent login functionality.
 * It checks if the user has a valid access token and refreshes the token if needed.
 * If persistent login is enabled and the access token is not available, it verifies the refresh token.
 * If the verification is successful, it renders the nested routes (Outlet).
 * If the verification fails or persistent login is disabled, it either shows a loading indicator or renders the nested routes (Outlet).
 */
const PersistLogin: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth() as AuthContextProps;

    useEffect(() => {
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }
            catch (err) {
                console.error(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }

        !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

        return () => { isMounted = false; };
    }, [])

    return (
        <>
            {!persist
                ? <Outlet />
                : isLoading
                    ? <p>Loading...</p>
                    : <Outlet />
            }
        </>
    )
}

export { PersistLogin };
