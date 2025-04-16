package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import com.example.demo.model.User;

/**
 * Repository interface for managing {@link User} entity.
 * 
 * This interface extends {@link JpaRepository}, providing built-in CRUD operations
 * and additional query methods for interacting with the database.
 */
public interface UserRepository extends CrudRepository<User, Integer> {

    /**
     * Retrieves a user by their username.
     *
     * @param username The username to find.
     * @return An {@link Optional} containing the user if found, or null if empty.
     */
    Optional<User> findByUsername(String username);

    /**
     * Retrieves a user by their unique ID.
     *
     * @param id The user's ID to search for.
     * @return An {@link Optional} containing the user if found, or null if empty.
     */
    Optional<User> findById(Long id);

}
