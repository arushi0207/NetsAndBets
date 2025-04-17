package com.example.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

/**
 * Represents the bet placed by a user.
 * 
 * Each bet includes a bet ID, user’s ID, match of the teams,
 * the betting odds, the amount of money bet, amount of money that could be won,
 * and a status to indicate whether the bet is in progress, won, or lost.
 *
 */
@Entity
public class Bet {

    /** Unique identifier for the bet placed (auto-generated). */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**  Unique identifier for the user who placed the bet (taken from user table)*/
    @Column(name = "userId", nullable = false)
    private Long userId;

    /**  Matchup of the team on which the user placed a bet (Team A vs Team B)*/
    @Column(name = "teamsPlaying", nullable = false)
    private String teamsPlaying;

    /**  The betting odds (spread, moneyline etc.)*/
    @Column(name = "bettingOdds", nullable = false)
    private double bettingOdds;

    /**  The amount the user bet*/
    @Column(name = "amountBet", nullable = false)
    private double amountBet;

    /**  The amount user could win if the team they bet on wins*/
    @Column(name = "amountToWin", nullable = false)
    private double amountToWin;

    /**  The current status of the match ("Win", "Loss", "In Progress")*/
    @Column(name = "status", nullable = false)
    private String status;

    // Default constructor 
    public Bet() { }

    /**
     * Constructor to initialize a bet
     *
     * @param userId ID of the user placing the bet
     * @param teamsPlaying The matchup string
     * @param bettingOdds Odds for the bet
     * @param amountBet Amount of money bet
     * @param amountToWin Amount of moneyt that could be win
     * @param status Current status of the matchup
     */
    public Bet(Long userId, String teamsPlaying, double bettingOdds, double amountBet, double amountToWin, String status) {
        this.userId = userId;
        this.teamsPlaying = teamsPlaying;
        this.bettingOdds = bettingOdds;
        this.amountBet = amountBet;
        this.amountToWin = amountToWin;
        this.status = status;
    }


    /**
     * Gets the id of the bet
     * 
     * @return The unique identifier of the bet
     */
    public Long getId() {
        return id;
    }

    /**
     * Gets the id of the user
     * 
     * @return The unique identifier of the user
     */
    public Long getUserId() {
        return userId;
    }

    /**
     * Sets the id of the user
     */
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    /**
     * Gets the string displaying team matchup in the form Team A vs Team B
     * 
     * @return The unique identifier of the team
     */
    public String getTeamsPlaying() {
        return teamsPlaying;
    }

    /**
     * Sets the team matchup
     */
    public void setTeamsPlaying(String teamsPlaying) {
        this.teamsPlaying = teamsPlaying;
    }

    /**
     * Gets the betting odds for the matchup
     * 
     * @return The unique identifier of the team
     */
    public double getBettingOdds() {
        return bettingOdds;
    }

    /**
     * Sets the betting odds for the team matchup selected
     */
    public void setBettingOdds(double bettingOdds) {
        this.bettingOdds = bettingOdds;
    }

    /**
     * Gets the total amount of money that was placed in the bet
     * 
     * @return The unique identifier of the team
     */
    public double getAmountBet() {
        return amountBet;
    }

    /**
     * Sets the amount to be placed in the bet
     */
    public void setAmountBet(double amountBet) {
        this.amountBet = amountBet;
    }

    /**
     * Gets the total amount of money that the user can win if the team won
     * 
     * @return The unique identifier of the team
     */
    public double getAmountToWin() {
        return amountToWin;
    }

    /**
     * Sets the total money that could be won
     */
    public void setAmountToWin(double amountToWin) {
        this.amountToWin = amountToWin;
    }

    /**
     * Gets the status of the matchup
     * 
     * @return The unique identifier of the team
     */
    public String getStatus() {
        return status;
    }

    /**
     * Sets the status of the matchup
     */
    public void setStatus(String status) {
        this.status = status;
    }
}

