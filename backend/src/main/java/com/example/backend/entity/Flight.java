package com.example.backend.entity;

import org.springframework.data.neo4j.core.schema.*;

@RelationshipProperties
public class Flight {

    @Id @GeneratedValue
    @Property("id")
    private Long id;

    @Property("airlines")
    private String airlines;

    @Property("class")
    private String flightClass;

    @Property("date")
    private String date;

    @Property("distance")
    private Integer distance;

    @Property("duration")
    private String duration;

    @Property("price")
    private Integer price;

    @Property("freeSeats")
    private Integer seats;

    @TargetNode
    private Airport airport;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAirlines() {
        return airlines;
    }

    public void setAirlines(String airlines) {
        this.airlines = airlines;
    }

    public String getFlightClass() {
        return flightClass;
    }

    public void setFlightClass(String flightClass) {
        this.flightClass = flightClass;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Integer getDistance() {
        return distance;
    }

    public void setDistance(Integer distance) {
        this.distance = distance;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getSeats() {
        return seats;
    }

    public void setSeats(Integer seats) {
        this.seats = seats;
    }

    public Airport getAirport() {
        return airport;
    }

    public void setAirport(Airport airport) {
        this.airport = airport;
    }

    public static class FlightBuilder {
        private Long id;
        private String airlines;
        private String flightClass;
        private String date;
        private Integer distance;
        private String duration;
        private Integer price;
        private Integer seats;
        private Airport airport;

        private FlightBuilder() {
        }

        public static FlightBuilder aFlight() {
            return new FlightBuilder();
        }

        public FlightBuilder withId(Long id) {
            this.id = id;
            return this;
        }

        public FlightBuilder withAirlines(String airlines) {
            this.airlines = airlines;
            return this;
        }

        public FlightBuilder withFlightClass(String flightClass) {
            this.flightClass = flightClass;
            return this;
        }

        public FlightBuilder withDate(String date) {
            this.date = date;
            return this;
        }

        public FlightBuilder withDistance(Integer distance) {
            this.distance = distance;
            return this;
        }

        public FlightBuilder withDuration(String duration) {
            this.duration = duration;
            return this;
        }

        public FlightBuilder withPrice(Integer price) {
            this.price = price;
            return this;
        }

        public FlightBuilder withSeats(Integer seats) {
            this.seats = seats;
            return this;
        }

        public FlightBuilder withAirport(Airport airport) {
            this.airport = airport;
            return this;
        }

        public Flight build() {
            Flight flight = new Flight();
            flight.id = this.id;
            flight.airlines = this.airlines;
            flight.flightClass = this.flightClass;
            flight.date = this.date;
            flight.distance = this.distance;
            flight.duration = this.duration;
            flight.price = this.price;
            flight.seats = this.seats;
            flight.airport = this.airport;
            return flight;
        }
    }
}
