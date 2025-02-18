# Net Bets Specification Document

* This is a living document and will need to be updated regularly.

<!--Please fill out this document to reflect your team's project. This is a living document and will need to be updated regularly. You may also remove any section to its own document (e.g. a separate standards and conventions document), however you must keep the header and provide a link to that other document under the header.
* Also, be sure to check out the Wiki for information on how to maintain your team's requirements.-->

## Net Bets

<!--The name of your team.-->
![Logo](logo.png)

### Project Abstract

<!--* This is an example paragraph written in markdown. You can use *italics*, **bold**, and other formatting options. You can also <u>use inline html</u> to format your text. 
The example sections included in this document are not necessarily all the sections you will want, and it is possible that you won't use all the one's provided. -->
<!--It is your responsibility to create a document that adequately conveys all the information about your project specifications and requirements.-->


* This is Net Bets – a fun, interactive web application where users can bet on this year’s March Madness games using fake money. This project is designed to give fans an engaging experience. 

Features include placing bets on bracket predictions, leaderboards, a stats dashboard, and periodic updates. 

### Customer

<!--A brief description of the customer for this software, both in general (the population who might eventually use such a system) and specifically for this document (the customer(s) who informed this document). Every project will have a customer from the CS506 instructional staff. Requirements should not be derived simply from discussion among team members. Ideally your customer should not only talk to you about requirements but also be excited later in the semester to use the system.-->

An archetypal customer is a student that is an avid fan of college basketball and would like to engage in March Madness predictions with peers on an easy-to-use platform. 

### Specification

<!--A detailed specification of the system. UML, or other diagrams, such as finite automata, or other appropriate specification formalisms, are encouraged over natural language.-->

<!--Include sections, for example, illustrating the database architecture (with, for example, an ERD).-->

<!--Included below are some sample diagrams, including some example tech stack diagrams.-->

#### Technology Stack

Here are some sample technology stacks that you can use for inspiration:

```mermaid
flowchart RL
subgraph Front End
	A(Javascript: React)
end
	
subgraph Back End
	B(Java)
end
	
subgraph Database
	C[(MySQL)]
end

A <-->|"REST API"| B
B <-->|Django ORM| C
```


Frontend: 
* React.js

Backend: 
* Java

Data: 
* Relational Database
* Python for data scraping and analytics


#### Database

```mermaid
---
title: Entity Relationships
---
erDiagram
    User 
    Odds 

    User {
        int user_id PK
        string name
        string email
        string phone
    }

    Odds {
        int odds_id PK
    }

```

#### Flowchart

```mermaid
---
title: App Flowchart
---
graph TD;
    Start([Start]) --> Bracket/GameInfo[/Bracket/Game Info/];
    Bracket/GameInfo --> Process_Data[Selects Bet];
    Process_Data --> Validate_Data{Checkout};
    Validate_Data -->|Valid| Process_Valid_Data[Process Valid Data];
    Validate_Data -->|Invalid| Error_Message[/Error Message/];
    Process_Valid_Data --> End([End]);
    Error_Message --> End;
```

### Standards & Conventions

<!--This is a link to a seperate coding conventions document / style guide-->
[Style Guide & Conventions](STYLE.md)

