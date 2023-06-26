package com.example.backend.controllers;

import com.example.backend.entity.User;
import com.example.backend.service.UserService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class UserControllerTest {
    @MockBean
    private UserService userService;

    @Test
    void testGetUser() {
        User expectedUser = new User();
        expectedUser.setFirstName("Xavier");
        expectedUser.setLastName("Venkatanarasimha");
        expectedUser.setEmail("xavier@gmail.com");
        expectedUser.setPassword("$2b$10$YparQ5ndmjfaTWqpunT4nOd1DuViciOK7Vj6B4WkgOFR3nHmbVGTS");
        expectedUser.setPhone("+48 213 769 420");
        expectedUser.setAddress("Alwar, India, Rajasthan");
        expectedUser.setImage("https://varnam.my/wp-content/uploads/2021/01/FB_IMG_1605666747087-2.jpg.webp");
        expectedUser.setDescription("Hi, Im Xavier, your average guy from Earth. You might know me as a meme maker and comedian. I work at a gas station, although for the life of me, I cant pinpoint its location. Just know its somewhere on Earth! Im also a married man, though my wife seems to think I have a few girlfriends on the side. But you know, wives know everything.");

        Long userId = 1L;
        Mockito.when(userService.getUser(userId)).thenReturn(expectedUser);

        User actualUser = userService.getUser(userId);

        assertEquals(expectedUser.getFirstName(), actualUser.getFirstName());
        assertEquals(expectedUser.getLastName(), actualUser.getLastName());
        assertEquals(expectedUser.getEmail(), actualUser.getEmail());
        assertEquals(expectedUser.getPassword(), actualUser.getPassword());
        assertEquals(expectedUser.getPhone(), actualUser.getPhone());
        assertEquals(expectedUser.getAddress(), actualUser.getAddress());
        assertEquals(expectedUser.getImage(), actualUser.getImage());
        assertEquals(expectedUser.getDescription(), actualUser.getDescription());
    }
}
