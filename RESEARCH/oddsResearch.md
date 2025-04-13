# Research Report

## Calculating Odds From Scraping Current NCAA Basketball Team Data

### Summary of Work
I researched sports odds, came up with a basic formula for them, designed the table for usage by backend developers, and scraped data from NCAA website. 

### Motivation

The purpose of this research was to find relevant data to calculate odds, figure out how odds are and could be calculated, design a table for odds, and build on the establsihed conventions from the current JSoup scraping implementations of this project. 

### Time Spent

Familiarizing myself with current project funcitonality with JSoup and structure (location of methods, etc. ) ~ 1 hour
Odds Research ~ 1.5 hours
Scraping  ~ 2 hours

### Results

After looking through and understanding current project code, I began looking into how odds worked. There are three primary formats, which are American Odds, Decimal Odds, and Fractional Odds. American odds will definitively be used in our frontend, but it may be easier to store decimal and/or fractional odds in the MySQL table. Luckily, there is a simple way to convert between odds. 


Sites like DraftKings don't neccesarily disclose how they create odds for matches and games, but typically Sportsbooks aim to have odds as accurate as possible to generate the most consistent profit. These odds are set and adjusted basked on historical statistics and current trends. 

I currently plan only to use one site for data. I decided to use a simple formula to calculate a team's ELO, and add more complexity later. PTS + 0.5*3P%. I started scraping in an essentially standalone java file with JSoup, and primarily used CSS Selectors to find the information I needed. For the NCAA Page, there is an issue of making sure teams are matched to the right statistics. From there, 

### Sources

-  Understanding Odds (US) [^1]
- RegexR[^2]
- Sports Odds History[^3]
- Odds API[^4]
- NCAA Basketball 2025 Stats[^5]


[^1]: https://help.draftkings.com/hc/en-us/articles/360061942833-Understanding-Odds-US
[^2]: https://regexr.com/
[^3]: https://www.sportsoddshistory.com/cbb-champs/
[^4]: https://the-odds-api.com/
[^5]: https://www.espn.com/mens-college-basketball/stats/team/_/season/2025
