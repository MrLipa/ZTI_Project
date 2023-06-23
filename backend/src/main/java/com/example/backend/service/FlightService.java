package com.example.backend.service;

import com.example.backend.entity.Flight;
import com.example.backend.repository.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Set;

@Service
public class FlightService {

    private final FlightRepository flightRepository;

    @Autowired
    public FlightService(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;
    }

    public Collection<Flight> getAll() {
        Collection<Flight> allFlights = flightRepository.getAllFlights();
        for (Flight flight : allFlights) {
            System.out.println(flight);
            System.out.println(flight.getId());
        }
        return allFlights;
    }

    public Set<Flight> getFlightsByIds(List<Integer> userFlightId) {
    }

    public void takeSeat(Integer flightId) {
    }

    public void freeSeat(Integer flightId) {
    }

    public void updateFlight(Long flightId, Flight flight) {
    }

    public Collection<Flight> findFlightsByCity(String cityFrom, String cityTo) {
    }
}