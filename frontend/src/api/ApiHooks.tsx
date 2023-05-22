import { useMutation, useQuery, UseMutationResult, UseQueryResult } from 'react-query';
const BASE_URL = import.meta.env.VITE_BASE_API_URL;

interface Flight {
  id: number;
  originCountry: string;
  originCity: string;
  destinationCountry: string;
  destinationCity: string;
  image: string;
  price: number;
  date: string;
  duration: string;
  airline: string;
  class: string;
  freeSeats: number;
}

const sendRequest = async (url: string, method: string, data: any = null) => {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : null,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return response.json();
};

const useFlightQuery = (): UseQueryResult<Flight[], Error> => {
  return useQuery<Flight[], Error>({
    queryKey: ['flight'],
    queryFn: () => sendRequest(`${BASE_URL}/flight`, 'GET'),
  });
};

const useFlightsByIdsQuery = (flightIds: string[]): UseQueryResult<Flight[], Error> => {
  return useQuery<Flight[], Error>({
    queryKey: ['flights', flightIds],
    queryFn: () => sendRequest(`${BASE_URL}/flight/flights_by_ids`, 'POST', { flightIds }),
  });
};

const useRegisterMutation = (): UseMutationResult<any, Error, { email: string; password: string }> => {
  const registerUser = async (userData: { email: string; password: string }) => {
    return sendRequest(`${BASE_URL}/register`, 'POST', userData);
  };

  return useMutation({
    mutationKey: 'register',
    mutationFn: registerUser,
    onError: (error: Error) => {
      console.error('Wystąpił błąd podczas rejestracji:', error.message);
    },
  });
};

const useLoginMutation = (): UseMutationResult<any, Error, { email: string; password: string }> => {
  const loginUser = async (userData: { email: string; password: string }) => {
    return sendRequest(`${BASE_URL}/login`, 'POST', userData);
  };

  return useMutation({
    mutationKey: 'login',
    mutationFn: loginUser,
    onError: (error: Error) => {
      console.error('Wystąpił błąd podczas logowania:', error.message);
    },
  });
};

const useRefreshQuery = <TData, TError>(queryKey: string | any[], queryFn: () => Promise<TData>): UseQueryResult<TData, TError> => {
  return useQuery<TData, TError>({
    queryKey,
    queryFn,
    refetchOnWindowFocus: false,
  });
};

const useLogoutQuery = (): UseQueryResult<any, Error> => {
  return useQuery<any, Error>({
    queryKey: 'logout',
    queryFn: () => sendRequest(`${BASE_URL}/logout`, 'GET'),
  });
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

export {
  useFlightQuery,
  useFlightsByIdsQuery,
  useRegisterMutation,
  useLoginMutation,
  useRefreshQuery,
  useLogoutQuery,
  useMakeReservationMutation,
  useCancelReservationMutation,
};
