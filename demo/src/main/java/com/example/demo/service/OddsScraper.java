package com.example.demo.service;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class OddsScraper {

    public static void main(String[] args) {
        // URL for the ESPN men's college basketball team stats page for season 2025
        String url = "https://www.espn.com/mens-college-basketball/stats/team/_/season/2025";

        try {
            System.out.println("Starting");
            // Connect to the URL with a common user agent
            Document doc = Jsoup.connect(url)
                    .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                            + "(KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3")
                    .get();

            // Use the provided absolute CSS selector to get the team name element
            Element teamNameElem = doc.select("html body div#espnfitt div#DataWrapper div#themeProvider.theme-light div#fitt-analytics div.bp-mobileMDPlus.bp-mobileLGPlus.bp-tabletPlus.bp-desktopPlus.bp-desktopLGPlus.bp-desktopXLGPlus.no-touch main#fittPageContainer div.pageContent div.page-container.cf div.layout.is-full div.layout__column.layout__column--1 section.Card div.Wrapper.Card__Content div.ResponsiveTable.ResponsiveTable--fixed-left.mt4.Table2__title--remove-capitalization div.flex table.Table.Table--align-right.Table--fixed.Table--fixed-left tbody.Table__TBODY tr.Table__TR.Table__TR--sm.Table__TR--even td.Table__TD div.ResponsiveWrapper div.flex.items-start.mr7 a.AnchorLink")
                    .first();

            if (teamNameElem == null) {
                System.out.println("Team name element not found! The page structure may have changed.");
            } else {
                // Print only the text content (e.g., "Alabama Crimson Tide")
                System.out.println(teamNameElem.text());
            }

            // Extract the corresponding stats for that team from the scroller table
            Element statsRow = doc.select(".Table__Scroller > table:nth-child(1) > tbody:nth-child(3) > tr:nth-child(1)")
                    .first();

            if (statsRow == null) {
                System.out.println("Stats row not found! The page structure may have changed.");
            } else {
                // Optionally, you can also extract headers if needed from the scroller table
                System.out.println("Stats for the team:");
                Elements cols = statsRow.select("td");
                for (Element col : cols) {
                    System.out.print(col.text() + "\t");
                }
                System.out.println();
            }

            System.out.println(doc);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
