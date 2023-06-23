package com.example.backend.repository;

import com.example.backend.entity.Airport;
import com.example.backend.entity.Flight;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import java.util.Collection;

public interface AirportRepository extends Neo4jRepository<Airport, Long> {
    @Query("MATCH (a:Airport)-[r:Flight]->(b:Airport) RETURN a")
    Collection<Airport> getAllAirports();

}
