package com.example.demo.model;
import jakarta.persistence.*;

@Entity
@Table(name = "odds")
public class MarchMadnessElo {
    /** Unique identifier for the team (auto-generated). */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Name of the team. */
    @Column(name = "team_name", nullable = false)
    private String name;

    /** ELO of the team. */
    @Column(name = "elo", nullable = false)
    private int elo;

    /**
     * Default constructor
     */
    public MarchMadnessElo() {}

    /** Constructor for an individual Team ELO entry
     *
     * @param name Team Name
     * @param elo ELO
     */
    public MarchMadnessElo(String name, int elo) {
        this.name = name;
        this.elo = elo;
    }

    /**
     * Gets the id of the team
     *
     * @return The unique identifier of the team
     */
    public Long getId() { return id; }

    /**
     * Gets the name of the team
     *
     * @return The name of the team
     */
    public String getName() { return name; }

    /**
     * Sets the name of the team
     */
    public void setName(String name) { this.name = name; }

    /**
     * Gets the ELO of the team
     *
     * @return The ELO
     */
    public int getElo() { return elo; }

    /**
     * Sets the ELO of the team
     */
    public void setElo(int elo) { this.elo = elo; }
}
