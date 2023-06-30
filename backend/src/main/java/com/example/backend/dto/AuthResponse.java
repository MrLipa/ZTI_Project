package com.example.backend.dto;

import java.util.List;

/**
 * This is a Data Transfer Object (DTO) class used for transferring authentication data.
 * An instance of this class represents a response from an authentication request,
 * containing the user's ID, access token, and roles after successful authentication.
 *
 * @author YourName
 * @version 1.0
 * @since 2023-06-30
 */
public class AuthResponse {
    private Long userId;
    private String accessToken;
    private List<Integer> roles;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public List<Integer> getRoles() {
        return roles;
    }

    public void setRoles(List<Integer> roles) {
        this.roles = roles;
    }
}
