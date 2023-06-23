package com.example.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "userflightid", schema = "zti_project")
public class UserFlightId {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "flightid")
    private Integer flightId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userid")
    private User user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getFlightId() {
        return flightId;
    }

    public void setFlightId(Integer flightId) {
        this.flightId = flightId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public static class UserFlightIdBuilder {
        private Long id;
        private Integer flightId;
        private User user;

        private UserFlightIdBuilder() {
        }

        public static UserFlightIdBuilder anUserFlightId() {
            return new UserFlightIdBuilder();
        }

        public UserFlightIdBuilder withId(Long id) {
            this.id = id;
            return this;
        }

        public UserFlightIdBuilder withFlightId(Integer flightId) {
            this.flightId = flightId;
            return this;
        }

        public UserFlightIdBuilder withUser(User user) {
            this.user = user;
            return this;
        }

        public UserFlightId build() {
            UserFlightId userFlightId = new UserFlightId();
            userFlightId.id = this.id;
            userFlightId.flightId = this.flightId;
            userFlightId.user = this.user;
            return userFlightId;
        }
    }
}
