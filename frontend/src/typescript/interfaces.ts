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