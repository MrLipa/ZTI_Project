package com.example.backend.mapper;

import com.example.backend.dto.UserDto;
import com.example.backend.entity.User;

public class UserMapper {
    public static User mapToUser(UserDto userDto) {
        return User.UserBuilder.aUser()
                .withUserId(userDto.userId())
                .withFirstName(userDto.firstName())
                .withLastName(userDto.lastName())
                .withEmail(userDto.email())
                .withPassword(userDto.password())
                .withPhone(userDto.phone())
                .withAddress(userDto.address())
                .withImage(userDto.image())
                .withDescription(userDto.description())
                .build();
    }
}
