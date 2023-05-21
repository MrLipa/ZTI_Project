import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useTranslation } from 'react-i18next';
import Carousel from 'react-bootstrap/Carousel';

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

interface FlightCardProps {
  flight: Flight;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
  const { t } = useTranslation();
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={flight.image} style={{ width: '18rem', height: '200px' }} />
      <Card.Body>
        <Card.Title style={{ color: 'blue' }}>
          {flight.originCity} - {flight.destinationCity}
        </Card.Title>
        <Card.Text style={{ fontSize: '0.8rem' }}>
          {t('FlightCard_Date')} {flight.date}
        </Card.Text>
        <Card.Text style={{ color: 'red', textAlign: 'right' }}>
          {t('FlightCard_Price')} {flight.price} {t('FlightCard_Currency')}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

const FlightCards = () => {
  const [flights, setFlights] = useState<Flight[]>([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch('https://zti-project.onrender.com/flight');
        const data = await response.json();
        setFlights(data);
        console.log(flights)
      } catch (error) {
        console.error('Error fetching flights:', error);
      }
    };

    fetchFlights();
  }, []);

  const flightChunks = flights.reduce<Flight[][]>(
    (result, flight, index) => {
      const chunkIndex = Math.floor(index / 8);
      if (!result[chunkIndex]) {
        result[chunkIndex] = [];
      }
      result[chunkIndex].push(flight);
      return result;
    },
    []
  );

  return (
    <section className="py-5">
      <div className="container">
        <Carousel fade>
          {flightChunks.map((chunk, index) => (
            <Carousel.Item key={index}>
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                {chunk.map((flight) => (
                  <div className="col" key={flight.id}>
                    <FlightCard flight={flight} />
                  </div>
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default FlightCards;