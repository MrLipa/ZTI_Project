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
export interface User {
    user_id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: string;
    description: string;
    phone: string;
    address: string;
    image: string;
    messages: string[];
    flightids: number[];
}

export interface AuthContextProps {
    auth: {
        user_id: number;
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