import { createContext, FunctionComponent, useState, ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({});

export const AuthProvider: FunctionComponent<AuthProviderProps> = ({
  children,
}) => {
  const [auth, setAuth] = useState<object>({});
  const persistedValue = localStorage.getItem("persist");
  const [persist, setPersist] = useState<boolean | null>(
    persistedValue && persistedValue !== "undefined"
      ? JSON.parse(persistedValue)
      : false
  );

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
