package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.model.Bet;

/**
 * Repository interface for managing {@link Bet} entity.
 * 
 * This interface extends {@link JpaRepository}, providing built-in CRUD operations
 * and additional query methods for interacting with the database.
 */
@Repository
public interface BetRepository extends JpaRepository<Bet, Long> {

    /**
     * Retrieves a list of bets based on their current status.
     *
     * @param status The current status of the bet ("Win", "Loss", "In Progress").
     * @return A list of bets matching the given status.
     */
    List<Bet> findByStatus(String status);
}

