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

@Aspect
@Component
@Slf4j
@Order(1)
public class AdditionalAuthenticationAspect {

    private final JWTUtils jwtUtils;

    @Autowired
    public AdditionalAuthenticationAspect(JWTUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }

    @Before("@annotation(authentication)")
    public void before(AdditionalAuthentication authentication) {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        String token = request.getHeader("Authorization");

        if (token == null || !token.startsWith("Bearer ")) {
            throw new JwtAuthenticationException("Invalid JWT token");
        }

        token = token.substring(7);

        if (!jwtUtils.verifyJWTToken(token)) {
            throw new JwtAuthenticationException("Invalid JWT token1");
        }

        log.info("AdditionalAuthenticationAspect - JWT token is valid");
    }
}
