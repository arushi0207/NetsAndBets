package com.example.demo.service;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.model.MarchMadnessTeam;
import com.example.demo.repository.MarchMadnessTeamRepository;

import jakarta.annotation.PostConstruct;

@Component
public class MarchMadnessScraper {

    @Autowired
    private MarchMadnessTeamRepository teamRepository;

    /**
     * Holds temporary state for each team during scraping.
     * 
     * Each team has fixed information such as their name, region and seed. They
     * also have a bit-wise string
     * depicting win (1) and loss (0) for each round. The list index depicts the
     * round number.
     * 
     * This structure is only used in-memory while scraping and is converted into
     * MarchMadnessTeam entity before
     * saving to the database.
     */
    static class TeamInfo {
        String name;
        String region;
        int seed;
        List<Integer> winsPerRound = new ArrayList<>();

        public TeamInfo(String name, String region, int seed) {
            this.name = name;
            this.region = region;
            this.seed = seed;
        }

        /**
         * Converts wins per round list to a comma-separated string to store in the
         * database.
         * Example: [1, 1, 0, 0] → "1,1,0,0"
         */
        public String getWinsCSV() {
            return winsPerRound.stream()
                    .map(String::valueOf)
                    .collect(Collectors.joining(","));
        }
    }

    /**
     * Scrapes NCAA March Madness bracket data, extracts match results for each
     * matchup round-by-round,
     * and stores it to the database. Handles all First Round, Second Round, Sweet
     * 16, Elite 8, Final Four,
     * and Championship separately based on HTML structure.
     *
     * This is run automatically on application startup via @PostConstruct. It has
     * been commented so as to not
     * duplicate row entries everytime application is started.
     */
    // @PostConstruct
    public void runScraper() {
        String url = "https://www.ncaa.com/march-madness-live/bracket";

        // 4 region-wise rounds + final four + championship
        final int TOTAL_ROUNDS = 6;

        try {
            Document doc = Jsoup.connect(url).get();

            // Extracting bracket class from the website HTML
            Element bracketMain = doc.selectFirst(".bracket-main");

            if (bracketMain == null) {
                System.out.println("bracket-main not found.");
                return;
            }

            // Maintains data for each team during the scraping process in the order that
            // was scraped
            Map<String, TeamInfo> teamsMap = new LinkedHashMap<>();
            Elements regions = bracketMain.select(".region");

            // Processes all regional brackets and their matchups (South, East, West,
            // Midwest)
            for (Element region : regions) {
                String regionName = region.selectFirst(".subtitle") != null
                        ? region.selectFirst(".subtitle").text()
                        : "Unknown";

                Elements rounds = region.select(".region-round");
                int roundIndex = 0;

                // Each region has 4 rounds
                for (Element round : rounds) {
                    Elements games = round.select(".game-pod");
                    for (Element game : games) {
                        processGame(game, teamsMap, regionName, roundIndex, TOTAL_ROUNDS);
                    }

                    // Tracks the round number
                    roundIndex++;
                }
            }

            // Handle Final Four and Championship
            Element finalFour = bracketMain.selectFirst(".final-four");
            if (finalFour != null) {
                // Final Four - round index: 4
                Elements semifinals = finalFour.select(".game-pod-wrapper:not(.championship) .game-pod");
                for (Element game : semifinals) {
                    processGame(game, teamsMap, "Final Four", 4, TOTAL_ROUNDS);
                }

                // Championship - round index: 5
                Elements championship = finalFour.select(".game-pod-wrapper.championship .game-pod");
                for (Element game : championship) {
                    processGame(game, teamsMap, "Final Four", 5, TOTAL_ROUNDS);
                }
            }

            // Convert Linked Hashmap into MarchMadness Entities and save to database
            for (TeamInfo team : teamsMap.values()) {
                MarchMadnessTeam entity = new MarchMadnessTeam();
                entity.setName(team.name);
                entity.setRegion(team.region);
                entity.setSeed(team.seed);
                entity.setWinsPerRound(team.getWinsCSV());
                teamRepository.save(entity);
            }

            System.out.println("Saved " + teamsMap.size() + " teams to database.");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * Extracts and records win (1) or loss(0) results for a specific game and
     * updates both teams'
     * round data accordingly.
     * 
     * In case a team loses, the rest of the rounds are padded with 0s to indicate
     * elimination from the game.
     * 
     * @param game         The HTML element representing one game
     * @param teamsMap     The Linked Hashmap tracking each team’s state across all
     *                     rounds
     * @param region       The region (e.g., "East", "Final Four") in which the game
     *                     happened
     * @param roundIndex   The round number (0-based) where this game is played
     * @param TOTAL_ROUNDS Total number of rounds for proper padding for eliminated
     *                     teams
     */
    private void processGame(Element game, Map<String, TeamInfo> teamsMap, String region, int roundIndex,
            int TOTAL_ROUNDS) {

        // Extract top and bottom team from the matchup in bracket
        Element top = game.selectFirst(".team-top");
        Element bottom = game.selectFirst(".team-bottom");
        if (top == null || bottom == null)
            return;

        // Extract both team's <p> element
        Elements topTeamP = top.select("p");
        Elements bottomTeamP = bottom.select("p");

        // <p> element contains team name and score and if either are not present then
        // halt method execution
        if (topTeamP.size() < 2 || bottomTeamP.size() < 2)
            return;

        // Extract team names and scores from <p> tags.
        // First <p> contains team name and second contains score.
        String topName = topTeamP.get(0).text().trim();
        String topScoreText = topTeamP.get(1).text().trim();
        String bottomName = bottomTeamP.get(0).text().trim();
        String bottomScoreText = bottomTeamP.get(1).text().trim();

        // Extract seed values from the .overline span inside each team block
        String topSeedText = top.select(".overline").text().trim();
        String bottomSeedText = bottom.select(".overline").text().trim();

        // Validate that scores and seeds are numeric before parsing as Integer
        if (!topScoreText.matches("\\d+") || !bottomScoreText.matches("\\d+")
                || !topSeedText.matches("\\d+") || !bottomSeedText.matches("\\d+")) {
            return;
        }

        // Convert string score and seeds into integer to store in dataabase
        int topSeed = Integer.parseInt(topSeedText);
        int bottomSeed = Integer.parseInt(bottomSeedText);
        int topScore = Integer.parseInt(topScoreText);
        int bottomScore = Integer.parseInt(bottomScoreText);

        // Determine game winner based on scores
        boolean topWon = topScore > bottomScore;

        // Update top team’s result for this round
        TeamInfo topTeam = teamsMap.getOrDefault(topName, new TeamInfo(topName, region, topSeed));

        while (topTeam.winsPerRound.size() <= roundIndex) {
            topTeam.winsPerRound.add(0);
        }

        topTeam.winsPerRound.set(roundIndex, topWon ? 1 : 0);
        if (!topWon) {
            // Team is eliminated which means pad with 0s for remaining rounds
            while (topTeam.winsPerRound.size() < TOTAL_ROUNDS)
                topTeam.winsPerRound.add(0);
        }
        teamsMap.put(topName, topTeam);

        // Update bottom team’s result for this round
        TeamInfo bottomTeam = teamsMap.getOrDefault(bottomName, new TeamInfo(bottomName, region, bottomSeed));

        while (bottomTeam.winsPerRound.size() <= roundIndex) {
            bottomTeam.winsPerRound.add(0);
        }

        bottomTeam.winsPerRound.set(roundIndex, !topWon ? 1 : 0);
        if (topWon) {
            // Team is eliminated which means pad with 0s for remaining rounds
            while (bottomTeam.winsPerRound.size() < TOTAL_ROUNDS)
                bottomTeam.winsPerRound.add(0);
        }
        teamsMap.put(bottomName, bottomTeam);
    }
}
