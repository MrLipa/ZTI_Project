package com.example.backend.controller;

import com.example.backend.dto.AuthResponse;
import com.example.backend.dto.LoginRequest;
import com.example.backend.entity.User;
import com.example.backend.exception.JwtAuthenticationException;
import com.example.backend.service.TokenService;
import com.example.backend.service.UserService;
import com.example.backend.aop.JWTUtils;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import jakarta.servlet.http.Cookie;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@RestController
@RequestMapping("/")
public class AuthController {
    private final UserService userService;
    private final TokenService tokenService;
    private final JWTUtils jwtUtils;

    @Autowired
    public AuthController(UserService userService, TokenService tokenService, JWTUtils jwtUtils) {
        this.userService = userService;
        this.tokenService = tokenService;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping(path="/register")
    public void register(@RequestBody User user){
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        userService.createNewUser(user);
    }

    @PostMapping(path="/login")
    public ResponseEntity<AuthResponse> handleLogin(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        if (email == null || password == null) {
            throw new IllegalStateException("Dont provide email and password");
        }

        try {
            User foundUser = userService.findUserByEmail(email);

            if (foundUser == null) {
                throw new IllegalStateException("no found user by email");
            }

            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            if (!passwordEncoder.matches(password, foundUser.getPassword())) {
                throw new IllegalStateException("Incorrect password");
            }

            String accessToken = jwtUtils.generateJWTToken(foundUser.getUserId(), foundUser.getEmail());
            String refreshToken = jwtUtils.generateJWTRefreshToken(foundUser.getUserId(), foundUser.getEmail());

            Cookie jwtRefreshToken = new Cookie("jwt", refreshToken);
            jwtRefreshToken.setMaxAge(24 * 60 * 60);
            jwtRefreshToken.setHttpOnly(true);
            jwtRefreshToken.setPath("/");
            response.addCookie(jwtRefreshToken);

            AuthResponse authResponse = new AuthResponse();
            authResponse.setAccessToken(accessToken);
            authResponse.setRoles(Arrays.asList(2137));
            authResponse.setUserId(1L);

            return new ResponseEntity<>(authResponse, HttpStatus.OK);

        } catch (Exception e) {
            throw new IllegalStateException(e);
        }
    }

    @GetMapping("/refresh")
    public ResponseEntity<AuthResponse> handleRefreshToken(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        String refreshToken = null;

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("jwt")) {
                    refreshToken = cookie.getValue();
                }
            }
        }

        if (refreshToken == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        User foundUser = userService.findUserByRefreshToken(refreshToken);

        if (foundUser == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        try {
            jwtUtils.verifyJWTRefreshToken(refreshToken);
        } catch (JwtAuthenticationException e) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        String newAccessToken = jwtUtils.generateJWTToken(foundUser.getUserId(), foundUser.getEmail());

        AuthResponse authResponse = new AuthResponse();
        authResponse.setAccessToken(newAccessToken);
        authResponse.setRoles(Arrays.asList(2137));
        authResponse.setUserId(foundUser.getUserId());

        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

    @GetMapping("/logout")
    public ResponseEntity<String> handleLogout(HttpServletRequest request, HttpServletResponse response) {
        Cookie[] cookies = request.getCookies();
        String refreshToken = null;

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("jwt")) {
                    refreshToken = cookie.getValue();
                }
            }
        }

        if (refreshToken == null) {
            return new ResponseEntity<>("No token", HttpStatus.NO_CONTENT);
        }

        User foundUser = userService.findUserByRefreshToken(refreshToken);

        if (foundUser == null) {
            Cookie clearCookie = new Cookie("jwt", null);
            clearCookie.setMaxAge(0);
            clearCookie.setHttpOnly(true);
            clearCookie.setPath("/");
            response.addCookie(clearCookie);
            return new ResponseEntity<>("User logout", HttpStatus.OK);
        }

        jwtUtils.deleteRefreshToken(refreshToken);

        Cookie clearCookie = new Cookie("jwt", null);
        clearCookie.setMaxAge(0);
        clearCookie.setHttpOnly(true);
        clearCookie.setPath("/");
        response.addCookie(clearCookie);

        return new ResponseEntity<>("User logout", HttpStatus.OK);
    }

}
