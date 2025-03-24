package com.example.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

/**
 * This class represents a single user in the Users repository, holding a user's
 * username, password, and a unique key to identify the user.
 * Using this class, individual user information can be updated and retrieved
 * with the below methods.
 */
@Entity // This tells Hibernate to make a table out of this class
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; // User's uniquely-identifying id in the Users table

    @Column(name = "name", nullable = false)
    private String name; // User's full name

    @Column(name = "username", nullable = false)
    private String username; // User-chosen username

    @Column(name = "password", nullable = false)
    private String password; // User-chosen password

    @Column(name = "amount", nullable = false)
    private double amount; // Initial money that the user starts with

    // Default constructor
    public User() {}

    public User(String name, String username, String password, double amount) {
        this.name = name;
        this.username = username;
        this.password = password;
        this.amount = amount;
    }

    /**
     * Getter method for the id field
     *
     * @return the user's id
     */
    public Integer getId() {
        return id;
    }

    /**
     * Changes the user's id to the specified integer. Theoretically, this should never be used,
     * but I'm following a tutorial and am not sure if it will be necessary in the future.
     * <p>
     * GET RID OF THIS IF NOT NEEDED
     *
     * @param id - the user's unique integer id
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * Getter method for the username field
     *
     * @return the user's username
     */
    public String getUsername() {
        return username;
    }

    /**
     * Changes the user's username to the specified string. Use this if a "change username"
     * setting is created.
     *
     * @param username - the user's new string username
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * Getter method for the password field
     *
     * @return the user's password
     */
    public String getPassword() {
        return password;
    }

    /**
     * Changes the user's password to the specified string. Use this if a "change password"
     * setting is created.
     *
     * @param password - the user's new string password
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * Getter method for the name field
     *
     * @return the user's name
     */
    public String getName() {
        return name;
    }

    /**
     * Changes the user's name to the specified string.
     *
     * @param name - the user's new string password
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Getter method for the amount field
     *
     * @return the user's initial amount
     */
    public double getAmount() {
        return amount;
    }

    /**
     * Changes the user's amount to the specified string. Use this if the user 
     * updates their balance
     *
     * @param amount - the user's new string password
     */
    public void setAmount(double amount) {
        this.amount = amount;
    }
  
}