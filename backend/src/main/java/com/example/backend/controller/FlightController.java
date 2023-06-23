package com.example.backend.controller;

import com.example.backend.dto.FlightDto;
import com.example.backend.dto.UserDto;
import com.example.backend.entity.Flight;
import com.example.backend.entity.Flight;
import com.example.backend.entity.User;
import com.example.backend.service.FlightService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Map;
import java.util.List;

import static com.example.backend.mapper.FlightMapper.mapFlightDtoToFlight;


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
    public Collection<Flight> getAll() {
        return flightService.getAll();
    }

    @PutMapping(path = "{flightId}")
    public void updateFlight(@PathVariable("flightId") Long flightId, @RequestBody FlightDto flightDto){
        Flight flight = mapFlightDtoToFlight(flightDto);
        flightService.updateFlight(flightId, flight);
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
