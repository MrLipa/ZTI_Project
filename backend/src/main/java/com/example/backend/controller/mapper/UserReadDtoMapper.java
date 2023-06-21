package com.example.backend.controller.mapper;

import com.example.backend.controller.dbo.UserFlightIdReadDto;
import com.example.backend.controller.dbo.UserMessageReadDto;
import com.example.backend.controller.dbo.UserReadDto;
import com.example.backend.entity.User;
import com.example.backend.entity.UserFlightId;
import com.example.backend.entity.UserMessage;

import java.util.Set;
import java.util.stream.Collectors;

public class UserReadDtoMapper {

    public static Set<UserReadDto> mapUserToUserReadDtoSet(Set<User> users) {
        return users.stream()
                .map(user -> mapUserToDto(user))
                .collect(Collectors.toSet());
    }

    private static UserReadDto mapUserToDto(User user) {
        return UserReadDto.UserReadDtoBuilder.aUserReadDto()
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

    private static Set<UserMessageReadDto> mapUserMessageToDtos(User user) {
        return user.getUserMessage().stream()
                .map(userMessage -> mapUserMessageToDto(userMessage))
                .collect(Collectors.toSet());
    }

    private static UserMessageReadDto mapUserMessageToDto(UserMessage userMessage) {
        return UserMessageReadDto.UserMessageReadDtoBuilder.aUserMessageReadDto()
                .withId(userMessage.getId())
                .withMessage(userMessage.getMessage())
                .build();
    }

    private static Set<UserFlightIdReadDto> mapUserFlightIdToDtos(User user) {
        return user.getUserFlightId().stream()
                .map(userFlightId -> mapUserFlightIdToDto(userFlightId))
                .collect(Collectors.toSet());
    }

    private static UserFlightIdReadDto mapUserFlightIdToDto(UserFlightId userFlightId) {
        return UserFlightIdReadDto.UserFlightIdReadDtoBuilder.aUserFlightIdReadDto()
                .withId(userFlightId.getId())
                .withFlightId(userFlightId.getFlightId())
                .build();
    }
}
