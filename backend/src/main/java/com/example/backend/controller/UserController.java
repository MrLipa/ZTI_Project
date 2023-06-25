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

@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:5173" })
@RestController
@RequestMapping(path = "/user")
@Slf4j
public class UserController {

    private final UserService userService;
    private final FlightService flightService;

    @Autowired
    public UserController(UserService userService, FlightService flightService) {
        this.userService = userService;
        this.flightService = flightService;
    }

    @AdditionalAuthentication
    @GetMapping()
    public Set<UserDto> getUsers() {
        Set<User> users = userService.getUsers();
        return mapUserToUserDtoSet(users);
    }

    @AdditionalAuthentication
    @GetMapping(path = "{userId}")
    public UserDto getUser(@PathVariable("userId") Long userId) {
        User user = userService.getUser(userId);
        return mapUserToUserDto(user);
    }

    @AdditionalAuthentication
    @PostMapping()
    public void createUser(@RequestBody User user) {
        userService.createUser(user);
    }

    @AdditionalAuthentication
    @DeleteMapping(path = "{userId}")
    public void deleteUser(@PathVariable("userId") Long userId) {
        userService.deleteUser(userId);
    }

    @AdditionalAuthentication
    @PutMapping(path = "{userId}")
    public void updateUser(@PathVariable("userId") Long userId, @RequestBody User user) {
        userService.updateUser(userId, user);
    }

    @AdditionalAuthentication
    @GetMapping(path = "/flights_history/{userId}")
    public Collection<Flight> getUserHistory(@PathVariable("userId") Long userId) {
        User user = userService.getUser(userId);
        List<Integer> userFlightIds = userService.getFlightIds(user.getUserId());
        return flightService.getFlightsByIds(userFlightIds);
    }

    @AdditionalAuthentication
    @PostMapping(path = "/add_message")
    public void addMessage(@RequestBody Map<String, Object> requestBody) {
        Long userId = Long.parseLong(requestBody.get("userId").toString());
        String message = requestBody.get("message").toString();
        userService.addMessage(userId, message);
    }

    @AdditionalAuthentication
    @PostMapping(path = "/made_reservation")
    public void madeReservation(@RequestBody Map<String, Object> requestBody) {
        Long userId = Long.parseLong(requestBody.get("userId").toString());
        Integer flightId = Integer.parseInt(requestBody.get("flightId").toString());
        userService.addFlightId(userId, flightId);
        flightService.takeSeat(flightId);
    }

    @AdditionalAuthentication
    @PostMapping(path = "/cancel_reservation")
    public void cancelReservation(@RequestBody Map<String, Object> requestBody) {
        Long userId = Long.parseLong(requestBody.get("userId").toString());
        Integer flightId = Integer.parseInt(requestBody.get("flightId").toString());
        userService.removeFlightId(userId, flightId);
        flightService.freeSeat(flightId);
    }

}
