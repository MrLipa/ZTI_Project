import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { sendRequest1,useUserQuery } from "./../api/ApiHooks";
import { Flight, User } from "../typescript/interfaces";

const Users = () => {

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const user_id = 1;
    const { data: userData, isLoading, isError } = useUserQuery(user_id);
    const [user, setUser] = useState<User>({
      user_id: 0,
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      role: "",
      description: "",
      phone: "",
      address: "",
      image: "",
      messages: [],
      flightids: [],
    });

    useEffect(() => {
        if (userData) {
          setUser(userData);
          console.log(userData);
        }
      }, [userData]);

    return (
        <article>
            <h2>Users List</h2>
        </article>
    );
};

export default Users;