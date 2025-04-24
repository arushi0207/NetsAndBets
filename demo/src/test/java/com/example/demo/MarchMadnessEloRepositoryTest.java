package com.example.demo;


import com.example.demo.model.MarchMadnessElo;
import com.example.demo.repository.MarchMadnessEloRepository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Unit tests for MarchMadnessEloRepository which focusses on basic CRUD and custom 
 * query operations for March Madness ELO data.
 * 
 * {@link MarchMadnessEloRepository}
 */
@DataJpaTest
public class MarchMadnessEloRepositoryTest {

    @Autowired
    private MarchMadnessEloRepository eloRepository;

    /**
     * Verifies that a saved ELO entity can be retrieved using 
     * 
     * {@link MarchMadnessEloRepository#findEloById(Long)}.
     */
    @Test
    public void testFindEloById() {

        MarchMadnessElo team = new MarchMadnessElo("Wisconsin", 1850);
        MarchMadnessElo saved = eloRepository.save(team);

        Optional<MarchMadnessElo> result = eloRepository.findById(saved.getId());

        assertTrue(result.isPresent());
        assertEquals("Wisconsin", result.get().getName());
        assertEquals(1850, result.get().getElo());
    }

    /**
     * Verifies that querying for a non-existent ID returns an empty Optional.
     * 
     * {@link MarchMadnessEloRepository#findEloById(Long)}.
     */
    @Test
    public void testFindEloById_NotFound() {
        Optional<MarchMadnessElo> result = eloRepository.findById(999L);
        assertTrue(result.isEmpty());
    }
}
