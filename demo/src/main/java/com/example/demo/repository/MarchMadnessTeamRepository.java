package com.example.demo.repository;

import com.example.demo.model.MarchMadnessTeam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MarchMadnessTeamRepository extends JpaRepository<MarchMadnessTeam, Long> {
    boolean existsByName(String name);
}
