package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "march_madness_teams")
public class MarchMadnessTeam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "team_name", nullable = false)
    private String name;

    @Column(name = "seed", nullable = false)
    private int seed;

    @Column(name = "region", nullable = false)
    private String region;

    public MarchMadnessTeam() {}

    public MarchMadnessTeam(String name, int seed, String region) {
        this.name = name;
        this.seed = seed;
        this.region = region;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public int getSeed() { return seed; }
    public void setSeed(int seed) { this.seed = seed; }

    public String getRegion() { return region; }
    public void setRegion(String region) { this.region = region; }
}
