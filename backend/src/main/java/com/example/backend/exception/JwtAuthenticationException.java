package com.example.backend.exception;

/**
 * This class represents a custom exception for JWT (JSON Web Token) authentication.
 *
 * It extends from the RuntimeException class, which means it is an unchecked exception.
 * Unchecked exceptions are exceptions that can be thrown during the execution of the program
 * and they do not need to be declared in the method signature.
 *
 * In this case, this exception is thrown when there's an issue with JWT authentication,
 * such as when the provided JWT is invalid.
 *
 * @author YourName
 * @version 1.0
 * @since 2023-06-30
 */
public class JwtAuthenticationException extends RuntimeException {

    /**
     * Constructs a new JwtAuthenticationException with the detailed error message.
     *
     * @param invalidJwtToken the string representing the invalid JWT token.
     */
    public JwtAuthenticationException(String invalidJwtToken)  {
        super("Invalid token " + invalidJwtToken);
    }
}
