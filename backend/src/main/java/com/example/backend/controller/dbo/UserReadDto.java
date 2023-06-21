package com.example.backend.controller.dbo;

import java.util.Set;

public class UserReadDto {
    private Long userId;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phone;
    private String address;
    private String image;
    private String description;
    private Set<UserMessageReadDto> userMessage;
    private Set<UserFlightIdReadDto> userFlightId;

    public Long getUserId() {
        return userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getPhone() {
        return phone;
    }

    public String getAddress() {
        return address;
    }

    public String getImage() {
        return image;
    }

    public String getDescription() {
        return description;
    }

    public Set<UserMessageReadDto> getUserMessage() {
        return userMessage;
    }

    public Set<UserFlightIdReadDto> getUserFlightId() {
        return userFlightId;
    }

    public static final class UserReadDtoBuilder {
        private Long userId;
        private String firstName;
        private String lastName;
        private String email;
        private String password;
        private String phone;
        private String address;
        private String image;
        private String description;
        private Set<UserMessageReadDto> userMessage;
        private Set<UserFlightIdReadDto> userFlightId;

        private UserReadDtoBuilder() {
        }

        public static UserReadDtoBuilder aUserReadDto() {
            return new UserReadDtoBuilder();
        }

        public UserReadDtoBuilder withUserId(Long userId) {
            this.userId = userId;
            return this;
        }

        public UserReadDtoBuilder withFirstName(String firstName) {
            this.firstName = firstName;
            return this;
        }

        public UserReadDtoBuilder withLastName(String lastName) {
            this.lastName = lastName;
            return this;
        }

        public UserReadDtoBuilder withEmail(String email) {
            this.email = email;
            return this;
        }

        public UserReadDtoBuilder withPassword(String password) {
            this.password = password;
            return this;
        }

        public UserReadDtoBuilder withPhone(String phone) {
            this.phone = phone;
            return this;
        }

        public UserReadDtoBuilder withAddress(String address) {
            this.address = address;
            return this;
        }

        public UserReadDtoBuilder withImage(String image) {
            this.image = image;
            return this;
        }

        public UserReadDtoBuilder withDescription(String description) {
            this.description = description;
            return this;
        }

        public UserReadDtoBuilder withUserMessage(Set<UserMessageReadDto> userMessage) {
            this.userMessage = userMessage;
            return this;
        }

        public UserReadDtoBuilder withUserFlightId(Set<UserFlightIdReadDto> userFlightId) {
            this.userFlightId = userFlightId;
            return this;
        }

        public UserReadDto build() {
            UserReadDto userReadDto = new UserReadDto();
            userReadDto.userId = this.userId;
            userReadDto.firstName = this.firstName;
            userReadDto.lastName = this.lastName;
            userReadDto.email = this.email;
            userReadDto.password = this.password;
            userReadDto.phone = this.phone;
            userReadDto.address = this.address;
            userReadDto.image = this.image;
            userReadDto.description = this.description;
            userReadDto.userMessage = this.userMessage;
            userReadDto.userFlightId = this.userFlightId;
            return userReadDto;
        }
    }
}
