package com.example.demo.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    /**
     * Retrieves all information for a specific user.
     *
     * @param username The username of the user.
     * @return A ResponseEntity containing user information or an error message.
     */
    @GetMapping("/{username}")
    public ResponseEntity<?> getUserInfo(@PathVariable String username) {
        if (userDatabase.containsKey(username)) {
            return ResponseEntity.ok(userDatabase.get(username));
        }
        return ResponseEntity.badRequest().body("User not found");
    }

    /**
     * Retrieves the name of a specific user.
     *
     * @param username The username of the user.
     * @return A ResponseEntity containing the user's name or an error message.
     */
    @GetMapping("/{username}/name")
    public ResponseEntity<?> getUserName(@PathVariable String username) {
        if (userDatabase.containsKey(username)) {
            return ResponseEntity.ok(userDatabase.get(username).get("name"));
        }
        return ResponseEntity.badRequest().body("User not found");
    }

    /**
     * Retrieves the username of a specific user.
     *
     * @param username The username of the user.
     * @return A ResponseEntity containing the username or an error message.
     */
    @GetMapping("/{username}/username")
    public ResponseEntity<?> getUsername(@PathVariable String username) {
        if (userDatabase.containsKey(username)) {
            return ResponseEntity.ok(userDatabase.get(username).get("username"));
        }
        return ResponseEntity.badRequest().body("User not found");
    }

    /**
     * Retrieves the password of a specific user.
     * Note: In a real application, passwords should never be exposed via API.
     * This is for demonstration purposes only.
     *
     * @param username The username of the user.
     * @return A ResponseEntity containing the user's password or an error message.
     */
    @GetMapping("/{username}/password")
    public ResponseEntity<?> getUserPassword(@PathVariable String username) {
        if (userDatabase.containsKey(username)) {
            return ResponseEntity.ok(userDatabase.get(username).get("password"));
        }
        return ResponseEntity.badRequest().body("User not found");
    }

    /**
     * Retrieves the account balance of a specific user.
     *
     * @param username The username of the user.
     * @return A ResponseEntity containing the user's account balance or an error message.
     */
    @GetMapping("/{username}/amount")
    public ResponseEntity<?> getUserAmount(@PathVariable String username) {
        if (userDatabase.containsKey(username)) {
            return ResponseEntity.ok(userDatabase.get(username).get("amount"));
        }
        return ResponseEntity.badRequest().body("User not found");
    }

}