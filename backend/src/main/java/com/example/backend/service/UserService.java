package com.example.backend.service;

import com.example.backend.entity.Token;
import com.example.backend.entity.User;
import com.example.backend.repository.TokenRepository;
import com.example.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;

/**
 * The service class for managing User entities.
 */
@Service
public class UserService {

    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;

    @Autowired
    public UserService(UserRepository userRepository, TokenRepository tokenRepository) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
    }

    /**
     * Retrieves all users with their associated user messages and flight IDs.
     *
     * @return A set of users with their associated user messages and flight IDs.
     */
    public Set<User> getUsers() {
        Set<User> users = userRepository.findAllUsersWithMessagesAndFlightIds();
        return users;
    }

    /**
     * Retrieves a user with the specified ID.
     *
     * @param userId The ID of the user to retrieve.
     * @return The user with the specified ID, or null if not found.
     */
    public User getUser(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.orElse(null);
    }

    /**
     * Retrieves a user with the specified email.
     *
     * @param email The email of the user to retrieve.
     * @return The user with the specified email, or null if not found.
     */
    public User findUserByEmail(String email){
        Optional<User> user = userRepository.findUserByEmail(email);
        return user.orElse(null);
    }

    /**
     * Creates a new user in the database.
     *
     * @param user The user to create.
     */
    public void createUser(User user) {
        Optional<User> userByEmail = userRepository.findUserByEmail(user.getEmail());
        if (userByEmail.isPresent()){
            throw new IllegalStateException("email taken");
        }
        userRepository.save(user);
    }

    /**
     * Deletes a user with the specified ID from the database.
     *
     * @param userId The ID of the user to delete.
     */
    public void deleteUser(Long userId) {
        boolean exists = userRepository.existsById(userId);
        if (!exists){
            throw new IllegalStateException("user with id "+ userId + " not exist");
        }
        userRepository.deleteById(userId);
    }

    /**
     * Retrieves a user associated with the specified refresh token.
     *
     * @param refreshToken The refresh token.
     * @return The user associated with the refresh token, or null if not found.
     */
    public User findUserByRefreshToken(String refreshToken) {
        Token token = tokenRepository.findTokenByRefreshToken(refreshToken).orElse(null);
        return userRepository.findById(token.getUser().getUserId()).orElse(null);
    }

    /**
     * Adds a message to the specified user.
     *
     * @param userId  The ID of the user.
     * @param message The message to add.
     */
    public void addMessage(Long userId, String message) {
        userRepository.addMessage(userId, message);
    }

    /**
     * Adds a flight ID to the specified user.
     *
     * @param userId   The ID of the user.
     * @param flightId The flight ID to add.
     */
    public void addFlightId(Long userId, Integer flightId) {
        userRepository.addFlightId(userId, flightId);
    }

    /**
     * Removes a flight ID from the specified user.
     *
     * @param userId   The ID of the user.
     * @param flightId The flight ID to remove.
     */
    public void removeFlightId(Long userId, Integer flightId) {
        userRepository.removeFlightId(userId, flightId);
    }

    /**
     * Retrieves the flight IDs associated with the specified user.
     *
     * @param userId The ID of the user.
     * @return A list of flight IDs associated with the user.
     */
    public List<Integer> getFlightIds(Long userId) {
        List<Integer> flightsId = userRepository.getFlightIds(userId);
        return flightsId;
    }

    /**
     * Updates a user with the specified ID.
     *
     * @param userId The ID of the user to update.
     * @param user   The updated user object.
     */
    @Transactional
    public void updateUser(Long userId, User user) {
        User existingUser = userRepository.findById(userId).orElseThrow(() -> new IllegalStateException("user with id " + userId + " does not exist"));

        if (user.getFirstName() != null && !Objects.equals(existingUser.getFirstName(), user.getFirstName())) {
            existingUser.setFirstName(user.getFirstName());
        }

        if (user.getLastName() != null && !Objects.equals(existingUser.getLastName(), user.getLastName())) {
            existingUser.setLastName(user.getLastName());
        }

        if (user.getEmail() != null && !Objects.equals(existingUser.getEmail(), user.getEmail())) {
            existingUser.setEmail(user.getEmail());
        }

        if (user.getPassword() != null && !Objects.equals(existingUser.getPassword(), user.getPassword())) {
            existingUser.setPassword(user.getPassword());
        }

        if (user.getPhone() != null && !Objects.equals(existingUser.getPhone(), user.getPhone())) {
            existingUser.setPhone(user.getPhone());
        }

        if (user.getAddress() != null && !Objects.equals(existingUser.getAddress(), user.getAddress())) {
            existingUser.setAddress(user.getAddress());
        }

        if (user.getImage() != null && !Objects.equals(existingUser.getImage(), user.getImage())) {
            existingUser.setImage(user.getImage());
        }

        if (user.getDescription() != null && !Objects.equals(existingUser.getDescription(), user.getDescription())) {
            existingUser.setDescription(user.getDescription());
        }
    }
}
