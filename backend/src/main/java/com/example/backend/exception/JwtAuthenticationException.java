package com.example.backend.exception;

public class JwtAuthenticationException extends RuntimeException {
    public JwtAuthenticationException(String invalidJwtToken)  {
        super("Invalid token " + invalidJwtToken);
    }
}
