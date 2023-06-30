package com.example.backend.dto;

/**
 * The UserMessageDto class is a Data Transfer Object (DTO) used to encapsulate
 * the user message details. It contains the unique identifier for the message (id)
 * and the message content.
 *
 * This class is used to transport data about user messages within the system without
 * directly interacting with the User entity class.
 *
 * The nested UserMessageDtoBuilder class, which follows the Builder design pattern,
 * is used for constructing instances of the UserMessageDto class.
 *
 * @author YourName
 * @version 1.0
 * @since 2023-06-30
 */
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
