package com.example.backend.dto;

import java.util.Set;

public class UserDto {
    private Long userId;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phone;
    private String address;
    private String image;
    private String description;
    private Set<UserMessageDto> userMessage;
    private Set<UserFlightIdDto> userFlightId;

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

    public Set<UserMessageDto> getUserMessage() {
        return userMessage;
    }

    public Set<UserFlightIdDto> getUserFlightId() {
        return userFlightId;
    }

    public static class UserDtoBuilder {
        private Long userId;
        private String firstName;
        private String lastName;
        private String email;
        private String password;
        private String phone;
        private String address;
        private String image;
        private String description;
        private Set<UserMessageDto> userMessage;
        private Set<UserFlightIdDto> userFlightId;

        private UserDtoBuilder() {
        }

        public static UserDtoBuilder aUserDto() {
            return new UserDtoBuilder();
        }

        public UserDtoBuilder withUserId(Long userId) {
            this.userId = userId;
            return this;
        }

        public UserDtoBuilder withFirstName(String firstName) {
            this.firstName = firstName;
            return this;
        }

        public UserDtoBuilder withLastName(String lastName) {
            this.lastName = lastName;
            return this;
        }

        public UserDtoBuilder withEmail(String email) {
            this.email = email;
            return this;
        }

        public UserDtoBuilder withPassword(String password) {
            this.password = password;
            return this;
        }

        public UserDtoBuilder withPhone(String phone) {
            this.phone = phone;
            return this;
        }

        public UserDtoBuilder withAddress(String address) {
            this.address = address;
            return this;
        }

        public UserDtoBuilder withImage(String image) {
            this.image = image;
            return this;
        }

        public UserDtoBuilder withDescription(String description) {
            this.description = description;
            return this;
        }

        public UserDtoBuilder withUserMessage(Set<UserMessageDto> userMessage) {
            this.userMessage = userMessage;
            return this;
        }

        public UserDtoBuilder withUserFlightId(Set<UserFlightIdDto> userFlightId) {
            this.userFlightId = userFlightId;
            return this;
        }

        public UserDto build() {
            UserDto userDto = new UserDto();
            userDto.userId = this.userId;
            userDto.firstName = this.firstName;
            userDto.lastName = this.lastName;
            userDto.email = this.email;
            userDto.password = this.password;
            userDto.phone = this.phone;
            userDto.address = this.address;
            userDto.image = this.image;
            userDto.description = this.description;
            userDto.userMessage = this.userMessage;
            userDto.userFlightId = this.userFlightId;
            return userDto;
        }
    }
}
