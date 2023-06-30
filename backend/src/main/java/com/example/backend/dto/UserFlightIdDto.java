package com.example.backend.dto;

/**
 * The UserFlightIdDto class is a Data Transfer Object (DTO) used to encapsulate the
 * information about a User's flight reservation. It contains the unique identifier for
 * the reservation (id) and the identifier for the flight (flightId).
 *
 * The purpose of this class is to transport data regarding a user's flight reservation
 * within the system without the need for the User entity class.
 *
 * The nested UserFlightIdDtoBuilder class, which follows the Builder design pattern, is used to
 * construct instances of the UserFlightIdDto class.
 *
 * @author YourName
 * @version 1.0
 * @since 2023-06-30
 */
public class UserFlightIdDto {
    private Long id;
    private Integer flightId;

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

    public static class UserFlightIdDtoBuilder {
        private Long id;
        private Integer flightId;

        private UserFlightIdDtoBuilder() {
        }

        public static UserFlightIdDtoBuilder aUserFlightIdDto() {
            return new UserFlightIdDtoBuilder();
        }

        public UserFlightIdDtoBuilder withId(Long id) {
            this.id = id;
            return this;
        }

        public UserFlightIdDtoBuilder withFlightId(Integer flightId) {
            this.flightId = flightId;
            return this;
        }

        public UserFlightIdDto build() {
            UserFlightIdDto userFlightIdDto = new UserFlightIdDto();
            userFlightIdDto.id = this.id;
            userFlightIdDto.flightId = this.flightId;
            return userFlightIdDto;
        }
    }
}
