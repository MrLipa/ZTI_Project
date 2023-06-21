package com.example.backend.controller.dbo;

public class UserMessageReadDto {
    private Long id;
    private String message;

    public Long getId() {
        return id;
    }

    public String getMessage() {
        return message;
    }

    public static final class UserMessageReadDtoBuilder {
        private Long id;
        private String message;

        private UserMessageReadDtoBuilder() {
        }

        public static UserMessageReadDtoBuilder aUserMessageReadDto() {
            return new UserMessageReadDtoBuilder();
        }

        public UserMessageReadDtoBuilder withId(Long id) {
            this.id = id;
            return this;
        }

        public UserMessageReadDtoBuilder withMessage(String message) {
            this.message = message;
            return this;
        }

        public UserMessageReadDto build() {
            UserMessageReadDto userMessageReadDto = new UserMessageReadDto();
            userMessageReadDto.id = this.id;
            userMessageReadDto.message = this.message;
            return userMessageReadDto;
        }
    }
}
