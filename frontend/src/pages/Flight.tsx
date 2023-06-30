import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "primereact/card";
import {
  useFlightsByIdsQuery,
  useMakeReservationMutation,
  useAddMessageMutation,
} from "./../api/ApiHooks";
import { Flight } from "../typescript/interfaces";
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import useAuth from "../hooks/useAuth";

/**
 * @typedef {Object} FlightComponentProps
 * @property {string} id - The flight ID obtained from the URL parameter.
 */

/**
 * @typedef {Object} FlightComponent
 * @description This React component displays the details of a flight and allows the user to make a reservation.
 * @returns {JSX.Element} FlightComponent
 */
const FlightComponent = () => {
  const { id = "0" } = useParams<{ id: string }>();
  const { t } = useTranslation("translations");
  const flightId = parseInt(id, 10);
  const {
    data: flightsData,
    isLoading,
    isError,
  } = useFlightsByIdsQuery([flightId]);
  const makeReservationMutation = useMakeReservationMutation();
  const addMessageMutation = useAddMessageMutation();
  const { auth } = useAuth();

  if (!auth?.userId) {
    throw new Error("User id is required");
  }

  const [flight, setFlight] = useState<Flight>({
    id: 0,
    originCountry: "",
    originCity: "",
    originImage: "",
    destinationCountry: "",
    destinationCity: "",
    destinationImage: "",
    price: 0,
    date: "",
    duration: "",
    airlines: "",
    flightClass: "",
    freeSeats: 0,
  });

  useEffect(() => {
    if (flightsData) {
      setFlight(flightsData[0]);
    }
  }, [flightsData]);

  const handleClick = () => {
    makeReservationMutation.mutate({
      userId: auth?.userId,
      flightId: flightId,
    });
    addMessageMutation.mutate({
      userId: auth?.userId,
      message: `Reservation made to ${flight.destinationCountry} ${flight.destinationCity}`,
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <>
      <div style={{ display: "flex", marginBottom: "20px" }}>
        <Card style={{ flexBasis: "50%", marginRight: "20px" }}>
          <h3>{t("Origin")}</h3>
          <h6>
            {flight.originCountry} {flight.originCity}
          </h6>
          <img
            src={flight.originImage}
            alt={flight.destinationCity}
            width="400px"
            height="300px"
          />
        </Card>
        <Card style={{ flexBasis: "50%" }}>
          <h3>{t("Destination")}</h3>
          <h6>
            {flight.destinationCountry} {flight.destinationCity}
          </h6>
          <img
            src={flight.destinationImage}
            alt={flight.destinationCity}
            width="400px"
            height="300px"
          />
        </Card>
      </div>
      <Card>
        <h3>{t("Details")}</h3>
        <br />
        <div style={{ display: "flex" }}>
          <div style={{ flexBasis: "50%" }}>
            <h6>
              <i className={`${PrimeIcons.MONEY_BILL} p-mr-2`} />
              {t("Price")}: {flight.price} zł
            </h6>
            <h6>
              <i className={`${PrimeIcons.CALENDAR} p-mr-2`} />
              {t("Date")}: {flight.date}
            </h6>
            <h6>
              <i className={`${PrimeIcons.CLOCK} p-mr-2`} />
              {t("Duration")}: {flight.duration}
            </h6>
          </div>
          <div style={{ flexBasis: "50%", marginBottom: "40px" }}>
            <h6>
              <i className={`${PrimeIcons.GLOBE} p-mr-2`} />
              {t("Airline")}: {flight.airlines}
            </h6>
            <h6>
              <i className={`${PrimeIcons.STAR} p-mr-2`} />
              {t("Class")}: {flight.flightClass}
            </h6>
            <h6>
              <i className={`${PrimeIcons.USER_PLUS} p-mr-2`} />
              {t("Free Seats")}: {flight.freeSeats}
            </h6>
          </div>
        </div>
        <Button label={t("Book") ?? ""} onClick={handleClick} />
      </Card>
    </>
  );
};

export { FlightComponent };
