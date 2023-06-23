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
        Collection<Flight> flights = flightRepository.getAllFlights();
        return flights;
    }

    public Collection<Flight> getFlightsByIds(List<Integer> userFlightIds) {
        Collection<Flight> flights = flightRepository.getFlightsByIds(userFlightIds);
        return flights;
    }

    public void takeSeat(Integer flightId) {
        flightRepository.takeSeat(flightId);
    }

    public void freeSeat(Integer flightId) {
        flightRepository.freeSeat(flightId);
    }

    public Collection<Flight> findFlightsByCity(String cityFrom, String cityTo) {
        Collection<Flight> flights = flightRepository.findFlightsByCity(cityFrom, cityTo);
        return flights;
    }

    @Transactional
    public void updateFlight(Long flightId, Flight flight) {
        Flight existingFlight = flightRepository.findById(flightId).orElseThrow(() -> new IllegalStateException("Flight with id " + flightId + " does not exist"));

        if (flight.getAirlines() != null && !Objects.equals(existingFlight.getAirlines(), flight.getAirlines())) {
            existingFlight.setAirlines(flight.getAirlines());
        }

        if (flight.getFlightClass() != null && !Objects.equals(existingFlight.getFlightClass(), flight.getFlightClass())) {
            existingFlight.setFlightClass(flight.getFlightClass());
        }

        if (flight.getDate() != null && !Objects.equals(existingFlight.getDate(), flight.getDate())) {
            existingFlight.setDate(flight.getDate());
        }

        if (flight.getDistance() != null && !Objects.equals(existingFlight.getDistance(), flight.getDistance())) {
            existingFlight.setDistance(flight.getDistance());
        }

        if (flight.getDuration() != null && !Objects.equals(existingFlight.getDuration(), flight.getDuration())) {
            existingFlight.setDuration(flight.getDuration());
        }

        if (flight.getPrice() != null && !Objects.equals(existingFlight.getPrice(), flight.getPrice())) {
            existingFlight.setPrice(flight.getPrice());
        }

        if (flight.getSeats() != null && !Objects.equals(existingFlight.getSeats(), flight.getSeats())) {
            existingFlight.setSeats(flight.getSeats());
        }

        if (flight.getAirport() != null && !Objects.equals(existingFlight.getAirport(), flight.getAirport())) {
            existingFlight.setAirport(flight.getAirport());
        }
    }
}