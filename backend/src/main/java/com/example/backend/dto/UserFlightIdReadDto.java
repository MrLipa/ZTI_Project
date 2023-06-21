package com.example.backend.dto;

public class UserFlightIdReadDto {
    private Long id;
    private Integer flightId;

    public Long getId() {
        return id;
    }

    public Integer getFlightId() {
        return flightId;
    }

    public static final class UserFlightIdReadDtoBuilder {
        private Long id;
        private Integer flightId;

        private UserFlightIdReadDtoBuilder() {
        }

        public static UserFlightIdReadDtoBuilder aUserFlightIdReadDto() {
            return new UserFlightIdReadDtoBuilder();
        }

        public UserFlightIdReadDtoBuilder withId(Long id) {
            this.id = id;
            return this;
        }

        public UserFlightIdReadDtoBuilder withFlightId(Integer flightId) {
            this.flightId = flightId;
            return this;
        }

        public UserFlightIdReadDto build() {
            UserFlightIdReadDto userFlightIdReadDto = new UserFlightIdReadDto();
            userFlightIdReadDto.id = this.id;
            userFlightIdReadDto.flightId = this.flightId;
            return userFlightIdReadDto;
        }
    }
}
