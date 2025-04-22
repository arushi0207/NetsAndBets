package com.example.demo;

import com.example.demo.controller.HelloController;
import com.example.demo.model.Message;
import com.example.demo.repository.MessageRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class HelloControllerTest {

    @Mock
    private MessageRepository messageRepository;

    @InjectMocks
    private HelloController helloController;

    private Message message;

    @BeforeEach
    public void setUp() {
        message = new Message();
        message.setId(1L);
        message.setContent("Hello, World!");
    }

    @Test
    public void testSaveMessage() {
        when(messageRepository.save(message)).thenReturn(message);

        Message saved = helloController.saveMessage(message);

        assertNotNull(saved);
        assertEquals("Hello, World!", saved.getContent());
        verify(messageRepository, times(1)).save(message);
    }

    @Test
    public void testGetMessages() {
        List<Message> messages = List.of(message);
        when(messageRepository.findAll()).thenReturn(messages);

        List<Message> result = helloController.getMessages();

        assertEquals(1, result.size());
        assertEquals("Hello, World!", result.get(0).getContent());
        verify(messageRepository, times(1)).findAll();
    }

    @Test
    public void testLoginSuccess() {
        Map<String, String> userData = new HashMap<>();
        userData.put("username", "testuser");
        userData.put("password", "testpass");

        helloController.login(Map.of("username", "init", "password", "init"));
        helloController.addUserForTesting("testuser", "testpass");

        ResponseEntity<String> response = helloController.login(userData);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Login successful!", response.getBody());
    }

    @Test
    public void testLoginFailure_WrongPassword() {
        Map<String, String> userData = new HashMap<>();
        userData.put("username", "wrong");
        userData.put("password", "wrongpass");

        ResponseEntity<String> response = helloController.login(userData);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Invalid username or password.", response.getBody());
    }

    @Test
    public void testLoginFailure_UserNotFound() {
        Map<String, String> loginData = new HashMap<>();
        loginData.put("username", "something");
        loginData.put("password", "nothing");

        ResponseEntity<String> response = helloController.login(loginData);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Invalid username or password.", response.getBody());
    }
}

