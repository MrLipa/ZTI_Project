/**
 * @typedef {object} Flight
 * @property {number} id - Unikalny identyfikator lotu.
 * @property {string} originCountry - Kraj, z którego pochodzi lot.
 * @property {string} originCity - Miasto, z którego pochodzi lot.
 * @property {string} originImage - URL obrazu przedstawiającego miasto początkowe.
 * @property {string} destinationCountry - Kraj, do którego lot dociera.
 * @property {string} destinationCity - Miasto, do którego lot dociera.
 * @property {string} destinationImage - URL obrazu przedstawiającego miasto docelowe.
 * @property {number} price - Cena lotu.
 * @property {string} date - Data lotu.
 * @property {string} duration - Czas trwania lotu.
 * @property {string} airlines - Linie lotnicze obsługujące lot.
 * @property {string} flightClass - Klasa lotu (np. ekonomiczna, biznesowa).
 * @property {number} freeSeats - Liczba dostępnych wolnych miejsc na lot.
 */
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
  airlines: string;
  flightClass: string;
  freeSeats: number;
}

/**
* @typedef {object} UserMessage
* @property {number} id - Unikalny identyfikator wiadomości użytkownika.
* @property {string} message - Wiadomość użytkownika.
*/
export interface UserMessage {
  id: number;
  message: string;
}

/**
* @typedef {object} UserFlightId
* @property {number} id - Unikalny identyfikator lotu użytkownika.
* @property {number} flightId - Identyfikator lotu powiązanego z użytkownikiem.
*/
export interface UserFlightId {
  id: number;
  flightId: number;
}

/**
* @typedef {object} User
* @property {number} userId - Unikalny identyfikator użytkownika.
* @property {string} firstName - Imię użytkownika.
* @property {string} lastName - Nazwisko użytkownika.
* @property {string} email - Adres e-mail użytkownika.
* @property {string} password - Hasło użytkownika.
* @property {string} role - Rola użytkownika (np. admin, użytkownik).
* @property {string} description - Opis użytkownika.
* @property {string} phone - Numer telefonu użytkownika.
* @property {string} address - Adres użytkownika.
* @property {string} image - URL obrazu profilowego użytkownika.
* @property {UserMessage[]} userMessage - Wiadomości powiązane z użytkownikiem.
* @property {UserFlightId[]} userFlightId - Loty powiązane z użytkownikiem.
*/
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

/**
 * @typedef {object} AuthContextProps
 * @property {object} auth - Dane uwierzytelniające użytkownika.
 * @property {number} auth.userId - Unikalny identyfikator użytkownika.
 * @property {string} [auth.email] - Adres e-mail użytkownika.
 * @property {string} [auth.token] - Token uwierzytelniający użytkownika.
 * @property {string} [auth.accessToken] - Token dostępowy użytkownika.
 * @property {number[]} [auth.roles] - Role użytkownika.
 * @property {function} setAuth - Funkcja ustawiająca dane uwierzytelniające użytkownika.
 * @property {boolean} persist - Flaga określająca, czy dane uwierzytelniające mają być przechowywane.
 * @property {function} setPersist - Funkcja ustawiająca flagę określającą przechowywanie danych uwierzytelniających.
 */
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

/**
 * @typedef {object} FlightCardsProps
 * @property {string} from - Miasto początkowe.
 * @property {string} to - Miasto docelowe.
 */
export interface FlightCardsProps {
    from: string;
    to: string;
}
