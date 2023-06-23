package com.example.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "usermessage", schema = "zti_project")
public class UserMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "message")
    private String message;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userid")
    private User user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public static class UserMessageBuilder {
        private Long id;
        private String message;
        private User user;

        private UserMessageBuilder() {
        }

        public static UserMessageBuilder anUserMessage() {
            return new UserMessageBuilder();
        }

        public UserMessageBuilder withId(Long id) {
            this.id = id;
            return this;
        }

        public UserMessageBuilder withMessage(String message) {
            this.message = message;
            return this;
        }

        public UserMessageBuilder withUser(User user) {
            this.user = user;
            return this;
        }

        public UserMessage build() {
            UserMessage userMessage = new UserMessage();
            userMessage.id = this.id;
            userMessage.message = this.message;
            userMessage.user = this.user;
            return userMessage;
        }
    }
}
