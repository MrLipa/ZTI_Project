package com.example.backend.service;

import com.example.backend.entity.Token;
import com.example.backend.entity.User;
import com.example.backend.repository.TokenRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TokenService {
    private final TokenRepository tokenRepository;

    public TokenService(TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    public boolean isRefreshTokenInBase(String refreshToken) {
        return tokenRepository.existsByRefreshToken(refreshToken);
    }

    public void createRefreshToken(Long userId, String refreshToken) {
        tokenRepository.createToken(userId, refreshToken);
    }

    public void deleteRefreshToken(String refreshToken) {
        tokenRepository.deleteByRefreshToken(refreshToken);
    }

}
