package com.example.backend.repository;

import com.example.backend.entity.Airport;
import com.example.backend.entity.Flight;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import java.util.Collection;

/**
 * The repository interface for managing Airport entities in the graph database.
 * It extends the Neo4jRepository interface, providing CRUD operations for Airport entities.
 */
public interface AirportRepository extends Neo4jRepository<Airport, Long> {

    /**
     * Retrieves all airports from the graph database.
     *
     * @return A collection of all airports.
     */
    @Query("MATCH (a:Airport)-[r:Flight]->(b:Airport) RETURN a")
    Collection<Airport> getAllAirports();

}
