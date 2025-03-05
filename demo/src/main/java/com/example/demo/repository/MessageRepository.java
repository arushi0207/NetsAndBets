package com.example.demo.repository;

import com.example.demo.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for managing {@link Message} entities.
 *
 * <p>This interface extends {@link JpaRepository}, providing built-in CRUD operations
 * for the {@link Message} entity with a primary key of type {@link Long}.</p>
 *
 * <p>It is annotated with {@code @Repository}, making it a Spring-managed component
 * for database access.</p>
 */
@Repository
public interface MessageRepository extends JpaRepository <Message, Long> {
}