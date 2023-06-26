FROM amazoncorretto:17.0.0-alpine
ARG JAR_FILE=target/*.jar
COPY ./target/backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 3000
ENTRYPOINT ["java","-jar","/app.jar"]