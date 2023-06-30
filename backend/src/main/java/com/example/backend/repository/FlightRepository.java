package com.example.backend.repository;

import com.example.backend.entity.Flight;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;

/**
 * The repository interface for managing Flight entities in the graph database.
 * It extends the Neo4jRepository interface, providing CRUD operations for Flight entities.
 */
public interface FlightRepository extends Neo4jRepository<Flight, Long> {

    /**
     * Retrieves all flights from the graph database.
     *
     * @return A collection of all flights.
     */
    @Query("MATCH (a:Airport)-[r:Flight]->(b:Airport) RETURN ID(r) as id, a.country AS originCountry, a.city AS originCity, a.image as originImage, b.country AS destinationCountry, b.city AS destinationCity, b.image as destinationImage, r.distance as distance, r.date as date, r.price as price, r.duration as duration, r.airlines as airlines, r.class as flightClass, r.freeSeats as freeSeats")
    Collection<Flight> getAllFlights();

    /**
     * Finds flights from the specified city.
     *
     * @param city_from The city of origin for the flights.
     * @return A collection of flights from the specified city.
     */
    @Query("MATCH (a:Airport)-[r:Flight]->(b:Airport) WHERE a.city = $city_from RETURN ID(r) as id, a.country AS originCountry, a.city AS originCity, a.image as originImage, b.country AS destinationCountry, b.city AS destinationCity, b.image as destinationImage, r.distance as distance, r.date as date, r.price as price, r.duration as duration, r.airlines as airlines, r.class as flightClass, r.freeSeats as freeSeats")
    Collection<Flight> findFlightsFromCity(String city_from);

    /**
     * Finds flights to the specified city.
     *
     * @param city_to The destination city for the flights.
     * @return A collection of flights to the specified city.
     */
    @Query("MATCH (a:Airport)-[r:Flight]->(b:Airport) WHERE b.city = $city_to RETURN ID(r) as id, a.country AS originCountry, a.city AS originCity, a.image as originImage, b.country AS destinationCountry, b.city AS destinationCity, b.image as destinationImage, r.distance as distance, r.date as date, r.price as price, r.duration as duration, r.airlines as airlines, r.class as flightClass, r.freeSeats as freeSeats")
    Collection<Flight> findFlightsToCity(String city_to);

    /**
     * Finds flights from the specified origin city to the specified destination city.
     *
     * @param city_from The city of origin for the flights.
     * @param city_to   The destination city for the flights.
     * @return A collection of flights from the origin city to the destination city.
     */
    @Query("MATCH (a:Airport)-[r:Flight]->(b:Airport) WHERE a.city = $city_from AND b.city = $city_to RETURN ID(r) as id, a.country AS originCountry, a.city AS originCity, a.image as originImage, b.country AS destinationCountry, b.city AS destinationCity, b.image as destinationImage, r.distance as distance, r.date as date, r.price as price, r.duration as duration, r.airlines as airlines, r.class as flightClass, r.freeSeats as freeSeats")
    Collection<Flight> findFlightsFromCityToCity(String city_from, String city_to);

    /**
     * Retrieves flights with the specified IDs.
     *
     * @param flightIds The IDs of the flights to retrieve.
     * @return A collection of flights with the specified IDs.
     */
    @Query("MATCH (a:Airport)-[r:Flight]->(b:Airport) WHERE id(r) IN $flightIds RETURN ID(r) as id, a.country AS originCountry, a.city AS originCity, a.image as originImage, b.country AS destinationCountry, b.city AS destinationCity, b.image as destinationImage, r.distance as distance, r.date as date, r.price as price, r.duration as duration, r.airlines as airlines, r.class as flightClass, r.freeSeats as freeSeats")
    Collection<Flight> getFlightsByIds(List<Integer> flightIds);

    /**
     * Increases the number of available seats for the specified flight.
     *
     * @param flightId The ID of the flight to free up a seat.
     */
    @Query("MATCH (a:Airport)-[r:Flight]->(b:Airport) WHERE id(r) = $flightId SET r.freeSeats = r.freeSeats + 1")
    void freeSeat(Integer flightId);

    /**
     * Decreases the number of available seats for the specified flight.
     *
     * @param flightId The ID of the flight to take a seat.
     */
    @Query("MATCH (a:Airport)-[r:Flight]->(b:Airport) WHERE id(r) = $flightId SET r.freeSeats = r.freeSeats - 1")
    void takeSeat(@Param("flightId") Integer flightId);
}
