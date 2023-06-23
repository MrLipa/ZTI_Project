package com.example.backend.dto;

public class UserMessageDto {
    private Long id;
    private String message;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public static class UserMessageDtoBuilder {
        private Long id;
        private String message;

        private UserMessageDtoBuilder() {
        }

        public static UserMessageDtoBuilder aUserMessageDto() {
            return new UserMessageDtoBuilder();
        }

        public UserMessageDtoBuilder withId(Long id) {
            this.id = id;
            return this;
        }

        public UserMessageDtoBuilder withMessage(String message) {
            this.message = message;
            return this;
        }

        public UserMessageDto build() {
            UserMessageDto userMessageDto = new UserMessageDto();
            userMessageDto.id = this.id;
            userMessageDto.message = this.message;
            return userMessageDto;
        }
    }
}
