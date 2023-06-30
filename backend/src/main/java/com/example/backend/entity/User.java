package com.example.backend.entity;

import jakarta.persistence.*;
import java.util.Set;

/**
 * The User class represents the user entity in the system. It contains information about
 * a user such as name, email, password, phone, address, image, and a description of the user.
 *
 * This class is annotated as a JPA Entity, indicating that it is a JPA managed entity and
 * is mapped to the "user" table in the "zti_project" schema of the relational database.
 *
 * The class fields represent the columns in the "user" table, with the OneToMany relationships
 * indicating that a single user can be associated with multiple user messages and flights.
 *
 * The UserBuilder nested class provides a builder pattern for creating a User instance.
 *
 * @author YourName
 * @version 1.0
 * @since 2023-06-30
 */
@Entity(name="User")
@Table(name="user", schema="zti_project")
public class User {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "userid")
    private Long userId;
    @Column(name = "firstname")
    private String firstName;
    @Column(name = "lastname")
    private String lastName;
    private String email;
    private String password;
    private String phone;
    private String address;
    private String image;
    @Column(name = "description", length = 500)
    private String description;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<UserMessage> userMessage;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<UserFlightId> userFlightId;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<UserMessage> getUserMessage() {
        return userMessage;
    }

    public void setUserMessage(Set<UserMessage> userMessage) {
        this.userMessage = userMessage;
    }

    public Set<UserFlightId> getUserFlightId() {
        return userFlightId;
    }

    public void setUserFlightId(Set<UserFlightId> userFlightId) {
        this.userFlightId = userFlightId;
    }

    public static class UserBuilder {
        private Long userId;
        private String firstName;
        private String lastName;
        private String email;
        private String password;
        private String phone;
        private String address;
        private String image;
        private String description;
        private Set<UserMessage> userMessage;
        private Set<UserFlightId> userFlightId;

        private UserBuilder() {
        }

        public static UserBuilder anUser() {
            return new UserBuilder();
        }

        public UserBuilder withUserId(Long userId) {
            this.userId = userId;
            return this;
        }

        public UserBuilder withFirstName(String firstName) {
            this.firstName = firstName;
            return this;
        }

        public UserBuilder withLastName(String lastName) {
            this.lastName = lastName;
            return this;
        }

        public UserBuilder withEmail(String email) {
            this.email = email;
            return this;
        }

        public UserBuilder withPassword(String password) {
            this.password = password;
            return this;
        }

        public UserBuilder withPhone(String phone) {
            this.phone = phone;
            return this;
        }

        public UserBuilder withAddress(String address) {
            this.address = address;
            return this;
        }

        public UserBuilder withImage(String image) {
            this.image = image;
            return this;
        }

        public UserBuilder withDescription(String description) {
            this.description = description;
            return this;
        }

        public UserBuilder withUserMessage(Set<UserMessage> userMessage) {
            this.userMessage = userMessage;
            return this;
        }

        public UserBuilder withUserFlightId(Set<UserFlightId> userFlightId) {
            this.userFlightId = userFlightId;
            return this;
        }

        public User build() {
            User user = new User();
            user.userId = this.userId;
            user.firstName = this.firstName;
            user.lastName = this.lastName;
            user.email = this.email;
            user.password = this.password;
            user.phone = this.phone;
            user.address = this.address;
            user.image = this.image;
            user.description = this.description;
            user.userMessage = this.userMessage;
            user.userFlightId = this.userFlightId;
            return user;
        }
    }
}

