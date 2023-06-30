package com.example.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

/**
 * The Token class represents the token entity in the system. It is used to store
 * information about a refresh token which is linked to a specific user.
 *
 * This class is annotated as a JPA Entity, indicating that it is a JPA managed entity and
 * is mapped to the "token" table in the "zti_project" schema of the relational database.
 *
 * The class fields represent the columns in the "token" table, and the relationship between
 * the Token and User entities is represented by the @ManyToOne annotation, indicating that
 * multiple tokens can be associated with a single user.
 *
 * @author YourName
 * @version 1.0
 * @since 2023-06-30
 */
@Entity
@Table(name = "token", schema = "zti_project")
public class Token {
    @Id
    private Long id;

    @Column(name = "refreshtoken")
    private String refreshToken;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userid")
    private User user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}