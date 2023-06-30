package com.example.backend.mapper;

import com.example.backend.dto.UserFlightIdDto;
import com.example.backend.dto.UserMessageDto;
import com.example.backend.dto.UserDto;
import com.example.backend.entity.User;
import com.example.backend.entity.UserFlightId;
import com.example.backend.entity.UserMessage;

import java.util.Set;
import java.util.stream.Collectors;

/**
 * Class responsible for mapping user objects (User) to DTO objects (UserDto) and vice versa.
 */
public class UserMapper {

    /**
     * Maps a set of user objects (User) to a set of user DTO objects (UserDto).
     *
     * @param users The set of user objects (User) to be mapped.
     * @return The set of user DTO objects (UserDto).
     */
    public static Set<UserDto> mapUserToUserDtoSet(Set<User> users) {
        return users.stream()
                .map(user -> mapUserToUserDto(user))
                .collect(Collectors.toSet());
    }

    /**
     * Maps a user object (User) to a user DTO object (UserDto).
     *
     * @param user The user object (User) to be mapped.
     * @return The user DTO object (UserDto).
     */
    public static UserDto mapUserToUserDto(User user) {
        return UserDto.UserDtoBuilder.aUserDto()
                .withUserId(user.getUserId())
                .withFirstName(user.getFirstName())
                .withLastName(user.getLastName())
                .withEmail(user.getEmail())
                .withPassword(user.getPassword())
                .withPhone(user.getPhone())
                .withAddress(user.getAddress())
                .withImage(user.getImage())
                .withDescription(user.getDescription())
                .withUserMessage(mapUserMessageToUserMessageDtoSet(user))
                .withUserFlightId(mapUserFlightIdToUserFlightIdDtoSet(user))
                .build();
    }

    /**
     * Maps a set of user messages (UserMessage) to a set of user message DTO objects (UserMessageDto).
     *
     * @param user The user object (User) whose messages need to be mapped.
     * @return The set of user message DTO objects (UserMessageDto).
     */
    private static Set<UserMessageDto> mapUserMessageToUserMessageDtoSet(User user) {
        return user.getUserMessage().stream()
                .map(userMessage -> mapUserMessageToUserMessageDto(userMessage))
                .collect(Collectors.toSet());
    }

    /**
     * Maps a user message object (UserMessage) to a user message DTO object (UserMessageDto).
     *
     * @param userMessage The user message object (UserMessage) to be mapped.
     * @return The user message DTO object (UserMessageDto).
     */
    private static UserMessageDto mapUserMessageToUserMessageDto(UserMessage userMessage) {
        return UserMessageDto.UserMessageDtoBuilder.aUserMessageDto()
                .withId(userMessage.getId())
                .withMessage(userMessage.getMessage())
                .build();
    }

    /**
     * Maps a set of user flight IDs (UserFlightId) to a set of user flight ID DTO objects (UserFlightIdDto).
     *
     * @param user The user object (User) whose flight IDs need to be mapped.
     * @return The set of user flight ID DTO objects (UserFlightIdDto).
     */
    private static Set<UserFlightIdDto> mapUserFlightIdToUserFlightIdDtoSet(User user) {
        return user.getUserFlightId().stream()
                .map(userFlightId -> mapUserFlightIdToUserFlightIdDto(userFlightId))
                .collect(Collectors.toSet());
    }

    /**
     * Maps a user flight ID object (UserFlightId) to a user flight ID DTO object (UserFlightIdDto).
     *
     * @param userFlightId The user flight ID object (UserFlightId) to be mapped.
     * @return The user flight ID DTO object (UserFlightIdDto).
     */
    private static UserFlightIdDto mapUserFlightIdToUserFlightIdDto(UserFlightId userFlightId) {
        return UserFlightIdDto.UserFlightIdDtoBuilder.aUserFlightIdDto()
                .withId(userFlightId.getId())
                .withFlightId(userFlightId.getFlightId())
                .build();
    }

    /**
     * Maps a set of user DTO objects (UserDto) to a set of user objects (User).
     *
     * @param usersDto The set of user DTO objects (UserDto) to be mapped.
     * @return The set of user objects (User).
     */
    public static Set<User> mapUserDtoToUserSet(Set<UserDto> usersDto) {
        return usersDto.stream()
                .map(userDto -> mapUserDtoToUser(userDto))
                .collect(Collectors.toSet());
    }

    /**
     * Maps a user DTO object (UserDto) to a user object (User).
     *
     * @param userDto The user DTO object (UserDto) to be mapped.
     * @return The user object (User).
     */
    public static User mapUserDtoToUser(UserDto userDto) {
        return User.UserBuilder.anUser()
                .withUserId(userDto.getUserId())
                .withFirstName(userDto.getFirstName())
                .withLastName(userDto.getLastName())
                .withEmail(userDto.getEmail())
                .withPassword(userDto.getPassword())
                .withPhone(userDto.getPhone())
                .withAddress(userDto.getAddress())
                .withImage(userDto.getImage())
                .withDescription(userDto.getDescription())
                .withUserMessage(mapUserMessageDtoToUserMessageSet(userDto))
                .withUserFlightId(mapUserFlightIdDtoToUserFlightIdSet(userDto))
                .build();
    }

    /**
     * Maps a set of user message DTO objects (UserMessageDto) to a set of user message objects (UserMessage).
     *
     * @param userDto The user DTO object (UserDto) whose messages need to be mapped.
     * @return The set of user message objects (UserMessage).
     */
    private static Set<UserMessage> mapUserMessageDtoToUserMessageSet(UserDto userDto) {
        return userDto.getUserMessage().stream()
                .map(userMessageDto -> mapUserMessageDtoToUserMessage(userMessageDto))
                .collect(Collectors.toSet());
    }

    /**
     * Maps a user message DTO object (UserMessageDto) to a user message object (UserMessage).
     *
     * @param userMessageDto The user message DTO object (UserMessageDto) to be mapped.
     * @return The user message object (UserMessage).
     */
    private static UserMessage mapUserMessageDtoToUserMessage(UserMessageDto userMessageDto) {
        return UserMessage.UserMessageBuilder.anUserMessage()
                .withId(userMessageDto.getId())
                .withMessage(userMessageDto.getMessage())
                .build();
    }

    /**
     * Maps a set of user flight ID DTO objects (UserFlightIdDto) to a set of user flight ID objects (UserFlightId).
     *
     * @param userDto The user DTO object (UserDto) whose flight IDs need to be mapped.
     * @return The set of user flight ID objects (UserFlightId).
     */
    private static Set<UserFlightId> mapUserFlightIdDtoToUserFlightIdSet(UserDto userDto) {
        return userDto.getUserFlightId().stream()
                .map(userFlightIdDto -> mapUserFlightIdDtoToUserFlightId(userFlightIdDto))
                .collect(Collectors.toSet());
    }

    /**
     * Maps a user flight ID DTO object (UserFlightIdDto) to a user flight ID object (UserFlightId).
     *
     * @param userFlightIdDto The user flight ID DTO object (UserFlightIdDto) to be mapped.
     * @return The user flight ID object (UserFlightId).
     */
    private static UserFlightId mapUserFlightIdDtoToUserFlightId(UserFlightIdDto userFlightIdDto) {
        return UserFlightId.UserFlightIdBuilder.anUserFlightId()
                .withId(userFlightIdDto.getId())
                .withFlightId(userFlightIdDto.getFlightId())
                .build();
    }
}
