package com.example.demo.service;

import com.example.demo.model.Bet;
import com.example.demo.model.MarchMadnessTeam;
import com.example.demo.model.User;
import com.example.demo.repository.BetRepository;
import com.example.demo.repository.MarchMadnessTeamRepository;
import com.example.demo.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Periodically to check bets that have status of "In Progress" and updates their status
 * based on game result stored in the MarchMadnessTeam table.
 *
 * If the selected team won the latest round, then the bet is marked as "Win"
 * and the user's balance is updated accordingly. Otherwise, it is marked as "Loss".
 */
@Service
public class BetUpdateService {

    @Autowired
    private BetRepository betRepository;

    @Autowired
    private MarchMadnessTeamRepository teamRepository;

    @Autowired
    private UserRepository userRepository;  // Add this

    /**
     * Scheduled task that runs every 1 minute to update in-progress bets.
     * Bets are updated based on the last round result of the selected team.
     */
    @Scheduled(fixedDelay = 60000)
    public void updateBetResults() {

        // Debugging statement to check when the scheduled method runs
        System.out.println("Running Bet Auto-Update...");

        // Gets a list of all the bets that are in progress
        List<Bet> inProgressBets = betRepository.findByStatus("In Progress");

        // If the list is empty then return early
        if (inProgressBets.isEmpty()) {
            System.out.println("No bets to update.");
            return;
        }

        // Iterate through each bet and update the status based on the team that won
        for (Bet bet : inProgressBets) {

            // Extract which team the user bet on 
            String selectedTeam = extractSelectedTeam(bet);
            System.out.println("Selected Team for Bet: " + selectedTeam);

            // Retrieve game result (win or loss) for the selected team
            Optional<MarchMadnessTeam> teamName = teamRepository.findByName(selectedTeam);

            // If the team is not found in the table then skip the bet
            if (teamName.isEmpty()) {
                System.out.println("Team not found in database: " + selectedTeam);
                continue;
            }

            MarchMadnessTeam team = teamName.get();
            String wins = team.getWinsPerRound();

            // Assume latest round result is the last character in the bit string (for now)
            Integer roundIndex = bet.getRoundIndex();

            // Split the bit-wise string representing team-wise tournament result by a comma
            String[] roundResults = wins.split(",");
            if (roundIndex == null || roundIndex < 0 || roundIndex >= roundResults.length) {
                System.out.println("Invalid round index for Bet ID: " + bet.getId());
                continue;
            }
            
            // Checking the result for that round
            String resultStr = roundResults[roundIndex].trim();
            if (!resultStr.equals("0") && !resultStr.equals("1")) {
                System.out.println("Unexpected result for Bet ID: " + bet.getId() + " at round index " + roundIndex + ": " + resultStr);
                continue;
            }
            
            char roundResult = resultStr.charAt(0);
            System.out.println("Team Wins String: " + wins + " | Round Index: " + roundIndex + " | Round Result: " + roundResult);

            // Update the bet status to "Win" or "Loss" based on the round result
            if (roundResult == '1') {
                bet.setStatus("Win");

                // If the user won, update their account balance with the winnings
                Optional<User> userOpt = userRepository.findById(bet.getUserId());
                if (userOpt.isPresent()) {
                    User user = userOpt.get();
                    user.setAmount(user.getAmount() + bet.getAmountToWin());
                    userRepository.save(user);
                    System.out.println("User ID: " + user.getId() + " won! New Balance: $" + user.getAmount());
                }
            } else {
                // If the team lost the round, mark the bet as lost
                bet.setStatus("Loss");
            }

            // Save the updated bet to the database
            betRepository.save(bet);
            System.out.println("Updated Bet ID: " + bet.getId() + " | Status: " + bet.getStatus());
        }

        System.out.println("Bet Status Auto-Update Completed.\n");
    }

    /**
     * Extracts the team the user bet on.
     *
     * @param bet The bet containing matchup information.
     * @return The name of the selected team the user bet on.
     */
    private String extractSelectedTeam(Bet bet) {
        String[] teams = bet.getTeamsPlaying().split(" vs ");
        if (teams.length < 2) {
            return null;
        }
        // Return the team based on the user's selection ("A" or "B")
        return "A".equals(bet.getTeam()) ? teams[0].trim() : teams[1].trim();
    }
}