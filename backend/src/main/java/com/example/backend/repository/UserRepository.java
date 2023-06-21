package com.example.backend.repository;

import com.example.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT u From User u WHERE u.email= ?1")
    Optional<User> findUserByEmail(String email);

    @Query("select distinct u from User u left join fetch u.userMessage left join fetch u.userFlightId")
    Set<User> findAllUsersWithMessagesAndFlightIds();
}
