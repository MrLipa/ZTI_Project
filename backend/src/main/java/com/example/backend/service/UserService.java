package com.example.backend.service;

import com.example.backend.entity.Token;
import com.example.backend.entity.User;
import com.example.backend.repository.TokenRepository;
import com.example.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;

    @Autowired
    public UserService(UserRepository userRepository, TokenRepository tokenRepository) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
    }

    public Set<User> getUsers() {
        Set<User> users = userRepository.findAllUsersWithMessagesAndFlightIds();
        return users;
    }

    public User getUser(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.orElse(null);
    }

    public User findUserByEmail(String email){
        Optional<User> user = userRepository.findUserByEmail(email);
        return user.orElse(null);
    }
//
//    public User findUserByRefreshToken(String refreshToken) {
//        Optional<User> user = userRepository.findByRefreshToken(refreshToken);
//        return user.orElse(null);
//    }

    public void createNewUser(User user) {
        Optional<User> userByEmail = userRepository.findUserByEmail(user.getEmail());
        if (userByEmail.isPresent()){
            throw new IllegalStateException("email taken");
        }
        userRepository.save(user);
    }

    public void deleteUser(Long userId) {
        boolean exists = userRepository.existsById(userId);
        if (!exists){
            throw new IllegalStateException("user with id "+ userId + " not exist");
        }
        userRepository.deleteById(userId);
    }

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

    public User findUserByRefreshToken(String refreshToken) {
        Token token = tokenRepository.findTokenByRefreshToken(refreshToken).orElse(null);
        return userRepository.findById(token.getUserId()).orElse(null);
    }

    public void createUser(User user) {
    }

    public void addMessage(Long userId, String message) {
    }

    public void addFlightId(Long userId, Integer flightId) {
    }

    public void removeFlightId(Long userId, Integer flightId) {
    }
}
