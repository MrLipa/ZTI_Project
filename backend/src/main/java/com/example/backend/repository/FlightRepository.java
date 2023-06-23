package com.example.backend.repository;

import com.example.backend.entity.Airport;
import com.example.backend.entity.Flight;
import org.springframework.data.neo4j.core.schema.*;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import java.util.Collection;
import java.util.List;

public interface FlightRepository extends Neo4jRepository<Flight, Long> {

    @Query("MATCH (a:Airport)-[r:Flight]->(b:Airport) RETURN properties(r)")
    Collection<Flight> getAllFlights();

    @Query("MATCH (a:Airport)-[r:Flight]-(b:Airport) WHERE a.city = $city_from RETURN properties(r)")
    Collection<Flight> findFlightsFromCity(String city_from);

    @Query("MATCH (a:Airport)-[r:Flight]-(b:Airport) WHERE b.city = $city_to RETURN properties(r)")
    Collection<Flight> findFlightsToCity(String city_to);

    @Query("MATCH (a:Airport)-[r:Flight]-(b:Airport) WHERE a.city = $city_from AND b.city = $city_to RETURN properties(r)")
    Collection<Flight> findFlightsFromCityToCity(String city_from, String city_to);

    @Query("MATCH (a:Airport)-[r:Flight]->(b:Airport) WHERE id(r) IN $flightIds RETURN properties(r)")
    Collection<Flight> getFlightsByIds(List<Integer> flightIds);

    @Query("MATCH (a:Airport)-[r:Flight]->(b:Airport) WHERE id(r) = $flightId SET r += $flightParams RETURN properties(r)")
    Flight updateFlight(Integer flightId, Flight flightParams);

    Collection<Flight> findFlightsByCity(String cityFrom, String cityTo);

    void freeSeat(Integer flightId);

    void takeSeat(Integer flightId);
}
