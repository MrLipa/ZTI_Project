package com.example.backend.dto;

/**
 * This is a Data Transfer Object (DTO) class used for encapsulating the necessary
 * data for a login request. An instance of this class represents a request to log
 * into the application, containing the user's email and password.
 *
 * @author YourName
 * @version 1.0
 * @since 2023-06-30
 */
public class LoginRequest {
    private String email;
    private String password;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
