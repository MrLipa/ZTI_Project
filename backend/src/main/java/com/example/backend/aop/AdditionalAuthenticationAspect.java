package com.example.backend.aop;

import com.example.backend.exception.JwtAuthenticationException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

/**
 * AdditionalAuthenticationAspect class provides an additional layer of security by verifying JWT tokens using Aspect Oriented Programming.
 * It utilizes JWTUtils for token verification and is executed before methods annotated with @AdditionalAuthentication.
 *
 * @author Your Name
 */
@Aspect
@Component
@Slf4j
@Order(1)
public class AdditionalAuthenticationAspect {

    /**
     * JWTUtils instance for token verification.
     */
    private final JWTUtils jwtUtils;

    /**
     * Constructor for AdditionalAuthenticationAspect, autowires JWTUtils.
     * @param jwtUtils - the JWTUtils to be injected
     */
    @Autowired
    public AdditionalAuthenticationAspect(JWTUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }

    /**
     * Advice that verifies the JWT token before method execution.
     *
     * @param authentication - the AdditionalAuthentication annotation
     * @throws JwtAuthenticationException if JWT token is invalid or not provided.
     */
    @Before("@annotation(authentication)")
    public void before(AdditionalAuthentication authentication) {
        log.info("AdditionalAuthenticationAspect - JWT token is valid");

        // Get the HttpServletRequest object from the RequestContextHolder
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        // Get the "Authorization" header from the request
        String token = request.getHeader("Authorization");

        // If the token is not present or doesn't start with "Bearer ", throw an exception
        if (token == null || !token.startsWith("Bearer ")) {
            throw new JwtAuthenticationException("Invalid JWT token");
        }

        // Strip "Bearer " from the token
        token = token.substring(7);

        // Verify the token, if not valid, throw an exception
        if (!jwtUtils.verifyJWTToken(token)) {
            throw new JwtAuthenticationException("Invalid JWT token");
        }
    }
}
