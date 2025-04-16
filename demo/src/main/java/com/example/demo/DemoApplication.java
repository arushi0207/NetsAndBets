package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * The main entry point for the Spring Boot application.
 *
 * <p>This class is annotated with {@link SpringBootApplication}, which enables
 * auto-configuration, component scanning, and configuration.</p>
 *
 * <p>It contains the {@code main} method that starts the application using
 * {@link SpringApplication#run(Class, String...)}.</p>
 */
@SpringBootApplication
@EnableScheduling
public class DemoApplication {

	/**
	 * The entry point of the Spring Boot application.
	 *
	 * <p>This method starts the Spring application by invoking
	 * {@link SpringApplication#run(Class, String...)} with the {@code DemoApplication} class.
	 *
	 * @param args Command-line arguments passed to the application.
	 */
	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

}
