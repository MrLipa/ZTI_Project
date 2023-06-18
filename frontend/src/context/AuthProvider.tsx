import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const persistedValue = localStorage.getItem("persist");
    const [persist, setPersist] = useState(persistedValue && persistedValue !== "undefined" ? JSON.parse(persistedValue) : false);

    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContext;