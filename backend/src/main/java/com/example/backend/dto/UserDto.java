package com.example.backend.dto;


public record UserDto(
        Long userId,
        String firstName,
        String lastName,
        String email,
        String password,
        String phone,
        String address,
        String image,
        String description
) {}
