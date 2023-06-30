package com.example.backend.service;

import com.example.backend.entity.Airport;
import com.example.backend.repository.AirportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;

/**
 * The service class for managing Airport entities.
 */
@Service
public class AirportService {

    private final AirportRepository airportRepository;

    @Autowired
    public AirportService(AirportRepository airportRepository) {
        this.airportRepository = airportRepository;
    }

    /**
     * Retrieves all airports.
     *
     * @return A collection of all airports.
     */
    public Collection<Airport> getAll() {
        return airportRepository.getAllAirports();
    }
}
