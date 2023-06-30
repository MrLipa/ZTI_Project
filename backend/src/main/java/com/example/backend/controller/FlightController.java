package com.example.backend.controller;

import com.example.backend.aop.AdditionalAuthentication;
import com.example.backend.entity.Flight;
import com.example.backend.service.FlightService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Map;
import java.util.List;

/**
 * The FlightController class serves as the controller for handling all HTTP requests involving Flight objects.
 * This class utilizes the FlightService for performing database operations and returning data to the client.
 * It handles CORS requests from specified local addresses.
 * The class is marked with the @Slf4j annotation which provides logging through the logback library.
 * Authentication is additionally secured by the @AdditionalAuthentication annotation.
 */
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@RestController
@RequestMapping(path="/flight")
@Slf4j
public class FlightController {
    private final FlightService flightService;

    /**
     * The FlightController constructor which is autowired by Spring (via the @Autowired annotation)
     * to provide an instance of FlightService.
     *
     * @param flightService The service that handles operations related to Flight objects.
     */
    @Autowired
    public FlightController(FlightService flightService){
        this.flightService = flightService;
    }

    /**
     * The getAllFlights method returns a collection of all Flight objects.
     * The method is mapped to GET requests at "/flight".
     *
     * @return A collection of all Flight objects.
     */
    @GetMapping
    public Collection<Flight> getAllFlights() {
        return flightService.getAllFlights();
    }

    /**
     * The getFlightsByIds method returns a collection of Flight objects based on a list of flight IDs.
     * The method is mapped to POST requests at "/flight/flights_by_ids".
     * The @AdditionalAuthentication annotation requires an additional level of authentication to access this method.
     *
     * @param requestBody The request body containing a list of flight IDs.
     * @return A collection of Flight objects.
     */
    @AdditionalAuthentication
    @PostMapping(path = "/flights_by_ids")
    public Collection<Flight> getFlightsByIds(@RequestBody Map<String, Object> requestBody) {
        List<Integer> flightIds = (List<Integer>) requestBody.get("flightIds");
        return flightService.getFlightsByIds(flightIds);
    }

    /**
     * The findFlightsByCity method returns a collection of Flight objects based on departure and arrival cities.
     * The method is mapped to GET requests at "/flight/find".
     *
     * @param cityFrom The departure city.
     * @param cityTo The arrival city.
     * @return A collection of Flight objects.
     */
    @GetMapping("/find")
    public Collection<Flight> findFlightsByCity(@RequestParam("city_from") String cityFrom, @RequestParam("city_to") String cityTo) {
        return flightService.findFlightsByCity(cityFrom, cityTo);
    }


}
