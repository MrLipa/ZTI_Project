package com.example.backend.controller;

import com.example.backend.aop.AdditionalAuthentication;
import com.example.backend.entity.Airport;
import com.example.backend.service.AirportService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

/**
 * The AirportController class serves as the controller for handling all HTTP requests involving Airport objects.
 * This class utilizes the AirportService for performing database operations and returning data to the client.
 * It handles CORS requests from specified local addresses.
 * The class is marked with the @Slf4j annotation which provides logging through the logback library.
 * Authentication is additionally secured by the @AdditionalAuthentication annotation.
 */
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@RestController
@RequestMapping(path="/airport")
@Slf4j
public class AirportController {

    private final AirportService airportService;

    /**
     * The AirportController constructor which is autowired by Spring (via the @Autowired annotation)
     * to provide an instance of AirportService.
     *
     * @param airportService The service that handles operations related to Airport objects.
     */
    @Autowired
    public AirportController(AirportService airportService){
        this.airportService = airportService;
    }

    /**
     * The getAll method returns a collection of all Airport objects.
     * The method is mapped to GET requests at "/airport".
     * The @AdditionalAuthentication annotation requires an additional level of authentication to access this method.
     *
     * @return A collection of all Airport objects.
     */
    @AdditionalAuthentication
    @GetMapping
    public Collection<Airport> getAll() {
        return airportService.getAll();
    }

}
