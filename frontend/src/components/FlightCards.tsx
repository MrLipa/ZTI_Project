import React, { useState, useEffect } from "react";
import { Carousel, CarouselResponsiveOption } from "primereact/carousel";
import { useFindFlightsQuery, useFlightQuery } from "../api/ApiHooks"; // Import the hook
import { Flight, FlightCardsProps } from "../typescript/interfaces";
import { useTranslation } from "react-i18next";

/**
 * @typedef {Object} FlightCards
 * @property {string} from - The origin city for the flights.
 * @property {string} to - The destination city for the flights.
 * @description This React component displays a carousel of flight cards based on the origin and destination cities.
 * It uses the useFindFlightsQuery hook from the API to fetch the flight data.
 */
const FlightCards: React.FC<FlightCardsProps> = ({ from, to }) => {
  const { t } = useTranslation();
  const { data: flights, isLoading, isError } = useFindFlightsQuery(from, to);
  const responsiveOptions: CarouselResponsiveOption[] = [
    {
      breakpoint: "1199px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "991px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const flightTemplate = (flight: Flight) => {
    return (
      <div className="p-card p-component" style={{ width: "18rem" }}>
        <div className="p-card-body">
          <img
            src={flight.destinationImage}
            alt={flight.destinationCity}
            style={{ width: "100%", height: "200px" }}
          />
          <div className="p-card-title p-component" style={{ color: "blue" }}>
            {flight.originCity} - {flight.destinationCity}
          </div>
          <div className="p-card-content p-component">
            <span style={{ fontSize: "0.8rem" }}>
              {t("FlightCard_Date")} {flight.date}
            </span>
            <div style={{ color: "red", textAlign: "right" }}>
              {t("FlightCard_Price")} {flight.price} {t("FlightCard_Currency")}
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  } 
  
  if (isError) {
    return <div>Error loading flights</div>;
  }

  return (
    <div className="card">
      <Carousel
        value={flights}
        numVisible={3}
        numScroll={3}
        responsiveOptions={responsiveOptions}
        itemTemplate={flightTemplate}
      />
    </div>
  );
}

export {FlightCards};
