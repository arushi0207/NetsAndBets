package com.example.demo.repository;

import com.example.demo.model.Bet;
import com.example.demo.model.MarchMadnessElo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for managing {@link MarchMadnessElo} entity.
 * 
 * This interface extends {@link JpaRepository}, providing built-in CRUD operations
 * and additional query methods for interacting with the database.
 */

@Repository
public interface MarchMadnessEloRepository extends JpaRepository<MarchMadnessElo, Long> {


    /**
     *
     * @param id id of the team
     * @return An integer containing the MarchMadnessElo if found, or null if not found.
     */
    List<MarchMadnessElo> findEloById(Long id);

    /**
     *
     * @param id id of the team
     * @return An {@link Optional} containing the MarchMadnessElo if found, or null if not found.
     */
    Optional<MarchMadnessElo> findById(Long id);


}
