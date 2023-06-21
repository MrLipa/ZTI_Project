package com.example.backend.aop;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.backend.exception.JwtAuthenticationException;
import com.example.backend.service.TokenService;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

@Component
public class JWTUtils {
    private final TokenService tokenService;

    public JWTUtils(TokenService tokenService){
        this.tokenService = tokenService;
    }

    private static final String ACCESS_TOKEN_SECRET = "3f8c8a5f3bd380a3c0490827978976db0977d50b05322e92c615a403eab7d24ebbfa5024c863577f5ac79d7dab850358b77c324e9b23398868a7a97671590ef3";
    private static final String REFRESH_TOKEN_SECRET = "e6fd2bf6b37b143c5b12e8b55a41c8f6d529e17c6289dfc14b2228db35a39658b0e77e0f59060107ea8e0e600f0820b1ba5a090294f9b356eac1211a0ab9cae5";
    private static final long ACCESS_TOKEN_EXPIRATION_TIME = 24*60*60*1000;
    private static final long REFRESH_TOKEN_EXPIRATION_TIME = 24*60*60*1000;
    private static final Logger logger = Logger.getLogger(JWTUtils.class.getName());

    public String generateJWTToken(Long userId, String email) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(ACCESS_TOKEN_SECRET);

            Map<String, Object> userInfo = new HashMap<>();
            userInfo.put("user_id", userId);
            userInfo.put("email", email);
            userInfo.put("roles", new Integer[]{2137});

            String token = JWT.create()
                    .withClaim("UserInfo", userInfo)
                    .withExpiresAt(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION_TIME))
                    .sign(algorithm);

            logger.log(Level.INFO, "JWT generated");
            return token;

        } catch (Exception e) {
            logger.log(Level.SEVERE, "Error during JWT generation: " + e.getMessage());
            throw new JwtAuthenticationException("Invalid JWT token");
        }
    }

    public String generateJWTRefreshToken(Long userId, String email) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(REFRESH_TOKEN_SECRET);

            Map<String, Object> userInfo = new HashMap<>();
            userInfo.put("user_id", userId);
            userInfo.put("email", email);
            userInfo.put("roles", new Integer[]{2137});


            String refreshToken = JWT.create()
                    .withClaim("UserInfo", userInfo)
                    .withExpiresAt(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXPIRATION_TIME))  // assuming REFRESH_TOKEN_EXPIRATION_TIME is 1 hour
                    .sign(algorithm);

            tokenService.createRefreshToken(userId, refreshToken);

            logger.log(Level.INFO, "JWT generated");
            return refreshToken;

        } catch (Exception e) {
            logger.log(Level.SEVERE, "Error during JWT generation: " + e.getMessage());
            throw new JwtAuthenticationException("Invalid JWT token");
        }
    }

    public boolean verifyJWTToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(ACCESS_TOKEN_SECRET);
            JWTVerifier verifier = JWT.require(algorithm).build();
            DecodedJWT decodedJWT = verifier.verify(token);

            Map<String, Object> claims = decodedJWT.getClaim("UserInfo").asMap();

            Long userId = ((Number) claims.get("user_id")).longValue();
            String email = (String) claims.get("email");
            List<Integer> roles = (List<Integer>) claims.get("roles");

            if (!roles.contains(2137)) {
                logger.log(Level.WARNING, "Role '2137' not found in JWT roles");
                throw new JwtAuthenticationException("Invalid Role");
            }

            logger.log(Level.INFO, "JWT verified");
            return true;

        } catch (JWTVerificationException e) {
            logger.log(Level.SEVERE, "Error during JWT verification: " + e.getMessage());
            throw new JwtAuthenticationException("Invalid JWT token");
        }
    }

    public boolean verifyJWTRefreshToken(String refreshToken) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(REFRESH_TOKEN_SECRET);
            JWTVerifier verifier = JWT.require(algorithm).build();
            DecodedJWT decodedJWTRefreshToken = verifier.verify(refreshToken);

            Map<String, Object> claims = decodedJWTRefreshToken.getClaim("UserInfo").asMap();

            Long userId = ((Number) claims.get("user_id")).longValue();
            String email = (String) claims.get("email");
            List<Integer> roles = (List<Integer>) claims.get("roles");

            if (!roles.contains(2137)) {
                logger.log(Level.WARNING, "Role '2137' not found in JWT roles");
                throw new JwtAuthenticationException("Invalid JWT token");
            }

            logger.log(Level.INFO, "JWT verified");
            return true;

        } catch (JWTVerificationException e) {
            logger.log(Level.SEVERE, "Error during JWT verification: " + e.getMessage());
            throw new JwtAuthenticationException("Invalid JWT token");
        }
    }

    public void deleteRefreshToken(String refreshToken) {
        tokenService.deleteRefreshToken(refreshToken);
    }

}