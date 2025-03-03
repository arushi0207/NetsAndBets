package com.example.demo.controller;

import com.example.demo.model.Message;
import com.example.demo.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
@RestController
public class HelloController {

    @Autowired // an annotation used for automatic dependency injection
    private MessageRepository messageRepository;

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
}