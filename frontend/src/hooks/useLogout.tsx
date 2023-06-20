import axios from "./../api/Axios";
import useAuth from "./useAuth";
import { AuthContextProps } from "../typescript/interfaces";

const useLogout = () => {
    const { setAuth } = useAuth() as AuthContextProps;

    const logout = async () => {
        try {
            setAuth({});
            await axios('/logout', {
                withCredentials: true
            });
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout;
