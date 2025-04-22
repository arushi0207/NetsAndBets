package com.example.demo.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAPIConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Net Bets (Team 14) API")
                        .description("API for managing user accounts and betting operations")
                        .version("1.0")
                        .contact(new Contact()
                                .name("Team 14")
                                .url("https://git.doit.wisc.edu/cdis/cs/courses/cs506/sp2025/team/T_14/Project_14")));
    }
}