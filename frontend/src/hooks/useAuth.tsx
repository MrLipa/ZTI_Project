import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthProvider";
import { AuthContextProps } from "../typescript/interfaces";

const useAuth = (): Partial<AuthContextProps> => {
    const context = useContext<Partial<AuthContextProps>>(AuthContext);
    const { auth } = context;

    useDebugValue(auth, auth => auth ? "Logged In" : "Logged Out")

    return context;
}

export default useAuth;
