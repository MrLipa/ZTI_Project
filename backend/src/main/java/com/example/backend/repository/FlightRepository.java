package com.example.backend.repository;

import com.example.backend.entity.Flight;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;

public interface FlightRepository extends Neo4jRepository<Flight, Long> {

    @Query("MATCH (a:Airport)-[r:Flight]->(b:Airport) RETURN ID(r) as id, a.country AS originCountry, a.city AS originCity, a.image as originImage, b.country AS destinationCountry, b.city AS destinationCity, b.image as destinationImage, r.distance as distance, r.date as date, r.price as price, r.duration as duration, r.airlines as airlines, r.class as flightClass, r.freeSeats as freeSeats")
    Collection<Flight> getAllFlights();

    @Query("MATCH (a:Airport)-[r:Flight]->(b:Airport) WHERE a.city = $city_from RETURN ID(r) as id, a.country AS originCountry, a.city AS originCity, a.image as originImage, b.country AS destinationCountry, b.city AS destinationCity, b.image as destinationImage, r.distance as distance, r.date as date, r.price as price, r.duration as duration, r.airlines as airlines, r.class as flightClass, r.freeSeats as freeSeats")
    Collection<Flight> findFlightsFromCity(String city_from);

    @Query("MATCH (a:Airport)-[r:Flight]->(b:Airport) WHERE b.city = $city_to RETURN ID(r) as id, a.country AS originCountry, a.city AS originCity, a.image as originImage, b.country AS destinationCountry, b.city AS destinationCity, b.image as destinationImage, r.distance as distance, r.date as date, r.price as price, r.duration as duration, r.airlines as airlines, r.class as flightClass, r.freeSeats as freeSeats")
    Collection<Flight> findFlightsToCity(String city_to);

    @Query("MATCH (a:Airport)-[r:Flight]->(b:Airport) WHERE a.city = $city_from AND b.city = $city_to RETURN ID(r) as id, a.country AS originCountry, a.city AS originCity, a.image as originImage, b.country AS destinationCountry, b.city AS destinationCity, b.image as destinationImage, r.distance as distance, r.date as date, r.price as price, r.duration as duration, r.airlines as airlines, r.class as flightClass, r.freeSeats as freeSeats")
    Collection<Flight> findFlightsFromCityToCity(String city_from, String city_to);

    @Query("MATCH (a:Airport)-[r:Flight]->(b:Airport) WHERE id(r) IN $flightIds RETURN ID(r) as id, a.country AS originCountry, a.city AS originCity, a.image as originImage, b.country AS destinationCountry, b.city AS destinationCity, b.image as destinationImage, r.distance as distance, r.date as date, r.price as price, r.duration as duration, r.airlines as airlines, r.class as flightClass, r.freeSeats as freeSeats")
    Collection<Flight> getFlightsByIds(List<Integer> flightIds);

    @Query("MATCH (a:Airport)-[r:Flight]->(b:Airport) WHERE id(r) = $flightId SET r.freeSeats = r.freeSeats + 1")
    void freeSeat(Integer flightId);

    @Query("MATCH (a:Airport)-[r:Flight]->(b:Airport) WHERE id(r) = $flightId SET r.freeSeats = r.freeSeats - 1")
    void takeSeat(@Param("flightId") Integer flightId);
}
