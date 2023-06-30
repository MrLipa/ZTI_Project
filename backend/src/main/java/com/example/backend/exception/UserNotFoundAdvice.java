package com.example.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * This class provides centralized exception handling across all methods and classes in the application.
 * It is annotated with @ControllerAdvice, allowing it to be auto-detected.
 *
 * The class defines a method to handle UserNotFoundException, and the handler returns a response with an appropriate HTTP status code and the message of the exception.
 *
 * @author YourName
 * @version 1.0
 * @since 2023-06-30
 */
@ControllerAdvice
class UserNotFoundAdvice {

    /**
     * This method handles UserNotFoundException.
     * It sends a response with the HTTP status code 404 and the message of the exception.
     *
     * @param ex the UserNotFoundException.
     * @return the message of the exception.
     */
    @ResponseBody
    @ExceptionHandler(com.example.backend.exception.UserNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String userNotFoundHandler(UserNotFoundException ex) {
        return ex.getMessage();
    }
}
