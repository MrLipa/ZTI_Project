package com.example.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * The HelloController class serves as a REST controller for handling HTTP GET requests on the "/hello" path.
 * It consists of a single method that returns a greeting to the specified name or to 'World' if no name is specified.
 */
@RestController
public class HelloController {

    /**
     * The hello method returns a greeting in the form of a String.
     * It takes a name as a request parameter and includes this name in the greeting.
     * If no name is specified, 'World' is used as a default name.
     *
     * @param name The name to be included in the greeting.
     * @return A greeting in the form of a String.
     */
    @GetMapping("/hello")
    public String hello(@RequestParam(name = "name", defaultValue = "World") String name) {
        return String.format("Hello, %s", name);
    }
}
