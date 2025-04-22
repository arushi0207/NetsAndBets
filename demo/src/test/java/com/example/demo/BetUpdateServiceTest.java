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

    @Test
    public void testUpdateBetResults_Win() {
        Mockito.when(betRepository.findByStatus("In Progress")).thenReturn(List.of(bet));
        Mockito.when(teamRepository.findByName("Wisconsin")).thenReturn(Optional.of(team));
        Mockito.when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        betUpdateService.updateBetResults();

        assertEquals("Win", bet.getStatus());
        assertEquals(2050.0, user.getAmount());
    }

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

    @Test
    public void testUpdateBetResults_InvalidRoundIndex() {
        bet.setRoundIndex(10);
        Mockito.when(betRepository.findByStatus("In Progress")).thenReturn(List.of(bet));
        Mockito.when(teamRepository.findByName("Wisconsin")).thenReturn(Optional.of(team));

        betUpdateService.updateBetResults();

        assertEquals("In Progress", bet.getStatus());
    }

    @Test
    public void testUpdateBetResults_TeamNotFound() {
        Mockito.when(betRepository.findByStatus("In Progress")).thenReturn(List.of(bet));
        Mockito.when(teamRepository.findByName("Wisconsin")).thenReturn(Optional.empty());

        betUpdateService.updateBetResults();

        assertEquals("In Progress", bet.getStatus());
    }

    @Test
    public void testUpdateBetResults_MalformedWinsPerRound() {
        team.setWinsPerRound("1,1,1,x,1,0");
        Mockito.when(betRepository.findByStatus("In Progress")).thenReturn(List.of(bet));
        Mockito.when(teamRepository.findByName("Wisconsin")).thenReturn(Optional.of(team));

        betUpdateService.updateBetResults();

        assertEquals("In Progress", bet.getStatus());
        assertEquals(2000.0, user.getAmount());
    }

    @Test
    public void testUpdateBetResults_UnexpectedRoundResult() {
        team.setWinsPerRound("1,1,1,2,1,0");
        Mockito.when(betRepository.findByStatus("In Progress")).thenReturn(List.of(bet));
        Mockito.when(teamRepository.findByName("Wisconsin")).thenReturn(Optional.of(team));

        betUpdateService.updateBetResults();

        assertEquals("In Progress", bet.getStatus());
    }

    @Test
    public void testUpdateBetResults_NoBetsToUpdate() {
        Mockito.when(betRepository.findByStatus("In Progress")).thenReturn(List.of());

        betUpdateService.updateBetResults();

    }


}
