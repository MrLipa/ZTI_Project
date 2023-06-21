package com.example.backend.entity;

import jakarta.persistence.*;
import java.util.Set;

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
    @OneToMany(mappedBy = "user")
    private Set<UserMessage> userMessage;
    @OneToMany(mappedBy = "user")
    private Set<UserFlightId> userFlightId;

    public User() {
    }

    public User(Long userId) {
        this.userId=userId;
    }

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public User(String firstName, String lastName, String email, String password, String phone, String address, String image, String description) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.address = address;
        this.image = image;
        this.description = description;
    }

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

    public static final class UserBuilder {
        private User user;

        private UserBuilder() {
            user = new User();
        }

        public static UserBuilder aUser() {
            return new UserBuilder();
        }

        public UserBuilder withUserId(Long userId) {
            user.setUserId(userId);
            return this;
        }

        public UserBuilder withFirstName(String firstName) {
            user.setFirstName(firstName);
            return this;
        }

        public UserBuilder withLastName(String lastName) {
            user.setLastName(lastName);
            return this;
        }

        public UserBuilder withEmail(String email) {
            user.setEmail(email);
            return this;
        }

        public UserBuilder withPassword(String password) {
            user.setPassword(password);
            return this;
        }

        public UserBuilder withPhone(String phone) {
            user.setPhone(phone);
            return this;
        }

        public UserBuilder withAddress(String address) {
            user.setAddress(address);
            return this;
        }

        public UserBuilder withImage(String image) {
            user.setImage(image);
            return this;
        }

        public UserBuilder withDescription(String description) {
            user.setDescription(description);
            return this;
        }

        public UserBuilder withUserMessage(Set<UserMessage> userMessages) {
            user.setUserMessage(userMessages);
            return this;
        }

        public UserBuilder withUserFlightId(Set<UserFlightId> userFlightIds) {
            user.setUserFlightId(userFlightIds);
            return this;
        }

        public User build() {
            return user;
        }
    }
}

