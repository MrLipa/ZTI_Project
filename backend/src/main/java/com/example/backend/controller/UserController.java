package com.example.backend.controller;

import com.example.backend.aop.AdditionalAuthentication;
import com.example.backend.aop.AdditionalCredentialsDto;
import com.example.backend.controller.dbo.UserFlightIdReadDto;
import com.example.backend.controller.dbo.UserMessageReadDto;
import com.example.backend.controller.dbo.UserReadDto;
import com.example.backend.entity.User;
import com.example.backend.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@RestController
@RequestMapping(path="/user")
@Slf4j
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }
    
    @GetMapping()
    public List<User> GetUsers() {
        return userService.getUsers();
    }

    @PostMapping()
    public void addNewUser(@RequestBody User user){
        userService.addNewUser(user);
    }

    @DeleteMapping(path="{userId}")
    public void deleteUser(@PathVariable("userId") Long userId){
        userService.deleteUser(userId);
    }

    @PutMapping(path = "{userId}")
    public void updateUser(@PathVariable("userId") Long userId, @RequestBody User user){
        userService.updateUser(userId, user);
    }

    @GetMapping("/something")
    public String getSomething() {
        log.info("Controller: getSomething");
        return "test1";
    }

    @PostMapping("/somethingElse")
    @AdditionalAuthentication
    public String getSomethingElse(@RequestBody AdditionalCredentialsDto additionalCredentialsDto) {
        log.info("Controller: getSomethingElse");
        return "test1";
    }
    @GetMapping("/a")
    public List<UserReadDto> getA() {
        return userService.getUsersA().stream()
                .map(user -> {
                    UserReadDto.UserReadDtoBuilder userBuilder = UserReadDto.UserReadDtoBuilder.aUserReadDto()
                            .withUserId(user.getUserId())
                            .withFirstName(user.getFirstName())
                            .withLastName(user.getLastName())
                            .withEmail(user.getEmail())
                            // Nie zalecamy przekazywania hasła
                            // .withPassword(user.getPassword())
                            .withPhone(user.getPhone())
                            .withAddress(user.getAddress())
                            .withImage(user.getImage())
                            .withDescription(user.getDescription());

                    if (user.getUserMessage() != null) {
                        Set<UserMessageReadDto> messages = user.getUserMessage().stream()
                                .map(usermessage -> UserMessageReadDto.UserMessageReadDtoBuilder.aUserMessageReadDto()
                                        .withId(usermessage.getId())
                                        .withMessage(usermessage.getMessage())
                                        .build())
                                .collect(Collectors.toSet());
                        userBuilder.withUserMessage(messages);
                    }

                    // Dodajemy UserFlightId
                    if (user.getUserFlightId() != null) {
                        Set<UserFlightIdReadDto> flights = user.getUserFlightId().stream()
                                .map(flightId -> UserFlightIdReadDto.UserFlightIdReadDtoBuilder.aUserFlightIdReadDto()
                                        .withId(flightId.getId())
                                        .withFlightId(flightId.getFlightId())
                                        .build())
                                .collect(Collectors.toSet());
                        userBuilder.withUserFlightId(flights);
                    }

                    return userBuilder.build();
                })
                .collect(Collectors.toList());
    }




//        return userService.getUsersA().stream()
//                .map(user->UserReadDto.UserReadDtoBuilder.aUserReadDto()
//                        .withUserId(user.getUserId())
//                        .withFirstName(user.getFirstName())
//                        .withLastName(user.getLastName())
//                        .withEmail(user.getEmail())
//                        .withPassword(user.getPassword())
//                        .withPhone(user.getPhone())
//                        .withAddress(user.getAddress())
//                        .withImage(user.getImage())
//                        .withDescription(user.getDescription())
//                        .withUserMessage(user.getUserMessage().stream()
//                                .map(usermessage -> UserMessageReadDto.UserMessageReadDtoBuilder.aUserMessageReadDto()
//                                        .withId(usermessage.getId())
//                                        .withMessage(usermessage.getMessage())
//                                        .build()
//                                )
//                                .collect(Collectors.toList()))
//                        )
//                        .build()
//                ).collect(Collectors.toList()));
}
