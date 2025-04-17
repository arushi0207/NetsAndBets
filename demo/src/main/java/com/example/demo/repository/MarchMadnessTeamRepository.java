package com.example.demo.repository;

import com.example.demo.model.MarchMadnessTeam;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for managing {@link MarchMadnessTeam} entity.
 * 
 * This interface extends {@link JpaRepository}, providing built-in CRUD operations
 * and additional query methods for interacting with the database.
 */

@Repository
public interface MarchMadnessTeamRepository extends JpaRepository<MarchMadnessTeam, Long> {

    /**
     * Checks if a team with the given name already exists in the database.
     *
     * @param name The name of the team to check.
     * @return {@code true} if a team with the given name exists, otherwise {@code false}.
     */
    boolean existsByName(String name);

    /**
     * Retrieves a team by its name.
     *
     * @param name The name of the team to retrieve.
     * @return An {@link Optional} containing the team if found, or null if not found.
     */
    Optional<MarchMadnessTeam> findByName(String name);

}
