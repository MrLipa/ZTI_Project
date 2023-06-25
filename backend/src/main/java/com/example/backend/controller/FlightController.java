package com.example.backend.controller;

import com.example.backend.entity.Flight;
import com.example.backend.service.FlightService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Map;
import java.util.List;


@RestController
@RequestMapping(path="/flight")
@Slf4j
public class FlightController {
    private final FlightService flightService;

    @Autowired
    public FlightController(FlightService flightService){
        this.flightService = flightService;
    }

    @GetMapping
    public Collection<Flight> getAllFlights() {
        return flightService.getAllFlights();
    }

    @PostMapping(path = "/flights_by_ids")
    public Collection<Flight> getFlightsByIds(@RequestBody Map<String, Object> requestBody) {
        List<Integer> flightIds = (List<Integer>) requestBody.get("flightIds");
        return flightService.getFlightsByIds(flightIds);
    }

    @GetMapping("/find")
    public Collection<Flight> findFlightsByCity(@RequestParam("city_from") String cityFrom, @RequestParam("city_to") String cityTo) {
        return flightService.findFlightsByCity(cityFrom, cityTo);
    }


}
