https://github.com/SonarSource/docker-sonarqube/tree/master

https://github.com/SonarSource/docker-sonarqube/blob/master/example-compose-files/sq-with-postgres/docker-compose.yml

https://docs.sonarsource.com/sonarqube-server/10.8/setup-and-upgrade/install-the-server/installing-sonarqube-from-docker/

https://hub.docker.com/_/sonarqube

docker-compose up

docker run \
    -v sonarqube_data:/opt/sonarqube/data \
    -v sonarqube_extensions:/opt/sonarqube/extensions \
    -v sonarqube_logs:/opt/sonarqube/logs \
    -e SONAR_JDBC_URL="jdbc:postgresql://db:5432/sonar" \
    -e SONAR_JDBC_USERNAME="sonar" \
    -e SONAR_JDBC_PASSWORD="sonar" \
    --name="sonarqube" -p 9000:9000 sonarqube:community


    Once your server is installed and running, you can access SonarQube Server UI in your web browser (the default system administrator credentials are admin/admin) and you're ready to begin analyzing source code.