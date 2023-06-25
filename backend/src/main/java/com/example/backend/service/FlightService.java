package com.example.backend.service;

import com.example.backend.entity.Flight;
import com.example.backend.repository.FlightRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Service
public class FlightService {

    private final FlightRepository flightRepository;

    @Autowired
    public FlightService(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;
    }

    public Collection<Flight> getAllFlights() {
        return flightRepository.getAllFlights();
    }

    public Collection<Flight> getFlightsByIds(List<Integer> userFlightIds) {
        return flightRepository.getFlightsByIds(userFlightIds);
    }

    public void takeSeat(Integer flightId) {
        flightRepository.takeSeat(flightId);
    }

    public void freeSeat(Integer flightId) {
        flightRepository.freeSeat(flightId);
    }

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