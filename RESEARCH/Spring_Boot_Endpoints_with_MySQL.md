# Research Report

## Designing Spring Boot Endpoints to Update User Balances in a MySQL Database

### Summary of Work

This report covers the implementation and testing of two RESTful endpoints within an existing Spring Boot application. These endpoints, `/placeBet` and `/betResult`, were designed to handle betting logic by modifying a user’s balance in a MySQL database. I researched best practices in Spring Boot for controller design, input validation, JSON handling, and database updates using Spring Data JPA. The endpoints were then developed and tested using Postman to simulate realistic usage scenarios like wins, losses, and invalid requests.

---

### Motivation

The goal was to support a feature in our application where users can place bets and receive winnings. Each action needs to update the user’s balance accurately and securely. This required backend endpoints that validate inputs, modify data correctly, and return well-structured responses for the frontend to interpret.

---

### Time Spent

- Researching Spring Boot REST patterns, validation, JPA, and testing techniques:  
  180 minutes  
- Developing and testing the `/placeBet` and `/betResult` endpoints:  
  120 minutes  

---

### What I Researched

To prepare for the implementation, I researched the following:
- Using `@PostMapping`, `@PathVariable`, and `@RequestBody` in Spring Boot
- Validating input fields dynamically using `Map<String, Object>`
- Performing conditional logic based on request data (e.g., updating only if the user wins)
- Handling optional user lookup with `Optional<User>` to avoid null pointer exceptions
- Structuring JSON responses with `Map.of()` for frontend clarity
- Simulating and testing API endpoints with Postman

---

### Endpoint 1: `/placeBet` — Deduct Balance

This endpoint handles bet placements. It deducts the `betAmount` from the user's current balance and returns a summary.

```java
@PostMapping("/{userId}/placeBet")
public ResponseEntity<?> placeBet(@PathVariable Integer userId, @RequestBody Map<String, Double> requestBody) {
    Double betAmount = requestBody.get("betAmount");
    Double potentialWin = requestBody.get("potentialWin");

    if (betAmount == null || potentialWin == null || betAmount <= 0) {
        return ResponseEntity.badRequest().body("Invalid betAmount or potentialWin");
    }

    Optional<User> userOpt = userRepository.findById(userId);
    if (!userOpt.isPresent()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }

    User user = userOpt.get();
    if (user.getAmount() < betAmount) {
        return ResponseEntity.badRequest().body("Insufficient funds");
    }

    user.setAmount(user.getAmount() - betAmount);
    userRepository.save(user);

    Map<String, Object> response = Map.of(
        "userId", user.getId(),
        "newBalance", user.getAmount(),
        "betAmount", betAmount,
        "potentialWin", potentialWin
    );

    return ResponseEntity.ok(response);
}

```

### Endpoint 2: /betResult — Add Winnings (if won)

This endpoint processes the result of the bet. If the user won, it adds the winAmount to their balance.

```java
@PostMapping("/{userId}/betResult")
public ResponseEntity<?> processBetResult(@PathVariable Integer userId, @RequestBody Map<String, Object> requestBody) {
    Boolean won = (Boolean) requestBody.get("won");
    Double winAmount = won ? (Double) requestBody.get("winAmount") : 0.0;

    if (won == null || (won && (winAmount == null || winAmount <= 0))) {
        return ResponseEntity.badRequest().body("Invalid win status or win amount");
    }

    Optional<User> userOpt = userRepository.findById(userId);
    if (!userOpt.isPresent()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }

    User user = userOpt.get();
    if (won) {
        user.setAmount(user.getAmount() + winAmount);
        userRepository.save(user);
    }

    Map<String, Object> response = Map.of(
        "userId", user.getId(),
        "newBalance", user.getAmount(),
        "won", won,
        "winAmount", winAmount
    );

    return ResponseEntity.ok(response);
}

```

### Testing: Postman Scenarios

#### Test 1: Place Bet

Request:

```bash
POST /api/user/1/placeBet
Content-Type: application/json

{
  "betAmount": 100.0,
  "potentialWin": 250.0
}

```
Response:

```bash
{
  "userId": 1,
  "newBalance": 900.0,
  "betAmount": 100.0,
  "potentialWin": 250.0
}

```

#### Test 2: Win Result

Request:

```bash
POST /api/user/1/betResult
Content-Type: application/json

{
  "won": true,
  "winAmount": 250.0
}

```
Response:

```bash
{
  "userId": 1,
  "newBalance": 1150.0,
  "won": true,
  "winAmount": 250.0
}

```

#### Test 3: Loss Result

Request:

```bash
POST /api/user/1/betResult
Content-Type: application/json

{
  "won": false
}

```
Response:

```bash
{
  "userId": 1,
  "newBalance": 1100.0,
  "won": false,
  "winAmount": 0.0
}

```

#### Test 4: Error – Insufficient Funds

Request:

```bash
{
  "betAmount": 99999.0,
  "potentialWin": 100000.0
}

```
Response:

```bash
"Insufficient funds"

```

### Key Takeaways

- Applied proper backend engineering principles including validation, safety, and RESTful design

- Logic prevents users from placing invalid or unaffordable bets

- Implementation is scalable and can be extended with authentication, logging, or transaction history in the future

- Testing in Postman confirmed functionality in win/loss, valid/invalid, and edge-case scenarios

### Sources

- Spring Boot Documentation – https://docs.spring.io/spring-boot/docs/current/reference/html/web.html

- Spring Data JPA – https://spring.io/projects/spring-data-jpa

- Baeldung: REST Controllers in Spring Boot – https://www.baeldung.com/spring-rest-controller

- Baeldung: @RequestBody and @PathVariable – https://www.baeldung.com/spring-request-response-body

- Spring Guide: Accessing Data with JPA – https://spring.io/guides/gs/accessing-data-jpa/

- HTTP Status Codes Guide – https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

- Jackson JSON Processing – https://www.baeldung.com/jackson-object-mapper-tutorial

- Postman Documentation – https://learning.postman.com/docs/getting-started/introduction/