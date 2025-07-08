FROM openjdk:21

EXPOSE 8082

ENV APP_HOME /usr/src/app

COPY target/cv-service-0.0.1-SNAPSHOT.jar $APP_HOME/app.jar

WORKDIR $APP_HOME

ENTRYPOINT exec java -jar app.jar
