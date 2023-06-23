package com.example.backend.entity;

import com.fasterxml.jackson.annotation.*;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.List;

@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Node
public class Airport {
    @Id @GeneratedValue
    private Long id;

    private String city;

    private String country;

    private String image;

    @JsonIgnore
    @JsonManagedReference
    @Relationship(type="Flight", direction = Relationship.Direction.OUTGOING)
    private List<Flight> flights_outgoing;

    @JsonIgnore
    @JsonBackReference
    @Relationship(type="Flight", direction = Relationship.Direction.INCOMING)
    private List<Flight> flights_incoming;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public List<Flight> getFlights_outgoing() {
        return flights_outgoing;
    }

    public void setFlights_outgoing(List<Flight> flights_outgoing) {
        this.flights_outgoing = flights_outgoing;
    }

    public List<Flight> getFlights_incoming() {
        return flights_incoming;
    }

    public void setFlights_incoming(List<Flight> flights_incoming) {
        this.flights_incoming = flights_incoming;
    }
}
