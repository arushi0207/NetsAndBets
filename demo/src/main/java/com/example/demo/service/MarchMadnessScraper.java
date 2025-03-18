package com.example.demo.service;

import com.example.demo.model.MarchMadnessTeam;
import com.example.demo.repository.MarchMadnessTeamRepository;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Service class for scraping March Madness team data from a webpage
 * and saving it into the database.
 * 
 * This service fetches and parses HTML content from an external website to extract
 * team names, seeds, and regions. It ensures that duplicate teams are not inserted
 * into the database by checking for existing records.
 */

@Service
public class MarchMadnessScraper {

    @Autowired
    private MarchMadnessTeamRepository teamRepository;

    /**
     * Fetches the March Madness bracket from the Sports Illustrated website,
     * extracts team names, seeds, and regions, and saves them into the database.
     * 
     */
    public void scrapeAndSave() {
        String url = "https://www.si.com/college-basketball/march-madness-bracket-schedule-locations";

        try {
            // Fetch the HTML content of the webpage.
            Document doc = Jsoup.connect(url).get();

            // Specifically extracts headers (h2) and paragraph (p) that contain team matchups.
            Elements elements = doc.select("h2, p");

            // Tracks the current region as we parse the page
            String currentRegion = null;

            // Boolean variable to stop processing once "First Four" is encountered.
            boolean reachedFirstFour = false;

            // Iterate through the each extracted HTML element.
            for (Element element : elements) {

                // H2 elements consists of region headers (South, East, West, MidWest) 
                if (element.tagName().equals("h2")) {
                    String headerText = element.text().trim();

                    // "First Four" is a separate section so we ignore matchups beyond this point.
                    if (headerText.equalsIgnoreCase("First Four")) {
                        reachedFirstFour = true;
                        break;
                    }

                    // Storing only the region and removing "Region" from our text
                    currentRegion = headerText.replace(" Region", "").trim();
                } 

                // p elements contain team matchups in the format "No. seed1 team1 vs. No. seed2 team2".
                else if (!reachedFirstFour && element.tagName().equals("p") && currentRegion != null) {
                    String text = element.text().trim();

                    // Regex pattern to extract two team names and their respective seeds.
                    String regex = "No[.,]\\s*(\\d+)\\s*(.+?)\\s*vs\\.?\\s*No[.,]\\s*(\\d+)\\s*([^,\\d]+)";
                    Pattern pattern = Pattern.compile(regex);
                    Matcher matcher = pattern.matcher(text);

                    if (matcher.find()) {
                        int seed1 = Integer.parseInt(matcher.group(1));
                        String team1 = matcher.group(2).trim();
                        int seed2 = Integer.parseInt(matcher.group(3));
                        String team2 = matcher.group(4).trim();

                        // Save each team only if it does not already exist in the table
                        if (!teamRepository.existsByName(team1)) {
                            teamRepository.save(new MarchMadnessTeam(team1, seed1, currentRegion));
                        }
                        if (!teamRepository.existsByName(team2)) {
                            teamRepository.save(new MarchMadnessTeam(team2, seed2, currentRegion));
                        }
                    }
                }
            }

            System.out.println("Data successfully stored in the database!");

        } catch (IOException e) {
            
            // Log an error if the webpage is unable to be reached.
            e.printStackTrace();
        }
    }
}
