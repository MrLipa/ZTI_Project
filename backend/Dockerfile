FROM maven:3.8.2-openjdk-17 AS builder
WORKDIR /usr/src/app
COPY . .
RUN mvn clean install

FROM amazoncorretto:17.0.0-alpine
COPY --from=builder /usr/src/app/target/backend-0.0.1-SNAPSHOT.jar /app.jar
EXPOSE 3000
ENTRYPOINT ["java","-jar","/app.jar"]