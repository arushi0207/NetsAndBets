package com.example.demo;

import com.example.demo.controller.MainController;
import com.example.demo.model.Bet;
import com.example.demo.model.MarchMadnessTeam;
import com.example.demo.model.User;
import com.example.demo.repository.BetRepository;
import com.example.demo.repository.MarchMadnessTeamRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.MarchMadnessScraper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

/**
 * Unit tests for MainController that focus on user signup, login, team scraping,
 * bet placement, and data retrieval functionalities.
 * 
 * {@link MainController}
 * 
 */
public class MainControllerTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private MarchMadnessTeamRepository teamRepository;

    @Mock
    private MarchMadnessScraper scraper;

    @Mock
    private BetRepository betRepository;

    @InjectMocks
    private MainController controller;

    private User user;

    /**
     * Initializes a valid user to be used across most of the test cases.
     */
    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);

        user = new User();
        user.setId(1L);
        user.setUsername("testuser");
        user.setPassword("testpass");
        user.setAmount(1000.0);
    }

    /**
     * Verifies successful signup when the username does not already exist in the database.
     * {@link MainController#signUpUser(User)}
     */
    @Test
    public void testSignUp_Success() {
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.empty());

        ResponseEntity<?> response = controller.signUpUser(user);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(userRepository).save(any(User.class));
    }

    /**
     * Verifies signup failure when the username is already taken i.e. exists in the database.
     * {@link MainController#signUpUser(User)}
     */
    @Test
    public void testSignUp_UsernameTaken() {
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));

        ResponseEntity<?> response = controller.signUpUser(user);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertTrue(response.getBody().toString().contains("Username is already taken"));
    }

    /**
     * Verifies login failure when username is not found in the database.
     * {@link MainController#loginUser(User)}
     */
    @Test
    public void testLogin_UserNotFound() {
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.empty());

        ResponseEntity<?> response = controller.loginUser(user);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("User not found.", response.getBody());
    }

    /**
     * Verifies login failure when the password is incorrect.
     * {@link MainController#loginUser(User)}
     */
    @Test
    public void testLogin_IncorrectPassword() {
        user.setPassword("$3$9@!$someincorrecthash");
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));

        User loginAttempt = new User();
        loginAttempt.setUsername("testuser");
        loginAttempt.setPassword("wrongpass");

        ResponseEntity<?> response = controller.loginUser(loginAttempt);
        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertEquals("Incorrect password.", response.getBody());
    }

    /**
     * Verifies that scraping logic executes and returns a confirmation string.
     * {@link MainController#scrapeTeams()}
     */
    @Test
    public void testScrapeTeams() {
        doNothing().when(scraper).runScraper();

        String result = controller.scrapeTeams();
        assertEquals("Scraping and saving teams completed!", result);
    }

    /**
     * Verifies that all users are returned when retrieved from the database.
     * {@link MainController#getAllUsers()}
     */
    @Test
    public void testGetAllUsers() {
        when(userRepository.findAll()).thenReturn(List.of(user));
        Iterable<User> result = controller.getAllUsers();
        assertTrue(result.iterator().hasNext());
    }

    /**
     * Verifies that a user can be retrieved by their username.
     * {@link MainController#getUserByUsername(String)}
     */
    @Test
    public void testGetUserByUsername() {
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        Optional<User> foundUser = controller.getUserByUsername("testuser");
        assertTrue(foundUser.isPresent());
    }

    /**
     * Verifies that the list of all teams is returned correctly.
     * {@link MainController#getAllTeams()}
     */
    @Test
    public void testGetAllTeams() {
        MarchMadnessTeam team = new MarchMadnessTeam();
        team.setName("Wisconsin");
        when(teamRepository.findAll()).thenReturn(List.of(team));
        List<MarchMadnessTeam> teams = controller.getAllTeams();
        assertEquals(1, teams.size());
    }

    /**
     * Verifies that user-specific bets can be retrieved.
     * {@link MainController#getBets(Long)}
     */
    @Test
    public void testGetUserBets() {
        Bet bet = new Bet();
        bet.setUserId(1L);
        when(betRepository.findByUserId(1L)).thenReturn(List.of(bet));
        List<Bet> bets = controller.getBets(1L);
        assertEquals(1, bets.size());
    }

    /**
     * Verifies bet failure when no username is provided.
     * {@link MainController#bets(Map)}
     */
    @Test
    public void testBets_MissingUsername() {
        Map<String, Object> betInfo = new HashMap<>();
        betInfo.put("amount", 950);

        ResponseEntity<?> response = controller.bets(betInfo);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("No username found. Username is required", response.getBody());
    }

    /**
     * Verifies bet failure when the user does not exist.
     * {@link MainController#bets(Map)}
     */
    @Test
    public void testBets_UserNotFound() {
        Map<String, Object> betInfo = Map.of("username", "notFound", "amount", 950);
        when(userRepository.findByUsername("notFound")).thenReturn(Optional.empty());

        ResponseEntity<?> response = controller.bets(betInfo);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Could not find the user. Username does not exist", response.getBody());
    }

    /**
     * Verifies bet failure when the bet amount is missing.
     * {@link MainController#bets(Map)}
     */
    @Test
    public void testBets_MissingAmount() {
        Map<String, Object> betInfo = Map.of("username", "alice");

        when(userRepository.findByUsername("alice")).thenReturn(Optional.of(new User()));

        ResponseEntity<?> response = controller.bets(betInfo);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("No bet amount found. Bet amount is required", response.getBody());
    }

    /**
     * Verifies bet failure when the bet amount is invalid.
     * {@link MainController#bets(Map)}
     */
    @Test
    public void testBets_InvalidAmount() {
        Map<String, Object> betInfo = new HashMap<>();
        betInfo.put("username", "test1");
        betInfo.put("amount", "fifty");

        when(userRepository.findByUsername("test1")).thenReturn(Optional.of(new User()));

        ResponseEntity<?> response = controller.bets(betInfo);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Bet amount is invalid", response.getBody());
    }

    /**
     * Verifies bet failure when user has insufficient balance.
     * {@link MainController#bets(Map)}
     */
    @Test
    public void tesBets_InsufficientBalance() {
        User user = new User();
        user.setAmount(20.0);

        Map<String, Object> betInfo = Map.of(
                "username", "test2",
                "amount", 30.0);

        when(userRepository.findByUsername("test2")).thenReturn(Optional.of(user));

        ResponseEntity<?> response = controller.bets(betInfo);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("You don't have sufficient balance", response.getBody());
    }

    /**
     * Verifies bet failure when team side is invalid (not A or B).
     * {@link MainController#bets(Map)}
     */
    @Test
    public void testBets_InvalidTeamSide() {
        User user = new User();
        user.setAmount(100.0);
        user.setId(1L);

        Map<String, Object> betInfo = Map.of(
                "username", "test1",
                "amount", 10.0,
                "odds", 1.5,
                "amountToWin", 15.0,
                "roundIndex", 2,
                "team", "C",
                "teamA", "Wisconsin",
                "teamB", "Purdue",
                "matchup", "Wisconsin vs Purdue");

        when(userRepository.findByUsername("test1")).thenReturn(Optional.of(user));

        ResponseEntity<?> response = controller.bets(betInfo);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Invalid team side. Must be 'A' or 'B'", response.getBody());
    }

    /**
     * Verifies successful bet placement with all the valid inputs.
     * {@link MainController#bets(Map)}
     */
    @Test
    public void testBets_SuccessfulBet() {
        User user = new User();
        user.setUsername("test1");
        user.setAmount(100.0);
        user.setId(1L);

        Map<String, Object> betInfo = Map.of(
                "username", "test1",
                "amount", 10.0,
                "odds", 1.5,
                "amountToWin", 15.0,
                "roundIndex", 2,
                "team", "A",
                "teamA", "Wisconsin",
                "teamB", "Purdue",
                "matchup", "Wisconsin vs Purdue");

        when(userRepository.findByUsername("test1")).thenReturn(Optional.of(user));

        ResponseEntity<?> response = controller.bets(betInfo);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        Map<?, ?> responseBody = (Map<?, ?>) response.getBody();
        assertEquals("Bet placed successfully", responseBody.get("message"));
        assertEquals(90.0, (Double) responseBody.get("newBalance"), 0.01);
    }

}
