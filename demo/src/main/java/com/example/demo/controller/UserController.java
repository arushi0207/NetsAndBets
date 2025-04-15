package com.example.demo.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

/**
 * REST controller for handling user-related operations.
 *
 * This controller provides endpoints to manage user information including
 * retrieval of user details such as name, username, password, and account
 * balance.
 * The @RestController annotation indicates that this class will handle HTTP
 * requests and return JSON responses.
 *
 * It exposes the following endpoints:
 * - GET {@code /user/{username}} - Retrieves all user information for a
 * specific username.
 * - GET {@code /user/{username}/name} - Retrieves the name of a specific
 * user.
 * - GET {@code /user/{username}/username} - Retrieves the username of a
 * specific user.
 * - GET {@code /user/{username}/password} - Retrieves the password of a
 * specific user (for demonstration only).
 * - GET {@code /user/{username}/amount} - Retrieves the account balance of a
 * specific user.
 * - PUT {@code /user/{username}/amount} - Updates the account balance of a
 * specific user.
 */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/user")
@Tag(name = "User Management", description = "API endpoints for managing user information and account balances")
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
    @Operation(summary = "Get user information", description = "Retrieves all information for a specific user by username")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "User found", 
                    content = @Content(mediaType = "application/json", 
                    schema = @Schema(implementation = Map.class))),
        @ApiResponse(responseCode = "400", description = "User not found", 
                    content = @Content(mediaType = "text/plain", 
                    schema = @Schema(implementation = String.class)))
    })
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
    @Operation(summary = "Get user name", description = "Retrieves the name of a specific user by username")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Name retrieved successfully", 
                    content = @Content(mediaType = "application/json", 
                    schema = @Schema(implementation = String.class))),
        @ApiResponse(responseCode = "400", description = "User not found", 
                    content = @Content(mediaType = "text/plain", 
                    schema = @Schema(implementation = String.class)))
    })
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
    @Operation(summary = "Get username", description = "Confirms the username of a specific user")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Username retrieved successfully", 
                    content = @Content(mediaType = "application/json", 
                    schema = @Schema(implementation = String.class))),
        @ApiResponse(responseCode = "400", description = "User not found", 
                    content = @Content(mediaType = "text/plain", 
                    schema = @Schema(implementation = String.class)))
    })
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
    @Operation(summary = "Get user password", description = "Retrieves the password of a specific user (demo only)")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Password retrieved successfully", 
                    content = @Content(mediaType = "application/json", 
                    schema = @Schema(implementation = String.class))),
        @ApiResponse(responseCode = "400", description = "User not found", 
                    content = @Content(mediaType = "text/plain", 
                    schema = @Schema(implementation = String.class)))
    })
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
     * @return A ResponseEntity containing the user's account balance or an error
     *         message.
     */
    @Operation(summary = "Get account balance", description = "Retrieves the account balance of a specific user")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Balance retrieved successfully", 
                    content = @Content(mediaType = "application/json", 
                    schema = @Schema(implementation = Double.class))),
        @ApiResponse(responseCode = "400", description = "User not found", 
                    content = @Content(mediaType = "text/plain", 
                    schema = @Schema(implementation = String.class)))
    })
    @GetMapping("/{username}/amount")
    public ResponseEntity<?> getUserAmount(@PathVariable String username) {
        if (userDatabase.containsKey(username)) {
            return ResponseEntity.ok(userDatabase.get(username).get("amount"));
        }
        return ResponseEntity.badRequest().body("User not found");
    }

    /**
     * Creates a new user with the provided information.
     *
     * @param userData A map containing user data with keys "name", "username",
     *                 "password", and "amount".
     * @return A ResponseEntity containing the created user information or an error
     *         message.
     */
    @Operation(summary = "Create user", description = "Creates a new user with the provided information")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "User created successfully", 
                    content = @Content(mediaType = "application/json", 
                    schema = @Schema(implementation = Map.class))),
        @ApiResponse(responseCode = "400", description = "Username already exists or missing required fields", 
                    content = @Content(mediaType = "text/plain", 
                    schema = @Schema(implementation = String.class)))
    })
    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody Map<String, Object> userData) {
        String username = (String) userData.get("username");

        // TODO: Switch the 2 if-statements

        // Check if username already exists
        if (userDatabase.containsKey(username)) {
            return ResponseEntity.badRequest().body("Username already exists");
        }

        // Validate required fields
        if (username == null || userData.get("name") == null ||
                userData.get("password") == null || userData.get("amount") == null) {
            return ResponseEntity.badRequest().body("All fields (name, username, password, amount) are required");
        }

        // Create new user entry
        Map<String, Object> newUser = new HashMap<>();
        newUser.put("name", userData.get("name"));
        newUser.put("username", username);
        newUser.put("password", userData.get("password"));
        newUser.put("amount", userData.get("amount"));

        // Add to database
        userDatabase.put(username, newUser);

        return ResponseEntity.ok(newUser);
    }

    /**
     * Endpoint to place a bet by decreasing a user's balance
     * 
     * @param userId The ID of the user placing the bet
     * @param requestBody Contains betAmount (to decrease) and potentialWin (to track potential winnings)
     * @return ResponseEntity with updated user info or error message
     */
    @PostMapping("/{username}/placeBet")
    public ResponseEntity<?> placeBet(@PathVariable String username, @RequestBody Map<String, Double> requestBody) {
        Double betAmount = requestBody.get("betAmount");
        Double potentialWin = requestBody.get("potentialWin");
        
        // Validate the to make sure neither value is invalid
        if (betAmount == null || potentialWin == null) {
            return ResponseEntity.badRequest().body("Both betAmount and potentialWin must be provided");
        }
        
        if (betAmount <= 0) {
            return ResponseEntity.badRequest().body("Bet amount must be greater than zero");
        }
        
        // Find the user
        if (!userDatabase.containsKey(username)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        
        Map<String, Object> user = userDatabase.get(username);
        
        Double currentAmount = (Double) user.get("amount");
        if (currentAmount < betAmount) {
            return ResponseEntity.badRequest().body("Insufficient funds");
        }
        
        Double newBalance = currentAmount - betAmount;
        user.put("amount", newBalance);
        
        // Return updated user information and potential win amount
        Map<String, Object> response = new HashMap<>();
        response.put("username", username);
        response.put("newBalance", newBalance);
        response.put("betAmount", betAmount);
        response.put("potentialWin", potentialWin);
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * Endpoint to handle win/loss outcomes
     * 
     * @param userId The ID of the user who placed the bet
     * @param requestBody Contains win status and win amount
     * @return ResponseEntity with updated user info
     */
    @PostMapping("/{username}/betResult")
    public ResponseEntity<?> processBetResult(@PathVariable String username, @RequestBody Map<String, Object> requestBody) {
        Boolean won = (Boolean) requestBody.get("won");
        Double winAmount = won ? (Double) requestBody.get("winAmount") : 0.0;
        
        // Validate the to make sure neither value is invalid
        if (won == null) {
            return ResponseEntity.badRequest().body("Won status must be provided");
        }
        
        if (won && (winAmount == null || winAmount <= 0)) {
            return ResponseEntity.badRequest().body("Win amount must be greater than zero");
        }
        
        // Find the user
        if (!userDatabase.containsKey(username)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        
        Map<String, Object> user = userDatabase.get(username);
        
        Double currentAmount = (Double) user.get("amount");
        
        if (won) {
            Double newBalance = currentAmount + winAmount;
            user.put("amount", newBalance);
        }
        
        // Return updated user information
        Map<String, Object> response = new HashMap<>();
        response.put("username", username);
        response.put("newBalance", user.get("amount"));
        response.put("won", won);
        response.put("winAmount", won ? winAmount : 0.0);
        
        return ResponseEntity.ok(response);
    }
}