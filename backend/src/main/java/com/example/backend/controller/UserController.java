package com.example.backend.controller;

import com.example.backend.aop.AdditionalAuthentication;
import com.example.backend.dto.UserDto;
import com.example.backend.entity.Flight;
import com.example.backend.entity.User;
import com.example.backend.service.FlightService;
import com.example.backend.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Set;

import static com.example.backend.mapper.UserMapper.*;

/**
 * The UserController class serves as the controller for handling all HTTP requests involving User objects.
 * This class utilizes both UserService and FlightService for performing database operations and returning data to the client.
 * It handles CORS requests from specified local addresses.
 * The class is marked with the @Slf4j annotation which provides logging through the logback library.
 * Authentication is additionally secured by the @AdditionalAuthentication annotation.
 */
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:5173" })
@RestController
@RequestMapping(path = "/user")
@Slf4j
public class UserController {

    private final UserService userService;
    private final FlightService flightService;

    /**
     * The UserController constructor which is autowired by Spring (via the @Autowired annotation)
     * to provide an instance of UserService and FlightService.
     *
     * @param userService The service that handles operations related to User objects.
     * @param flightService The service that handles operations related to Flight objects.
     */
    @Autowired
    public UserController(UserService userService, FlightService flightService) {
        this.userService = userService;
        this.flightService = flightService;
    }

    /**
     * The getUsers method returns a set of UserDto objects.
     * The method is mapped to GET requests at "/user".
     *
     * @return A set of UserDto objects.
     */
    @AdditionalAuthentication
    @GetMapping()
    public Set<UserDto> getUsers() {
        Set<User> users = userService.getUsers();
        return mapUserToUserDtoSet(users);
    }

    /**
     * The getUser method returns a single UserDto object based on a provided userId.
     * The method is mapped to GET requests at "/user/{userId}".
     *
     * @param userId The ID of the User to be fetched.
     * @return A single UserDto object.
     */
    @AdditionalAuthentication
    @GetMapping(path = "{userId}")
    public UserDto getUser(@PathVariable("userId") Long userId) {
        User user = userService.getUser(userId);
        return mapUserToUserDto(user);
    }

    /**
     * The createUser method creates a new user.
     * The method is mapped to POST requests at "/user".
     *
     * @param user The User object to be created.
     */
    @AdditionalAuthentication
    @PostMapping()
    public void createUser(@RequestBody User user) {
        userService.createUser(user);
    }

    /**
     * The deleteUser method deletes a user based on a provided userId.
     * The method is mapped to DELETE requests at "/user/{userId}".
     *
     * @param userId The ID of the User to be deleted.
     */
    @AdditionalAuthentication
    @DeleteMapping(path = "{userId}")
    public void deleteUser(@PathVariable("userId") Long userId) {
        userService.deleteUser(userId);
    }

    /**
     * The updateUser method updates a user based on a provided userId.
     * The method is mapped to PUT requests at "/user/{userId}".
     *
     * @param userId The ID of the User to be updated.
     * @param user The updated User object.
     */
    @AdditionalAuthentication
    @PutMapping(path = "{userId}")
    public void updateUser(@PathVariable("userId") Long userId, @RequestBody User user) {
        userService.updateUser(userId, user);
    }

    /**
     * The getUserHistory method fetches a collection of flights that a user has flown.
     * The method is mapped to GET requests at "/user/flights_history/{userId}".
     *
     * @param userId The ID of the User whose flight history is to be fetched.
     * @return A Collection of Flight objects.
     */
    @AdditionalAuthentication
    @GetMapping(path = "/flights_history/{userId}")
    public Collection<Flight> getUserHistory(@PathVariable("userId") Long userId) {
        User user = userService.getUser(userId);
        List<Integer> userFlightIds = userService.getFlightIds(user.getUserId());
        return flightService.getFlightsByIds(userFlightIds);
    }

    /**
     * The addMessage method adds a message for a specific user.
     * The method is mapped to POST requests at "/user/add_message".
     *
     * @param requestBody The request body containing a userId and a message.
     */
    @AdditionalAuthentication
    @PostMapping(path = "/add_message")
    public void addMessage(@RequestBody Map<String, Object> requestBody) {
        Long userId = Long.parseLong(requestBody.get("userId").toString());
        String message = requestBody.get("message").toString();
        userService.addMessage(userId, message);
    }

    /**
     * The madeReservation method makes a reservation for a user on a specific flight.
     * The method is mapped to POST requests at "/user/made_reservation".
     *
     * @param requestBody The request body containing a userId and a flightId.
     */
    @AdditionalAuthentication
    @PostMapping(path = "/made_reservation")
    public void madeReservation(@RequestBody Map<String, Object> requestBody) {
        Long userId = Long.parseLong(requestBody.get("userId").toString());
        Integer flightId = Integer.parseInt(requestBody.get("flightId").toString());
        userService.addFlightId(userId, flightId);
        flightService.takeSeat(flightId);
    }

    /**
     * The cancelReservation method cancels a user's reservation for a flight.
     * The method is mapped to POST requests at "/user/cancel_reservation".
     *
     * @param requestBody The request body containing a userId and a flightId.
     */
    @AdditionalAuthentication
    @PostMapping(path = "/cancel_reservation")
    public void cancelReservation(@RequestBody Map<String, Object> requestBody) {
        Long userId = Long.parseLong(requestBody.get("userId").toString());
        Integer flightId = Integer.parseInt(requestBody.get("flightId").toString());
        userService.removeFlightId(userId, flightId);
        flightService.freeSeat(flightId);
    }

}
