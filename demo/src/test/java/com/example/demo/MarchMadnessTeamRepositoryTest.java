package com.example.demo;

import com.example.demo.model.MarchMadnessTeam;
import com.example.demo.repository.MarchMadnessTeamRepository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Unit tests for MarchMadnessTeamRepository which focusses on query methods that find 
 * teams by name and check existence.
 * 
 * {@link MarchMadnessTeamRepository}
 */
@DataJpaTest
public class MarchMadnessTeamRepositoryTest {

    @Autowired
    private MarchMadnessTeamRepository teamRepository;

    /**
     * Verifies that existing teams are correctly identified and returned.
     * 
     * {@link MarchMadnessTeamRepository#existsByName(String)}
     */
    @Test
    public void testExistsByName() {
        // Arrange
        MarchMadnessTeam team = new MarchMadnessTeam("Wisconsin", 1, "East");
        teamRepository.save(team);

        // Act & Assert
        assertTrue(teamRepository.existsByName("Wisconsin"));
        assertFalse(teamRepository.existsByName("Purdue"));
    }

    /**
     * Verifies that the name of existing teams are correctly retrieved.
     * 
     * {@link MarchMadnessTeamRepository#findByName(String)}
     */
    @Test
    public void testFindByName() {

        MarchMadnessTeam team = new MarchMadnessTeam("UCLA", 2, "West");
        team.setWinsPerRound("1,1,1,1,0");
        teamRepository.save(team);

        Optional<MarchMadnessTeam> foundTeam = teamRepository.findByName("UCLA");

        assertTrue(foundTeam.isPresent());
        assertEquals("UCLA", foundTeam.get().getName());
        assertEquals("West", foundTeam.get().getRegion());
        assertEquals(2, foundTeam.get().getSeed());
        assertEquals("1,1,1,1,0", foundTeam.get().getWinsPerRound());
    }

    /**
     * Verifies that non-existent team is correctly identified and method returns null.
     * 
     * {@link MarchMadnessTeamRepository#findByName(String)}
     */
    @Test
    public void testFindByName_NotFound() {
        Optional<MarchMadnessTeam> result = teamRepository.findByName("NotARealTeam");
        assertTrue(result.isEmpty());
    }
}

