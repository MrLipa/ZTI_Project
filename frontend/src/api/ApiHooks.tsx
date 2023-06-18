import { useMutation, useQuery, UseMutationResult, UseQueryResult } from 'react-query';
import { Flight, User } from "../typescript/interfaces";
import useAuth from '../hooks/useAuth';
import { useToast } from '../context/ToastProvider'; 

const BASE_URL = import.meta.env.VITE_BASE_API_URL;



const sendRequest = async (url: string, method: string, data: any = null, token: string | null = null, showToast: any = null) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  const response = await fetch(url, {
    method,
    headers,
    body: data ? JSON.stringify(data) : null,
    credentials: 'include', // od ciasteczek 
  });
  

  if (!response.ok) {
    const status=response.status
    if (status === 400) {
      showToast('error', 'Error', 'Bad Request: ');
      throw new Error('Bad Request: ');
    } else if (status === 401) {
      showToast('warn', 'Warning', 'Unauthorized: ');
      throw new Error('Unauthorized: ');
    } else if (status === 409) {
      showToast('warn', 'Warning', 'Conflict: ');
      throw new Error('Conflict: ');
    } else {
      showToast('error', 'Error', 'Request failed with status: ' + status);
      throw new Error('Request failed with status: ' + status);
    }
  }
  return response.json();
};

const useUserQuery = (user_id: number): UseQueryResult<User, Error> => {
  return useQuery<User, Error>({
    queryKey: ['user', user_id],
    queryFn: () => sendRequest(`${BASE_URL}/user/${user_id}`, 'GET'),
  });
};

const useUserFlightsHistory = (user_id: number): UseQueryResult<Flight[], Error> => {
  return useQuery<Flight[], Error>({
    queryKey: ['userFlightsHistory', user_id],
    queryFn: () => sendRequest(`${BASE_URL}/user/flights_history/${user_id}`, 'GET'),
  });
};

const useFlightQuery = (): UseQueryResult<Flight[], Error> => {
  return useQuery<Flight[], Error>({
    queryKey: ['flight'],
    queryFn: () => sendRequest(`${BASE_URL}/flight`, 'GET'),
  });
};

const useFlightsByIdsQuery = (flightIds: number[]): UseQueryResult<Flight[], Error> => {
  return useQuery<Flight[], Error>({
    queryKey: ['flights', flightIds],
    queryFn: () => sendRequest(`${BASE_URL}/flight/flights_by_ids`, 'POST', { "flightIds": flightIds }),
  });
};

const useRegisterMutation = (): UseMutationResult<any, Error, { firstname: string; lastname: string; email: string; password: string }> => {
  const registerUser = async (userData: { firstname: string; lastname: string; email: string; password: string }) => {
    return sendRequest(`http://localhost:3000/register`, 'POST', userData, null, showToast);
  };

  return useMutation({
    mutationKey: 'register',
    mutationFn: registerUser,
    onError: (error: any) => {
      console.error('Wystąpił błąd podczas rejestracji:', error);
      if (error.response && error.response.status) {
        console.error('Status code:', error.response.status);
      }
    },
    onSuccess: () => {
      console.log('Registration was successful');
    }
  });
};

const useLoginMutation = (): UseMutationResult<any, Error, { email: string; password: string }> => {
  const { setAuth } = useAuth();
  const { showToast } = useToast();
  const loginUser = async (userData: { email: string; password: string }) => {
    return sendRequest(`${BASE_URL}/login`, 'POST', userData, null, showToast);
  };

  return useMutation({
    mutationKey: 'login',
    mutationFn: loginUser,
    onError: (error: Error) => {
      console.error('Wystąpił błąd podczas logowania:', error.message);
    },
    onSuccess: (data) => {
      setAuth({
        roles: [2137],
        token: data.accessToken,
      });
      showToast('success', 'Zalogowano pomyślnie', 'Zostałeś pomyślnie zalogowany');
    }
  });
};

const refresh = async () => {
  try {
    const data = await sendRequest(`${BASE_URL}/refresh`, "GET");
    return data;
  } catch (error) {
    console.error(error);
  }
};

const logout = async () => {
  try {
    const data = await sendRequest(`${BASE_URL}/logout`, "GET");
    return data;
  } catch (error) {
    console.error(error);
  }
};

const useMakeReservationMutation = (): UseMutationResult<any, Error, { email: string; flightId: string }> => {
  const makeReservation = async (reservationData: { email: string; flightId: string }) => {
    return sendRequest(`${BASE_URL}/reservation`, 'POST', reservationData);
  };

  return useMutation({
    mutationKey: 'makeReservation',
    mutationFn: makeReservation,
    onError: (error: Error) => {
      console.error('Wystąpił błąd podczas tworzenia rezerwacji:', error.message);
    },
  });
};

const useCancelReservationMutation = (): UseMutationResult<any, Error, { email: string; flightId: string }> => {
  const cancelReservation = async (reservationData: { email: string; flightId: string }) => {
    return sendRequest(`${BASE_URL}/reservation/cancel`, 'POST', reservationData);
  };

  return useMutation({
    mutationKey: 'cancelReservation',
    mutationFn: cancelReservation,
    onError: (error: Error) => {
      console.error('Wystąpił błąd podczas anulowania rezerwacji:', error.message);
    },
  });
};

const useUpdateUserMutation = (): UseMutationResult<any, Error, Partial<User>> => {
  const updateUser = async (userData: Partial<User>) => {
    return sendRequest(`${BASE_URL}/user`, 'PUT', userData);
  };

  return useMutation({
    mutationKey: 'updateUser',
    mutationFn: updateUser,
    onError: (error: Error) => {
      console.error('Wystąpił błąd podczas aktualizacji danych użytkownika:', error.message);
    },
  });
};

export {
  BASE_URL,
  sendRequest,
  useUserQuery,
  useUserFlightsHistory,
  useFlightQuery,
  useFlightsByIdsQuery,
  useRegisterMutation,
  useLoginMutation,
  refresh,
  logout,
  useMakeReservationMutation,
  useCancelReservationMutation,
  useUpdateUserMutation,
};
