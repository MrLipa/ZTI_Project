package com.example.backend.service;

import com.example.backend.entity.Airport;
import com.example.backend.repository.AirportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class AirportService {

    private final AirportRepository airportRepository;

    @Autowired
    public AirportService(AirportRepository airportRepository) {
        this.airportRepository = airportRepository;
    }

    public Collection<Airport> getAll() {
        return airportRepository.getAllAirports();
    }
}