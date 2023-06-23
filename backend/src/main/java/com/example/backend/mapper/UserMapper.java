package com.example.backend.mapper;

import com.example.backend.dto.UserFlightIdDto;
import com.example.backend.dto.UserMessageDto;
import com.example.backend.dto.UserDto;
import com.example.backend.entity.User;
import com.example.backend.entity.UserFlightId;
import com.example.backend.entity.UserMessage;

import java.util.Set;
import java.util.stream.Collectors;

public class UserMapper {

    public static Set<UserDto> mapUserToUserDtoSet(Set<User> users) {
        return users.stream()
                .map(user -> mapUserToUserDto(user))
                .collect(Collectors.toSet());
    }

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

    private static Set<UserMessageDto> mapUserMessageToUserMessageDtoSet(User user) {
        return user.getUserMessage().stream()
                .map(userMessage ->mapUserMessageToUserMessageDto(userMessage))
                .collect(Collectors.toSet());
    }

    private static UserMessageDto mapUserMessageToUserMessageDto(UserMessage userMessage) {
        return UserMessageDto.UserMessageDtoBuilder.aUserMessageDto()
                .withId(userMessage.getId())
                .withMessage(userMessage.getMessage())
                .build();
    }

    private static Set<UserFlightIdDto> mapUserFlightIdToUserFlightIdDtoSet(User user) {
        return user.getUserFlightId().stream()
                .map(userFlightId -> mapUserFlightIdToUserFlightIdDto(userFlightId))
                .collect(Collectors.toSet());
    }

    private static UserFlightIdDto mapUserFlightIdToUserFlightIdDto(UserFlightId userFlightId) {
        return UserFlightIdDto.UserFlightIdDtoBuilder.aUserFlightIdDto()
                .withId(userFlightId.getId())
                .withFlightId(userFlightId.getFlightId())
                .build();
    }

    public static Set<User> mapUserDtoToUserSet(Set<UserDto> usersDto) {
        return usersDto.stream()
                .map(userDto -> mapUserDtoToUser(userDto))
                .collect(Collectors.toSet());
    }

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

    private static Set<UserMessage> mapUserMessageDtoToUserMessageSet(UserDto userDto) {
        return userDto.getUserMessage().stream()
                .map(userMessageDto -> mapUserMessageDtoToUserMessage(userMessageDto))
                .collect(Collectors.toSet());
    }

    private static UserMessage mapUserMessageDtoToUserMessage(UserMessageDto userMessageDto) {
        return UserMessage.UserMessageBuilder.anUserMessage()
                .withId(userMessageDto.getId())
                .withMessage(userMessageDto.getMessage())
                .build();
    }
    private static Set<UserFlightId> mapUserFlightIdDtoToUserFlightIdSet(UserDto userDto) {
        return userDto.getUserFlightId().stream()
                .map(userFlightIdDto -> mapUserFlightIdDtoToUserFlightId(userFlightIdDto))
                .collect(Collectors.toSet());
    }

    private static UserFlightId mapUserFlightIdDtoToUserFlightId(UserFlightIdDto userFlightIdDto) {
        return UserFlightId.UserFlightIdBuilder.anUserFlightId()
                .withId(userFlightIdDto.getId())
                .withFlightId(userFlightIdDto.getFlightId())
                .build();
    }
}
