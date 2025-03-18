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

@Service
public class MarchMadnessScraper {

    @Autowired
    private MarchMadnessTeamRepository teamRepository;

    public void scrapeAndSave() {
        String url = "https://www.si.com/college-basketball/march-madness-bracket-schedule-locations";

        try {
            Document doc = Jsoup.connect(url).get();
            Elements elements = doc.select("h2, p");

            String currentRegion = null;
            boolean reachedFirstFour = false;

            for (Element element : elements) {
                if (element.tagName().equals("h2")) {
                    String headerText = element.text().trim();

                    if (headerText.equalsIgnoreCase("First Four")) {
                        reachedFirstFour = true;
                        break;
                    }

                    currentRegion = headerText.replace(" Region", "").trim();
                } else if (!reachedFirstFour && element.tagName().equals("p") && currentRegion != null) {
                    String text = element.text().trim();
                    String regex = "No[.,]\\s*(\\d+)\\s*(.+?)\\s*vs\\.?\\s*No[.,]\\s*(\\d+)\\s*([^,\\d]+)";
                    Pattern pattern = Pattern.compile(regex);
                    Matcher matcher = pattern.matcher(text);

                    if (matcher.find()) {
                        int seed1 = Integer.parseInt(matcher.group(1));
                        String team1 = matcher.group(2).trim();
                        int seed2 = Integer.parseInt(matcher.group(3));
                        String team2 = matcher.group(4).trim();

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
            e.printStackTrace();
        }
    }
}
