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

    public static User mapUserDtoToUser(UserDto userDto) {
        return User.UserBuilder.aUser()
                .withUserId(user.getUserId())
                .withFirstName(user.getFirstName())
                .withLastName(user.getLastName())
                .withEmail(user.getEmail())
                .withPassword(user.getPassword())
                .withPhone(user.getPhone())
                .withAddress(user.getAddress())
                .withImage(user.getImage())
                .withDescription(user.getDescription())
                .withUserMessage(mapUserMessageToDtos(user))
                .withUserFlightId(mapUserFlightIdToDtos(user))
                .build();
    }

    public static UserDto mapUserToUserDto(User user) {
        return UserDto.UserReadDtoBuilder.aUserReadDto()
                .withUserId(user.getUserId())
                .withFirstName(user.getFirstName())
                .withLastName(user.getLastName())
                .withEmail(user.getEmail())
                .withPassword(user.getPassword())
                .withPhone(user.getPhone())
                .withAddress(user.getAddress())
                .withImage(user.getImage())
                .withDescription(user.getDescription())
                .withUserMessage(mapUserMessageToDtos(user))
                .withUserFlightId(mapUserFlightIdToDtos(user))
                .build();
    }



    private static Set<UserMessageDto> mapUserMessageToDtos(User user) {
        return user.getUserMessage().stream()
                .map(userMessage -> mapUserMessageToDto(userMessage))
                .collect(Collectors.toSet());
    }

    private static UserMessageDto mapUserMessageToDto(UserMessage userMessage) {
        return UserMessageDto.UserMessageReadDtoBuilder.aUserMessageReadDto()
                .withId(userMessage.getId())
                .withMessage(userMessage.getMessage())
                .build();
    }

    private static Set<UserFlightIdDto> mapUserFlightIdToDtos(User user) {
        return user.getUserFlightId().stream()
                .map(userFlightId -> mapUserFlightIdToDto(userFlightId))
                .collect(Collectors.toSet());
    }

    private static UserFlightIdDto mapUserFlightIdToDto(UserFlightId userFlightId) {
        return UserFlightIdDto.UserFlightIdReadDtoBuilder.aUserFlightIdReadDto()
                .withId(userFlightId.getId())
                .withFlightId(userFlightId.getFlightId())
                .build();
    }
}
