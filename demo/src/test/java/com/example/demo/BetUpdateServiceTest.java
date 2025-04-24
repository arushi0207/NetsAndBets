package com.example.demo;

import com.example.demo.model.Bet;
import com.example.demo.model.MarchMadnessTeam;
import com.example.demo.model.User;
import com.example.demo.repository.BetRepository;
import com.example.demo.repository.MarchMadnessTeamRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.BetUpdateService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * Unit tests for the BetUpdateService class that focusses on the logic to update 
 * bet statuses based on team wins per round.
 * 
 * {@link BetUpdateService}
 */
@ExtendWith(MockitoExtension.class)
public class BetUpdateServiceTest {

    @Mock
    private BetRepository betRepository;

    @Mock
    private MarchMadnessTeamRepository teamRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private BetUpdateService betUpdateService;

    private User user;
    private Bet bet;
    private MarchMadnessTeam team;

    /**
     * Initializes a valid user, bet, and team to be used across most of the test cases.
     * 
     * {@link BetUpdateService}
     */
    @BeforeEach
    public void setup() {
        user = new User();
        user.setId(1L);
        user.setAmount(2000.0);

        bet = new Bet();
        bet.setUserId(1L);
        bet.setTeamsPlaying("Purdue vs Wisconsin");
        bet.setTeam("B");
        bet.setRoundIndex(3);
        bet.setAmountToWin(50.0);
        bet.setStatus("In Progress");

        team = new MarchMadnessTeam();
        team.setName("Wisconsin");
        team.setWinsPerRound("1,1,1,1,1,0");
    }

    /**
     * Verifies that a winning bet updates the status to "Win" and 
     * increments the user's balance according to the winning amount.
     */
    @Test
    public void testUpdateBetResults_Win() {
        Mockito.when(betRepository.findByStatus("In Progress")).thenReturn(List.of(bet));
        Mockito.when(teamRepository.findByName("Wisconsin")).thenReturn(Optional.of(team));
        Mockito.when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        betUpdateService.updateBetResults();

        assertEquals("Win", bet.getStatus());
        assertEquals(2050.0, user.getAmount());
    }

    /**
     * Verifies that a losing bet updates the status to "Loss"
     * and the user's balance remains as is.
     */
    @Test
    public void testUpdateBetResults_Loss() {
        team.setWinsPerRound("1,1,1,0,0,0");
        Mockito.when(betRepository.findByStatus("In Progress")).thenReturn(List.of(bet));
        Mockito.when(teamRepository.findByName("Wisconsin")).thenReturn(Optional.of(team));
        Mockito.lenient().when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        betUpdateService.updateBetResults();

        assertEquals("Loss", bet.getStatus());
        assertEquals(2000.0, user.getAmount());
    }

    /**
     * Verifies that an invalid round index does not change the bet status.
     */
    @Test
    public void testUpdateBetResults_InvalidRoundIndex() {
        bet.setRoundIndex(10);
        Mockito.when(betRepository.findByStatus("In Progress")).thenReturn(List.of(bet));
        Mockito.when(teamRepository.findByName("Wisconsin")).thenReturn(Optional.of(team));

        betUpdateService.updateBetResults();

        assertEquals("In Progress", bet.getStatus());
    }

    /**
     * Verifies that if the team associated with the bet is not found in the database,
     * the bet status remains unaltered.
     */
    @Test
    public void testUpdateBetResults_TeamNotFound() {
        Mockito.when(betRepository.findByStatus("In Progress")).thenReturn(List.of(bet));
        Mockito.when(teamRepository.findByName("Wisconsin")).thenReturn(Optional.empty());

        betUpdateService.updateBetResults();

        assertEquals("In Progress", bet.getStatus());
    }

    /**
     * Verifies that a malformed `winsPerRound` string does not change the bet status.
     */
    @Test
    public void testUpdateBetResults_MalformedWinsPerRound() {
        team.setWinsPerRound("1,1,1,x,1,0");
        Mockito.when(betRepository.findByStatus("In Progress")).thenReturn(List.of(bet));
        Mockito.when(teamRepository.findByName("Wisconsin")).thenReturn(Optional.of(team));

        betUpdateService.updateBetResults();

        assertEquals("In Progress", bet.getStatus());
        assertEquals(2000.0, user.getAmount());
    }

    /**
     * Verifies that if an unexpected round result (any value other than 0 or 1)
     * is present, the bet status does not change.
     */
    @Test
    public void testUpdateBetResults_UnexpectedRoundResult() {
        team.setWinsPerRound("1,1,1,2,1,0");
        Mockito.when(betRepository.findByStatus("In Progress")).thenReturn(List.of(bet));
        Mockito.when(teamRepository.findByName("Wisconsin")).thenReturn(Optional.of(team));

        betUpdateService.updateBetResults();

        assertEquals("In Progress", bet.getStatus());
    }

    /**
     * Verifies that when there are no bets to update, then the program does not crash.
     */
    @Test
    public void testUpdateBetResults_NoBetsToUpdate() {
        Mockito.when(betRepository.findByStatus("In Progress")).thenReturn(List.of());

        betUpdateService.updateBetResults();

    }


}
