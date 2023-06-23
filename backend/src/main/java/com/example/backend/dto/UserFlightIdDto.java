package com.example.backend.dto;

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
