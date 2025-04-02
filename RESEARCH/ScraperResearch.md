# Research Report

## Scraping data from websites using JSoup and Selenium

### Summary of Work
My research focused on web scraping using JSoup and Selenium in Java, specifically to extract March Madness data such as team names, seeds, and regions from websites like Sports Illustrated and NCAA. I analyzed the differences between the two tools, tested their effectiveness in different scenarios, and identified the best approach for collecting structured data efficiently.

### Motivation

The goal of this research was to gather accurate and up-to-date March Madness tournament data to populate our database and eventually display matchups dynamically on a frontend application. Since different websites handle content rendering differently—some serving static HTML while others relying on JavaScript for dynamic updates—it was essential to explore both JSoup and Selenium to determine the best tool for each case.

### Time Spent

Understanding the difference between JSoup and Selenium ~ 1 hour
Setting up JSoup and Selenium ~ 45 minutes
Writing test scrapers ~ 3 hours
Fixing Regex patterns ~ 30 minutes

### Results

I started by searching ways I could scrape data from the website and found a website[^1] that gave me two options to pick from. I then went hrough the Selenium vs JSoup article[^2] that helped me understand the difference between JSoup and Selenium and which one was suited for our project.
JSoup is significantly faster because it easily retrieves and parses the HTML source code of a webpage. It is best suited for websites where the content is loaded synchronously.
Selenium, on the other hand, provides more flexibility because it mimics the behaviour of a real user while scraping websites. It can handle clicking buttons, navigating through pages, and even bypassing some basic CAPTCHAs. I realised that JSoup was more suited for our needs.
Before adding a March Madness Scraper directly to our project and manipulating our database, I made a separate project to setup and run JSoup and get a better grip at using JSoup. I started by setting up JSoup which required adding a dependency in the pom.xml file which was as follows:-
```
<dependency>
    <groupId>org.jsoup</groupId>
    <artifactId>jsoup</artifactId>
    <version>1.19.1</version>
</dependency>
```
This allowed me to make use of JSoup in my project.
The next step was finding a website that provided a list of all team names, regions, and matchups. I chose to go with Sports Illustrated because, at that time, NCAA had not yet released the 2025 bracket.

Once I identified the correct webpage, I had to go through the HTML source code of the website and select HTML elements that I needed for which I referred to the "Basic Web Scraping in Java" article[^3]. Afterwards, I wrote a JSoup scraper to extract the required information. Using CSS selectors and Regex patterns, I was able to efficiently retrieve team names, seeds, and regions. The extracted data was structured into a format that could be later inserted into our database. The Regex Pattern was required to extract the team names, region and seeds from the unordered list on Sports Illustrated. One example is as follows:- 
```
No. 1 Florida vs. No. 4 Maryland, 7:39 p.m., Thursday, March 27, San Francisco, CA
```
I had to remove all the unecessary elements such as No., vs. and the date and time using my pattern. After following multiple tutorials[^4] on Regex, I wrote the following pattern:-
```
String regex = "No[.,]?\\s*(\\d+)\\s*(.+?)\\s*vs\\.?\\s*No[.,]?\\s*(\\d+)\\s*([^,\\d]+)";
```
However, what I did not notice was that there were a few items in the list which had a missing period or a comma due to which they were being skipped so I had to fix the regex pattern to have a more broad logic. So I took those missing list items and put them in a regex tester[^5] and consistently perform changes to my regex pattern in order to include those teams as well. I, then fixed my regex pattern to this:-
```
String regex = "No[.,]?\\s*(\\d+)\\s*(.+?)\\s*vs\\.?\\s*No[.,]?\\s*(\\d+)\\s*([^,\\d]+)";
```
This included every team in the list which finally concluded my scraping logic.

Through this process, I was able to successfully scrape March Madness data and validate that JSoup was the right tool for the job.

### Sources

- Web Scraping in Java in 2025: The Complete Guide[^1]
- Selenium vs JSoup — scraping performance comparison[^2]
- Step #3: Select the HTML elements of interest[^3]
- Regular expressions[^4]
- Regular expressions 101[^5]


[^1]: https://www.zenrows.com/blog/web-scraping-java#can-you-web-scrape-in-java
[^2]: https://medium.com/@klopotowskip/scraping-using-jsoup-and-medium-performance-comparison-3a7544091893
[^3]: https://www.zenrows.com/blog/web-scraping-java#select-html-elements
[^4]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
[^5]: https://regex101.com/