package com.example.demo;

import com.example.demo.model.Bet;
import com.example.demo.repository.BetRepository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Unit tests for BetRepository which focusses on query methods that retrieve bets by status and user ID.
 * 
 * {@link BetRepository}.
 */
@DataJpaTest
public class BetRepositoryTest {

    @Autowired
    private BetRepository betRepository;

    /**
     * Verifies that findByStatus returns correct bets with the given status.
     *
     * {@link BetRepository#findByStatus(String)}
     */
    @Test
    public void testFindByStatus() {
        Bet bet1 = new Bet(1L, "Wisconsin vs Purdue", 1.5, 100.0, 150.0, "Win", 2, "Wisconsin", "A");
        Bet bet2 = new Bet(2L, "Georgia vs UConn", 2.0, 200.0, 400.0, "Loss", 3, "Georgia", "A");
        Bet bet3 = new Bet(1L, "Florida vs Oregon", 1.8, 120.0, 216.0, "Win", 4, "Oregon", "B");

        betRepository.saveAll(List.of(bet1, bet2, bet3));

        List<Bet> winBets = betRepository.findByStatus("Win");

        assertEquals(2, winBets.size());
        assertTrue(winBets.stream().allMatch(b -> b.getStatus().equals("Win")));
    }

    /**
     * Verifies that findByUserId returns all bets placed by a specific user.
     *
     * {@link BetRepository#findByUserId(Long)}
     */
    @Test
    public void testFindByUserId() {
        Bet bet1 = new Bet(1L, "Wisconsin vs Purdue", 1.5, 100.0, 150.0, "In Progress", 1, "Wisconsin", "A");
        Bet bet2 = new Bet(2L, "Georgia vs UConn", 2.0, 200.0, 400.0, "Loss", 2, "Georgia", "A");
        Bet bet3 = new Bet(1L, "Florida vs Oregon", 1.8, 120.0, 216.0, "Win", 3, "Florida", "A");

        betRepository.saveAll(List.of(bet1, bet2, bet3));

        List<Bet> user1Bets = betRepository.findByUserId(1L);

        assertEquals(2, user1Bets.size());
        assertTrue(user1Bets.stream().allMatch(b -> b.getUserId().equals(1L)));
    }
}
