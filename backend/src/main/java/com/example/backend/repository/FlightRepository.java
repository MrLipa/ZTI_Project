package com.example.backend.repository;

import com.example.backend.entity.Flight;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;

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

    @Query("MATCH (a:Airport)-[r:Flight]->(b:Airport) WHERE id(r) = $flightId SET r += $flightParams RETURN properties(r)")
    Flight updateFlight(Integer flightId, Flight flightParams);

    @Query("MATCH (a:Airport)-[r:Flight]->(b:Airport) WHERE id(r) IN $flightIds RETURN properties(r)")
    Collection<Flight> getFlightsByIds(List<Integer> flightIds);

    @Query("MATCH (a:Airport)-[r:Flight]->(b:Airport) WHERE (a.city = $cityFrom) AND (b.city = $cityTo) RETURN properties(r)")
    Collection<Flight> findFlightsByCity(@Param("cityFrom") String cityFrom, @Param("cityTo") String cityTo);

    @Query("MATCH (a:Airport)-[r:Flight]->(b:Airport) WHERE id(r) = $flightId SET r.freeSeats = r.freeSeats - 1")
    void freeSeat(Integer flightId);

    @Query("MATCH (a:Airport)-[r:Flight]->(b:Airport) WHERE id(r) = $flightId SET r.freeSeats = r.freeSeats - 1")
    void takeSeat(@Param("flightId") Integer flightId);
}
