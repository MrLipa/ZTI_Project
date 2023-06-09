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

/**
 * The AuthController class serves as the controller for handling all HTTP requests related to user authentication and authorization.
 * This class utilizes the UserService, TokenService and JWTUtils for performing authentication operations.
 * It handles CORS requests from specified local addresses.
 */
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@RestController
@RequestMapping("/")
public class AuthController {
    private final UserService userService;
    private final TokenService tokenService;
    private final JWTUtils jwtUtils;

    /**
     * The AuthController constructor which is autowired by Spring (via the @Autowired annotation)
     * to provide an instance of UserService, TokenService and JWTUtils.
     *
     * @param userService The service that handles operations related to User objects.
     * @param tokenService The service that handles operations related to Token objects.
     * @param jwtUtils The utility class for generating and verifying JWT tokens.
     */
    @Autowired
    public AuthController(UserService userService, TokenService tokenService, JWTUtils jwtUtils) {
        this.userService = userService;
        this.tokenService = tokenService;
        this.jwtUtils = jwtUtils;
    }

    /**
     * The register method handles the user registration process. It accepts a User object as a request body,
     * hashes the user password using BCrypt and saves the user to the database.
     *
     * @param user The user to be registered.
     * @return A response entity with a message indicating the user registration status.
     */
    @PostMapping(path="/register")
    public ResponseEntity<String> register(@RequestBody User user){
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        userService.createUser(user);
        return new ResponseEntity<>("User register", HttpStatus.OK);
    }

    /**
     * The handleLogin method is responsible for user authentication.
     * It accepts a LoginRequest object as a request body and authenticates the user credentials.
     *
     * @param loginRequest The request body containing user login credentials.
     * @param response The HttpServletResponse object.
     * @return A response entity with an AuthResponse object that includes an access token and user roles.
     */
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
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            }

            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            if (!passwordEncoder.matches(password, foundUser.getPassword())) {
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
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

    /**
     * The handleRefreshToken method handles the process of generating a new access token using a refresh token.
     *
     * @param request The HttpServletRequest object.
     * @return A response entity with an AuthResponse object that includes a new access token and user roles.
     */
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
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        User foundUser = userService.findUserByRefreshToken(refreshToken);

        if (foundUser == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        try {
            jwtUtils.verifyJWTRefreshToken(refreshToken);
        } catch (JwtAuthenticationException e) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        String newAccessToken = jwtUtils.generateJWTToken(foundUser.getUserId(), foundUser.getEmail());

        AuthResponse authResponse = new AuthResponse();
        authResponse.setAccessToken(newAccessToken);
        authResponse.setRoles(Arrays.asList(2137));
        authResponse.setUserId(foundUser.getUserId());

        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

    /**
     * The handleLogout method handles the process of user logout.
     * It clears the refresh token from the user cookies and deletes the refresh token from the database.
     *
     * @param request The HttpServletRequest object.
     * @param response The HttpServletResponse object.
     * @return A response entity with a message indicating the user logout status.
     */
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
