import {
  useMutation,
  useQuery,
  UseMutationResult,
  UseQueryResult,
} from "react-query";
import { Flight, User, AuthContextProps } from "../typescript/interfaces";
import useAuth from "../hooks/useAuth";
import { useToast } from "../context/ToastProvider";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useQueryClient } from "react-query";

const sendRequest = async (
  axiosPrivate: any,
  url: string,
  method: string,
  data: any = null,
  showToast: any = null
) => {
  const response = await axiosPrivate.request({
    method: method,
    url: url,
    data: data,
  });
  console.log(response);
  if (response.status === 400) {
    showToast("error", "Error", "Bad Request: ");
    throw new Error("Bad Request: ");
  } else if (response.status === 401) {
    showToast("warn", "Warning", "Unauthorized: ");
    throw new Error("Unauthorized: ");
  } else if (response.status === 409) {
    showToast("warn", "Warning", "Conflict: ");
    throw new Error("Conflict: ");
  }

  return response.data;
};

const useUserQuery = (user_id: number): UseQueryResult<User, Error> => {
  const axiosPrivate = useAxiosPrivate();
  const { showToast } = useToast();

  return useQuery<User, Error>({
    queryKey: ["user", user_id],
    queryFn: () =>
      sendRequest(axiosPrivate, `/user/${user_id}`, "GET", showToast),
  });
};

const useUserFlightsHistory = (
  user_id: number
): UseQueryResult<Flight[], Error> => {
  const axiosPrivate = useAxiosPrivate();
  const { showToast } = useToast();

  return useQuery<Flight[], Error>({
    queryKey: ["userFlightsHistory", user_id],
    queryFn: () =>
      sendRequest(
        axiosPrivate,
        `/user/flights_history/${user_id}`,
        "GET",
        showToast
      ),
  });
};

const useFlightQuery = (): UseQueryResult<Flight[], Error> => {
  const axiosPrivate = useAxiosPrivate();
  const { showToast } = useToast();

  return useQuery<Flight[], Error>({
    queryKey: ["flight"],
    queryFn: () => sendRequest(axiosPrivate, `/flight`, "GET", showToast),
  });
};

const useFlightsByIdsQuery = (
  flightIds: number[]
): UseQueryResult<Flight[], Error> => {
  const axiosPrivate = useAxiosPrivate();
  const { showToast } = useToast();

  return useQuery<Flight[], Error>({
    queryKey: ["flights", flightIds],
    queryFn: () =>
      sendRequest(
        axiosPrivate,
        `/flight/flights_by_ids`,
        "POST",
        { flightIds: flightIds },
        showToast
      ),
  });
};

const useFindFlightsQuery = (
  city_from: string = "",
  city_to: string = ""
): UseQueryResult<Flight[], Error> => {
  const axiosPrivate = useAxiosPrivate();
  const { showToast } = useToast();

  return useQuery<Flight[], Error>({
    queryKey: ["flights", city_from, city_to],
    queryFn: () =>
      sendRequest(
        axiosPrivate,
        `/flight/find?city_from=${city_from}&city_to=${city_to}`,
        "GET",
        showToast
      ),
  });
};

const useMakeReservationMutation = (): UseMutationResult<
  any,
  Error,
  { user_id: number; flightId: number }
> => {
  const axiosPrivate = useAxiosPrivate();
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const { auth } = useAuth();

  const makeReservation = async (reservationData: {
    user_id: number;
    flightId: number;
  }) => {
    
    return sendRequest(
      axiosPrivate,
      `/user/made_reservation`,
      "POST",
      reservationData,
      showToast
    );
  };

  return useMutation({
    mutationKey: "makeReservation",
    mutationFn: makeReservation,
    onError: (error: Error) => {
      showToast("error", "Error", "Failed to made reservation");
    },
    onSuccess: () => {
      showToast("success", "Success", "Reservation made successfully");
      queryClient.invalidateQueries(["user", auth?.user_id]);
    },
  });
};

const useCancelReservationMutation = (): UseMutationResult<
  any,
  Error,
  { user_id: number; flightId: number }
> => {
  const axiosPrivate = useAxiosPrivate();
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const { auth } = useAuth();

  const cancelReservation = async (reservationData: {
    user_id: number;
    flightId: number;
  }) => {
    return sendRequest(
      axiosPrivate,
      `/user/cancel_reservation`,
      "POST",
      reservationData,
      showToast
    );
  };

  return useMutation({
    mutationKey: "cancelReservation",
    mutationFn: cancelReservation,
    onError: (error: Error) => {
      showToast("error", "Error", "Failed to cancel reservation");
    },
    onSuccess: () => {
      showToast("success", "Success", "Reservation canceled successfully");
      queryClient.invalidateQueries(["userFlightsHistory", auth?.user_id]);
    },
  });
};

const useAddMessageMutation = (): UseMutationResult<
  any,
  Error,
  { user_id: number; message: string }
> => {
  const axiosPrivate = useAxiosPrivate();
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const { auth } = useAuth();
  
  const addMessage = async (messageData: {
    user_id: number;
    message: string;
  }) => {
    return sendRequest(
      axiosPrivate,
      `/user/add_message`,
      "POST",
      messageData,
      showToast
    );
  };

  return useMutation({
    mutationKey: "addMessage",
    mutationFn: addMessage,
    onError: (error: Error) => {
      showToast("error", "Error", "Failed to add message");
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user", auth?.user_id]);
    },
  });
};

const useRegisterMutation = (): UseMutationResult<
  any,
  Error,
  { firstname: string; lastname: string; email: string; password: string }
> => {
  const axiosPrivate = useAxiosPrivate();
  const { showToast } = useToast();

  const registerUser = async (userData: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  }) => {
    return sendRequest(axiosPrivate, `/register`, "POST", userData, showToast);
  };

  return useMutation({
    mutationKey: "register",
    mutationFn: registerUser,
    onError: (error: any) => {
      showToast("error", "Error", "Failed to register");
    },
    onSuccess: () => {
      showToast("success", "Success", "User registered successfully");
    },
  });
};

const useLoginMutation = (): UseMutationResult<
  any,
  Error,
  { email: string; password: string }
> => {
  const { setAuth } = useAuth() as AuthContextProps;
  const axiosPrivate = useAxiosPrivate();
  const { showToast } = useToast();

  const loginUser = async (userData: { email: string; password: string }) => {
    return sendRequest(axiosPrivate, `/login`, "POST", userData, showToast);
  };

  return useMutation({
    mutationKey: "login",
    mutationFn: loginUser,
    onError: (error: Error) => {
      showToast("error", "Error", "Failed to login");
    },
    onSuccess: (data) => {
      setAuth({ roles: [2137], token: data.accessToken });
      showToast("success", "Success", "User login successfully");
    },
  });
};

const useUpdateUserMutation = (): UseMutationResult<
  any,
  Error,
  Partial<User>
> => {
  const axiosPrivate = useAxiosPrivate();
  const { showToast } = useToast();

  const updateUser = async (userData: Partial<User>) => {
    return sendRequest(axiosPrivate, `/user`, "PUT", userData, showToast);
  };

  return useMutation({
    mutationKey: "updateUser",
    mutationFn: updateUser,
    onError: (error: Error) => {
      showToast("error", "Error", "Failed to update user");
    },
    onSuccess: (data) => {
      showToast("success", "Success", "User update successfully");
    },
  });
};

export {
  useUserQuery,
  useAddMessageMutation,
  useUserFlightsHistory,
  useFlightQuery,
  useFindFlightsQuery,
  useFlightsByIdsQuery,
  useRegisterMutation,
  useLoginMutation,
  useMakeReservationMutation,
  useCancelReservationMutation,
  useUpdateUserMutation,
};
