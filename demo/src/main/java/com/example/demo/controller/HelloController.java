package com.example.demo.controller;

import com.example.demo.model.Message;
import com.example.demo.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * REST controller for handling message-related requests.
 *
 * <p>This controller provides endpoints to save and retrieve messages using
 * a {@link MessageRepository}.
 * The @RestController annotation indicates that this class will handle HTTP requests and return JSON responses.</p>
 *
 * <p>It exposes the following endpoints:</p>
 * <ul>
 *   <li>POST {@code /hello} - Saves a new message.</li>
 *   <li>GET {@code /hello} - Retrieves all stored messages.</li>
 * </ul>
 */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class HelloController {

    @Autowired // an annotation used for automatic dependency injection
    private MessageRepository messageRepository;

    //Stores user credentials temporarily
    private final Map<String, String> users = new HashMap<>();


    /**
     * Saves a new message.
     *
     * @param message The message to be saved, provided in the request body.
     * @return The saved {@link Message} entity.
     */
    @PostMapping("/hello")
    public Message saveMessage(@RequestBody Message message) {
        return messageRepository.save(message);
    }

    /**
     * Retrieves all messages in {@link MessageRepository}.
     *
     * @return A list of all stored {@link Message} entities.
     */
    @GetMapping("/hello")
    public List<Message> getMessages() {
        return messageRepository.findAll();
    }

    /**
     * Handles user signup by adding a new username and password to the storage.
     * 
     * @param userData A map containing "username" and "password" provided in the request body.
     * @return A ResponseEntity indicating success or failure while signing up.
     */

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody Map<String, String> userData) {
        String username = userData.get("username");
        String password = userData.get("password");

        //Checks if the username already exists
        if (users.containsKey(username)) {
            return ResponseEntity.badRequest().body("Username already exists.");
        }

        //Stores the new user credentials
        users.put(username, password);
        return ResponseEntity.ok("Signup successful!");
    }

    /**
     * Handles user login by verifying the provided username and password.
     * 
     * @param userData A map containing "username" and "password" provided in the request body.
     * @return A ResponseEntity indicating success or failure while logging in.
     */
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> userData) {
        String username = userData.get("username");
        String password = userData.get("password");

        //Checks if username exists and password matches
        if (users.containsKey(username) && users.get(username).equals(password)) {
            return ResponseEntity.ok("Login successful!");
        }

        return ResponseEntity.badRequest().body("Invalid username or password.");
    }

}