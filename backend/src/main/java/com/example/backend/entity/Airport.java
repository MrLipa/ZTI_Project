package com.example.backend.entity;

import com.fasterxml.jackson.annotation.*;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.List;

/**
 * The Airport class represents the airport entity in the system. It is used to store information
 * about the airport such as its unique identifier (id), city, country, and image.
 *
 * It also contains two lists of Flight objects, one representing flights outgoing from the
 * airport and the other representing flights incoming to the airport.
 *
 * This class is annotated with @Node, indicating that it is a node entity in the graph database
 * (Neo4j). The relationships to other nodes (flights) are represented by @Relationship
 * annotations.
 *
 * The nested AirportBuilder class, which follows the Builder design pattern,
 * is used for constructing instances of the Airport class.
 *
 * @author YourName
 * @version 1.0
 * @since 2023-06-30
 */

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
    private List<Flight> flightsOutgoing;

    @JsonIgnore
    @JsonBackReference
    @Relationship(type="Flight", direction = Relationship.Direction.INCOMING)
    private List<Flight> flightsIncoming;

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

    public List<Flight> getFlightsOutgoing() {
        return flightsOutgoing;
    }

    public void setFlightsOutgoing(List<Flight> flightsOutgoing) {
        this.flightsOutgoing = flightsOutgoing;
    }

    public List<Flight> getFlightsIncoming() {
        return flightsIncoming;
    }

    public void setFlightsIncoming(List<Flight> flightsIncoming) {
        this.flightsIncoming = flightsIncoming;
    }

    public static class AirportBuilder {
        private Long id;
        private String city;
        private String country;
        private String image;
        private List<Flight> flightsOutgoing;
        private List<Flight> flightsIncoming;

        private AirportBuilder() {
        }

        public static AirportBuilder anAirport() {
            return new AirportBuilder();
        }

        public AirportBuilder withId(Long id) {
            this.id = id;
            return this;
        }

        public AirportBuilder withCity(String city) {
            this.city = city;
            return this;
        }

        public AirportBuilder withCountry(String country) {
            this.country = country;
            return this;
        }

        public AirportBuilder withImage(String image) {
            this.image = image;
            return this;
        }

        public AirportBuilder withFlightsOutgoing(List<Flight> flightsOutgoing) {
            this.flightsOutgoing = flightsOutgoing;
            return this;
        }

        public AirportBuilder withFlightsIncoming(List<Flight> flightsIncoming) {
            this.flightsIncoming = flightsIncoming;
            return this;
        }

        public Airport build() {
            Airport airport = new Airport();
            airport.id = this.id;
            airport.city = this.city;
            airport.country = this.country;
            airport.image = this.image;
            airport.flightsOutgoing = this.flightsOutgoing;
            airport.flightsIncoming = this.flightsIncoming;
            return airport;
        }
    }
}
