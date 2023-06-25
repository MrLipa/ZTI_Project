export interface Flight {
    id: number;
    originCountry: string;
    originCity: string;
    originImage: string;
    destinationCountry: string;
    destinationCity: string;
    destinationImage: string;
    price: number;
    date: string;
    duration: string;
    airline: string;
    class: string;
    freeSeats: number;
}

export interface UserMessage {
    id: number;
    message: string;
  }
  
  export interface UserFlightId {
    id: number;
    flightId: number;
  }
  
  export interface User {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    description: string;
    phone: string;
    address: string;
    image: string;
    userMessage: UserMessage[];
    userFlightId: UserFlightId[];
  }

export interface AuthContextProps {
    auth: {
        userId: number;
        email?: string;
        token?: string;
        accessToken?: string;
        roles?: number[];
    };
    setAuth: (authData: Partial<AuthContextProps['auth']>) => void;
    persist: boolean;
    setPersist: React.Dispatch<React.SetStateAction<boolean>>;
}


export interface FlightCardsProps {
    from: string;
    to: string;
}