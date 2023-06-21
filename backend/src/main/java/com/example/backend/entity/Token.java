package com.example.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "token", schema = "zti_project")
public class Token {
    @Id
    @Column(name = "userid")
    private Long userId;

    @Column(name = "refreshtoken")
    private String refreshToken;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}