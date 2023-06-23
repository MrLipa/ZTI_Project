package com.example.backend.controller;

import com.example.backend.entity.Airport;
import com.example.backend.service.AirportService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@RequestMapping(path="/airport")
@Slf4j
public class AirportController {
    private final AirportService AirportService;

    @Autowired
    public AirportController(AirportService AirportService){
        this.AirportService = AirportService;
    }

    @GetMapping
    public Collection<Airport> getAll() {
        return AirportService.getAll();
    }

}
