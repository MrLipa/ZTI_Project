package com.example.backend.repository;

import com.example.backend.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u WHERE u.email= ?1")
    Optional<User> findUserByEmail(String email);

    @Query("SELECT DISTINCT u FROM User u LEFT JOIN FETCH u.userMessage LEFT JOIN FETCH u.userFlightId")
    Set<User> findAllUsersWithMessagesAndFlightIds();

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO zti_project.userMessage (userId, message) VALUES (:userId, :message)", nativeQuery = true)
    void addMessage(@Param("userId") Long userId, @Param("message") String message);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO zti_project.userFlightId (userId, flightId) VALUES (:userId, :flightId)", nativeQuery = true)
    void addFlightId(@Param("userId") Long userId, @Param("flightId") Integer flightId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM zti_project.userFlightId WHERE userId = :userId AND flightId = :flightId", nativeQuery = true)
    void removeFlightId(@Param("userId") Long userId, @Param("flightId") Integer flightId);

    @Query(value = "SELECT flightId FROM zti_project.userFlightId WHERE userId = :userId", nativeQuery = true)
    List<Integer> getFlightIds(@Param("userId") Long userId);
}
