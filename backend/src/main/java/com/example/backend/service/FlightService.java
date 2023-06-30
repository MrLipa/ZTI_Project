package com.example.backend.service;

import com.example.backend.entity.Flight;
import com.example.backend.repository.FlightRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

/**
 * The service class for managing Flight entities.
 */
@Service
public class FlightService {

    private final FlightRepository flightRepository;

    @Autowired
    public FlightService(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;
    }

    /**
     * Retrieves all flights.
     *
     * @return A collection of all flights.
     */
    public Collection<Flight> getAllFlights() {
        return flightRepository.getAllFlights();
    }

    /**
     * Retrieves flights with the specified flight IDs.
     *
     * @param userFlightIds The flight IDs to retrieve.
     * @return A collection of flights with the specified IDs.
     */
    public Collection<Flight> getFlightsByIds(List<Integer> userFlightIds) {
        return flightRepository.getFlightsByIds(userFlightIds);
    }

    /**
     * Takes a seat on the specified flight.
     *
     * @param flightId The ID of the flight.
     */
    public void takeSeat(Integer flightId) {
        flightRepository.takeSeat(flightId);
    }

    /**
     * Frees up a seat on the specified flight.
     *
     * @param flightId The ID of the flight.
     */
    public void freeSeat(Integer flightId) {
        flightRepository.freeSeat(flightId);
    }

    /**
     * Finds flights based on the specified cities.
     *
     * @param cityFrom The origin city.
     * @param cityTo   The destination city.
     * @return A collection of flights matching the specified cities.
     */
    public Collection<Flight> findFlightsByCity(String cityFrom, String cityTo) {
        if (cityFrom.isEmpty() && cityTo.isEmpty()) {
            return getAllFlights();
        } else if (!cityFrom.isEmpty() && cityTo.isEmpty()) {
            return flightRepository.findFlightsFromCity(cityFrom);
        } else if (cityFrom.isEmpty() && !cityTo.isEmpty()) {
            return flightRepository.findFlightsToCity(cityTo);
        } else {
            return flightRepository.findFlightsFromCityToCity(cityFrom, cityTo);
        }
    }
}
