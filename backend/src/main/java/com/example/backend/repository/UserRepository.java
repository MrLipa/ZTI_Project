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

/**
 * The repository interface for managing User entities in the database.
 * It extends the JpaRepository interface, providing CRUD operations for User entities.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Retrieves a user with the given email from the database.
     *
     * @param email The email of the user to search for.
     * @return An Optional containing the user with the given email, or an empty Optional if not found.
     */
    @Query("SELECT u FROM User u WHERE u.email= ?1")
    Optional<User> findUserByEmail(String email);

    /**
     * Retrieves all users from the database along with their associated user messages and flight IDs.
     *
     * @return A set of users with their associated user messages and flight IDs.
     */
    @Query("SELECT DISTINCT u FROM User u LEFT JOIN FETCH u.userMessage LEFT JOIN FETCH u.userFlightId")
    Set<User> findAllUsersWithMessagesAndFlightIds();

    /**
     * Adds a user message to the specified user in the database.
     *
     * @param userId  The ID of the user to add the message to.
     * @param message The message to add.
     */
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO zti_project.userMessage (userId, message) VALUES (:userId, :message)", nativeQuery = true)
    void addMessage(@Param("userId") Long userId, @Param("message") String message);

    /**
     * Adds a flight ID to the specified user in the database.
     *
     * @param userId   The ID of the user to add the flight ID to.
     * @param flightId The flight ID to add.
     */
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO zti_project.userFlightId (userId, flightId) VALUES (:userId, :flightId)", nativeQuery = true)
    void addFlightId(@Param("userId") Long userId, @Param("flightId") Integer flightId);

    /**
     * Removes a flight ID from the specified user in the database.
     *
     * @param userId   The ID of the user to remove the flight ID from.
     * @param flightId The flight ID to remove.
     */
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM zti_project.userFlightId WHERE userId = :userId AND flightId = :flightId", nativeQuery = true)
    void removeFlightId(@Param("userId") Long userId, @Param("flightId") Integer flightId);

    /**
     * Retrieves the flight IDs associated with the specified user from the database.
     *
     * @param userId The ID of the user.
     * @return A list of flight IDs associated with the user.
     */
    @Query(value = "SELECT flightId FROM zti_project.userFlightId WHERE userId = :userId", nativeQuery = true)
    List<Integer> getFlightIds(@Param("userId") Long userId);

    /**
     * Creates a new user in the database.
     *
     * @param user The user object to be created.
     */
    @Modifying
    @Query(value = "insert into zti_project.user (firstname, lastname, email, password, phone, address, image, description) values (:#{#user.firstName}, :#{#user.lastName}, :#{#user.email}, :#{#user.password}, :#{#user.phone}, :#{#user.address}, :#{#user.image}, :#{#user.description})", nativeQuery = true)
    void createUser(@Param("user") User user);
}
