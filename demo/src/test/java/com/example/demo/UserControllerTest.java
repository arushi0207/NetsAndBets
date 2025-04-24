package com.example.demo;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.demo.controller.UserController;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Unit tests for UserController that focus on user handling and betting logic,
 * including user info retrieval, creation, placing bets, and processing bet results.
 * 
 * {@link UserController}
 * 
 */
public class UserControllerTest {

    private UserController controller;

    /**
     * Initializes a controller to be used across most of the test cases.
     */
    @BeforeEach
    void setUp() {
        controller = new UserController();
    }

    /**
     * Verifies that existing user information is correctly returned.
     *
     * {@link UserController#getUserInfo(String)}
     */
    @Test
    void testGetUserInfo_Success() {
        ResponseEntity<?> response = controller.getUserInfo("john_doe");
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(((Map<?, ?>) response.getBody()).containsKey("username"));
    }

    /**
     * Verifies behavior when requesting info for a user that does not exist.
     * 
     * {@link UserController#getUserInfo(String)}
     */
    @Test
    void testGetUserInfo_NotFound() {
        ResponseEntity<?> response = controller.getUserInfo("usernotfound");
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("User not found", response.getBody());
    }

    /**
     * Verifies that a full name is returned for an existing username.
     *
     * {@link UserController#getUserName(String)}
     */
    @Test
    void testGetUserName_Success() {
        ResponseEntity<?> response = controller.getUserName("jane_smith");
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Jane Smith", response.getBody());
    }

    /**
     * Verifies that the demo password is returned for the demo user.
     * 
     * {@link UserController#getUserPassword(String)}
     */
    @Test
    void testGetUserPassword_Demo() {
        ResponseEntity<?> response = controller.getUserPassword("john_doe");
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("password123", response.getBody());
    }

    /**
     * Verifies that a new user is successfully created with valid data.
     *
     * {@link UserController#createUser(Map)}
     */
    @Test
    void testCreateUser_Success() {
        Map<String, Object> user = new HashMap<>();
        user.put("name", "Test User");
        user.put("username", "test1");
        user.put("password", "pass123");
        user.put("amount", 500.0);

        ResponseEntity<?> response = controller.createUser(user);
        assertEquals(HttpStatus.OK, response.getStatusCode());

        Map<?, ?> responseBody = (Map<?, ?>) response.getBody();
        assertEquals("test1", responseBody.get("username"));
    }


    /**
     * Verifies user creation failure when the username is already taken.
     * 
     * {@link UserController#createUser(Map)}
     */
    @Test
    void testCreateUser_UsernameExists() {
        Map<String, Object> user = new HashMap<>();
        user.put("name", "Username Exists");
        user.put("username", "john_doe");
        user.put("password", "pass");
        user.put("amount", 1000.0);

        ResponseEntity<?> response = controller.createUser(user);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Username already exists", response.getBody());
    }

    /**
     * Verifies user creation failure when required fields are missing.
     * 
     * {@link UserController#createUser(Map)}
     */
    @Test
    void testCreateUser_MissingFields() {
        Map<String, Object> user = new HashMap<>();
        user.put("username", "test2");

        ResponseEntity<?> response = controller.createUser(user);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertTrue(response.getBody().toString().contains("All fields"));
    }

    /**
     * Verifies successful bet placement when user has sufficient balance.
     *
     * {@link UserController#placeBet(String, Map)}
     */
    @Test
    void testPlaceBet_Success() {
        Map<String, Double> betRequest = new HashMap<>();
        betRequest.put("betAmount", 100.0);
        betRequest.put("potentialWin", 200.0);

        ResponseEntity<?> response = controller.placeBet("jane_smith", betRequest);
        assertEquals(HttpStatus.OK, response.getStatusCode());

        Map<?, ?> responseBody = (Map<?, ?>) response.getBody();
        assertEquals("jane_smith", responseBody.get("username"));
        assertEquals(650.0, (Double) responseBody.get("newBalance"), 0.01);
    }

    /**
     * Verifies bet placement failure when the user does not have enough moeny.
     * 
     * {@link UserController#placeBet(String, Map)}
     */
    @Test
    void testPlaceBet_InsufficientFunds() {
        Map<String, Double> betRequest = new HashMap<>();
        betRequest.put("betAmount", 1000.0);
        betRequest.put("potentialWin", 300.0);

        ResponseEntity<?> response = controller.placeBet("john_doe", betRequest);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Insufficient funds", response.getBody());
    }

    /**
     * Verifies that a win result updates the user’s balance correctly.
     *
     * {@link UserController#processBetResult(String, Map)}
     */
    @Test
    void testProcessBetResult_Win() {
        Map<String, Object> winRequest = new HashMap<>();
        winRequest.put("won", true);
        winRequest.put("winAmount", 300.0);

        ResponseEntity<?> response = controller.processBetResult("john_doe", winRequest);
        assertEquals(HttpStatus.OK, response.getStatusCode());

        Map<?, ?> body = (Map<?, ?>) response.getBody();
        assertEquals(800.0, (Double) body.get("newBalance"), 0.01);
        assertTrue((Boolean) body.get("won"));
    }

    /**
     * Verifies that a loss result does not change the balance.
     * 
     * {@link UserController#processBetResult(String, Map)}
     */
    @Test
    void testProcessBetResult_Loss() {
        Map<String, Object> lossRequest = new HashMap<>();
        lossRequest.put("won", false);

        ResponseEntity<?> response = controller.processBetResult("jane_smith", lossRequest);
        assertEquals(HttpStatus.OK, response.getStatusCode());

        Map<?, ?> body = (Map<?, ?>) response.getBody();
        assertEquals(750.0, (Double) body.get("newBalance"));
        assertFalse((Boolean) body.get("won"));
    }

    /**
     * Verifies that invalid win amounts are not used for winning bets.
     * 
     * {@link UserController#processBetResult(String, Map)}
     */
    @Test
    void testProcessBetResult_InvalidWinAmount() {
        Map<String, Object> winRequest = new HashMap<>();
        winRequest.put("won", true);
        winRequest.put("winAmount", 0.0);

        ResponseEntity<?> response = controller.processBetResult("john_doe", winRequest);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Win amount must be greater than zero", response.getBody());
    }

    /**
     * Verifies bet placement failure if the user is not found.
     * 
     * {@link UserController#placeBet(String, Map)}
     */
    @Test
    void testPlaceBet_UserNotFound() {
        Map<String, Double> request = Map.of("betAmount", 10.0, "potentialWin", 20.0);
        ResponseEntity<?> response = controller.placeBet("usernotfound", request);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    /**
     * Verifies that bet result processing fails if the user is not found.
     * 
     * {@link UserController#processBetResult(String, Map)}
     */
    @Test
    void testProcessBetResult_UserNotFound() {
        Map<String, Object> request = Map.of("won", true, "winAmount", 50.0);
        ResponseEntity<?> response = controller.processBetResult("usernotfound", request);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }
}

