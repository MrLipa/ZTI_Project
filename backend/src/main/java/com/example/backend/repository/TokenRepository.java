package com.example.backend.repository;

import com.example.backend.entity.Token;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TokenRepository extends JpaRepository<Token, Integer> {
    boolean existsByRefreshToken(String refreshToken);
    @Modifying
    @Transactional
    void deleteByRefreshToken(String refreshToken);

    @Query("SELECT t From Token t WHERE t.refreshToken= ?1")
    Optional<Token> findTokenByRefreshToken(String refreshToken);
}