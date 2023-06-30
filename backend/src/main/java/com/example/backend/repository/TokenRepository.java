package com.example.backend.repository;

import com.example.backend.entity.Token;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * The repository interface for managing Token entities in the database.
 * It extends the JpaRepository interface, providing CRUD operations for Token entities.
 */
@Repository
public interface TokenRepository extends JpaRepository<Token, Integer> {

    /**
     * Checks if a token with the given refresh token exists in the database.
     *
     * @param refreshToken The refresh token to check.
     * @return true if a token with the given refresh token exists, false otherwise.
     */
    boolean existsByRefreshToken(String refreshToken);

    /**
     * Deletes a token with the given refresh token from the database.
     *
     * @param refreshToken The refresh token to delete.
     */
    @Modifying
    @Transactional
    void deleteByRefreshToken(String refreshToken);

    /**
     * Retrieves a token with the given refresh token from the database.
     *
     * @param refreshToken The refresh token to search for.
     * @return An Optional containing the token with the given refresh token, or an empty Optional if not found.
     */
    @Query("SELECT t FROM Token t WHERE t.refreshToken= ?1")
    Optional<Token> findTokenByRefreshToken(String refreshToken);

    /**
     * Creates a new token in the database.
     *
     * @param userId        The ID of the user associated with the token.
     * @param refreshToken The refresh token to be created.
     */
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO zti_project.token (userId, refreshToken) VALUES (:userId, :refreshToken)", nativeQuery = true)
    void createToken(@Param("userId") Long userId, @Param("refreshToken") String refreshToken);
}
