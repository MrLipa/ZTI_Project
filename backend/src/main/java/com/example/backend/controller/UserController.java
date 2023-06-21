package com.example.backend.controller;

import com.example.backend.aop.AdditionalAuthentication;
import com.example.backend.dto.UserReadDto;
import com.example.backend.entity.User;
import com.example.backend.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

import static com.example.backend.mapper.UserReadDtoMapper.mapUserToDto;
import static com.example.backend.mapper.UserReadDtoMapper.mapUserToUserReadDtoSet;


@RestController
@RequestMapping(path="/user")
@Slf4j
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    @AdditionalAuthentication
    @GetMapping(path="{userId}")
    public UserReadDto getUser(@PathVariable("userId") Long userId) {
        return mapUserToDto(userService.getUser(userId));
    }

    @AdditionalAuthentication
    @GetMapping()
    public Set<UserReadDto> getUsers() {
        return mapUserToUserReadDtoSet(userService.getUsers());
    }

    @AdditionalAuthentication
    @PostMapping()
    public void createNewUser(@RequestBody User user){
        userService.createNewUser(user);
    }

    @AdditionalAuthentication
    @DeleteMapping(path="{userId}")
    public void deleteUser(@PathVariable("userId") Long userId){

        userService.deleteUser(userId);
    }

    @AdditionalAuthentication
    @PutMapping(path = "{userId}")
    public void updateUser(@PathVariable("userId") Long userId, @RequestBody User user){
        userService.updateUser(userId, user);
    }
}
