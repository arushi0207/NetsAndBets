FROM openjdk:23-jdk

WORKDIR /app

COPY .mvn/ .mvn
COPY mvnw pom.xml ./
COPY . .
RUN ./mvnw dependency:go-offline

COPY src ./src

RUN apt-get update && apt-get install -y openssh-client



CMD ["./mvnw", "spring-boot:run"]