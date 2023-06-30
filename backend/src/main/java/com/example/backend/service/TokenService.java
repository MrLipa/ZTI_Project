package com.example.backend.service;

import com.example.backend.entity.Token;
import com.example.backend.entity.User;
import com.example.backend.repository.TokenRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * The service class for managing Token entities.
 */
@Service
public class TokenService {
    private final TokenRepository tokenRepository;

    public TokenService(TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    /**
     * Checks if a token with the given refresh token exists in the database.
     *
     * @param refreshToken The refresh token to check.
     * @return true if a token with the given refresh token exists, false otherwise.
     */
    public boolean isRefreshTokenInBase(String refreshToken) {
        return tokenRepository.existsByRefreshToken(refreshToken);
    }

    /**
     * Creates a new refresh token for the specified user in the database.
     *
     * @param userId        The ID of the user.
     * @param refreshToken The refresh token to create.
     */
    public void createRefreshToken(Long userId, String refreshToken) {
        tokenRepository.createToken(userId, refreshToken);
    }

    /**
     * Deletes the refresh token with the given value from the database.
     *
     * @param refreshToken The refresh token to delete.
     */
    public void deleteRefreshToken(String refreshToken) {
        tokenRepository.deleteByRefreshToken(refreshToken);
    }

}
