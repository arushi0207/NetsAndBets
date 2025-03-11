package com.example.demo.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST controller for handling user-related operations.
 *
 * <p>This controller provides endpoints to manage user information including
 * retrieval of user details such as name, username, password, and account balance.
 * The @RestController annotation indicates that this class will handle HTTP requests and return JSON responses.</p>
 *
 * <p>It exposes the following endpoints:</p>
 * <ul>
 *   <li>GET {@code /user/{username}} - Retrieves all user information for a specific username.</li>
 *   <li>GET {@code /user/{username}/name} - Retrieves the name of a specific user.</li>
 *   <li>GET {@code /user/{username}/username} - Retrieves the username of a specific user.</li>
 *   <li>GET {@code /user/{username}/password} - Retrieves the password of a specific user (for demonstration only).</li>
 *   <li>GET {@code /user/{username}/amount} - Retrieves the account balance of a specific user.</li>
 *   <li>PUT {@code /user/{username}/amount} - Updates the account balance of a specific user.</li>
 * </ul>
 */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/user")
public class UserController {
    // Stores user data temporarily (in a real application, use a database)
    private final Map<String, Map<String, Object>> userDatabase = new HashMap<>();

    /**
     * Constructor to initialize some sample user data.
     */
    public UserController() {
        // Add some sample users
        Map<String, Object> user1 = new HashMap<>();
        user1.put("name", "John Doe");
        user1.put("username", "john_doe");
        user1.put("password", "password123");
        user1.put("amount", 500.0);
        
        Map<String, Object> user2 = new HashMap<>();
        user2.put("name", "Jane Smith");
        user2.put("username", "jane_smith");
        user2.put("password", "secure456");
        user2.put("amount", 750.0);
        
        userDatabase.put("john_doe", user1);
        userDatabase.put("jane_smith", user2);
    }

}