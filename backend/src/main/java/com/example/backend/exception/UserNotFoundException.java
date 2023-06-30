package com.example.backend.exception;

/**
 * This class extends from RuntimeException and represents an exception that is thrown when a User with a specific ID cannot be found.
 *
 * It includes a constructor that accepts an ID (which is the ID of the User that could not be found),
 * and includes this ID in the message of the RuntimeException.
 *
 * @author YourName
 * @version 1.0
 * @since 2023-06-30
 */
public class UserNotFoundException extends RuntimeException {

    /**
     * Constructs a new UserNotFoundException with the specified detail message.
     * The detail message is saved for later retrieval by the Throwable.getMessage() method.
     *
     * @param id the ID of the User that could not be found.
     */
    public UserNotFoundException(Integer id) {
        super("Could not find user " + id);
    }
}
