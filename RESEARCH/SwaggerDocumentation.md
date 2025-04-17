# Research Report

## Using Swagger (OpenAPI) for Effective API Documentation in Java and Spring Boot

### Summary of Work

This report explores the implementation of Swagger (OpenAPI) in a Spring Boot backend application to provide interactive and compreehensive API documentation. Swagger significantly simplifies API documentation by automatically generating up-to-date endpoint descriptions, request formats, response models, and error handling details. I iintegrated Swagger into existing controllers (HelloController.java, MainController.java, UserController.java) and structured API endpoints logically into intuitive categories like Authentication, User Management, and Team Management.

---

### Motivation

Proper documentation is essential for backend services. Well-documented APIs improve collaboration between frontend and backend developers, along with simplifying testing and debugging. Swagger's interactive documentation ensures all stakeholders clearly understand the available API endpoints, required request parameters, and expected responses.

---

### Time Spent

- Researching Swagger and OpenAPI documentation: 45 minutes
- Integrating Swagger dependencies into Spring Boot: 30 minutes
- Annotating existing endpoints with Swagger annotations: 60 minutes
- Testing and customizing Swagger UI locally: 45 minutes

Total Time: 180 minutes

### Research Insights

Swagger provides annotations such as @Operation, @ApiResponses, @ApiResponse, and @Tag to comprehensively document APIs. It automatically generates an interactive documentation page (swagger-ui) accessible via the browser, enabling developers to test APIs directly from the documentation.

### Integration of Swagger in Spring Boot

The integration required adding the following dependency (springdoc-openapi-starter-webmvc-ui) to the pom.xml file:

```bash
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.1.0</version>
</dependency>
```

This provided a live, auto-updating Swagger UI page accessible at:

http://localhost:8080/swagger-ui.html

### Structuring API Documentation

Swagger documentation was structured using clear endpoint categories:

- Authentication: Endpoints for login and message management.
- User Management: Endpoints for user CRUD operations and user information.
- Team Management: Endpoints for managing March Madness teams and related scraping functionality.

### Annotating Endpoints (Example Snippet)

Here's an example annotation used in UserController.java for message handling:

```java

@Operation(summary = "Get all users", description = "Retrieves a list of all users in the database")
@ApiResponse(responseCode = "200", description = "List of all users")
@GetMapping(path="/all")
public @ResponseBody Iterable<User> getAllUsers() {
    // This returns a JSON or XML with the users
    return userRepository.findAll();
}

```

Example Swagger UI Output

Swagger UI clearly documents endpoint methods, parameters, request bodies, and potential responses, enhancing developer productivity and integration simplicity. Endpoints were grouped as follows:

Authentication:

- POST /api/auth/login
- GET /api/auth/hello
- POST /api/auth/hello

User Management:

- POST /api/user
- GET /api/user/{username}
- GET /api/user/{username}/name
- GET /api/user/{username}/username
- GET /api/user/{username}/password
- GET /api/user/{username}/amount

User and Team Management:

- POST /demo/signup
- POST /demo/scrape
- POST /demo/login
- POST /demo/add
- GET /demo/user
- GET /demo/teams
- GET /demo/all

### Sources and Resources

- Springdoc OpenAPI Official Documentation - https://springdoc.org/

- Swagger UI GitHub Repository - https://github.com/swagger-api/swagger-ui

- HTTP Status Codes - https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

- Spring Boot Reference Documentation - https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/
