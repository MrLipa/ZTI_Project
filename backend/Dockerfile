FROM maven:3.8-openjdk-11-slim AS build

WORKDIR /app

COPY pom.xml ./
COPY src ./src

RUN mvn clean package

FROM openjdk:11-jre-slim

COPY --from=build /app/target/*.jar app.jar

EXPOSE 3000

ENTRYPOINT ["java","-jar","/app.jar"]
