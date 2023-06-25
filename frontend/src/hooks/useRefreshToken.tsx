import axios from "./../api/Axios";
import useAuth from "./useAuth";
import { AuthContextProps } from "../typescript/interfaces";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    const newAuth: Partial<AuthContextProps["auth"]> = {
      ...auth,
      userId: response.data.userId,
      roles: response.data.roles,
      accessToken: response.data.accessToken,
    };
    if (setAuth) {
      setAuth(newAuth);
    } else {
      throw new Error("Auth provider is missing");
    }
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
