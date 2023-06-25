FROM jenkins/jenkins:lts

COPY jenkins_config.sh /var/jenkins_home/jenkins_config.sh
COPY requirements.txt /var/jenkins_home/requirements.txt

ENV DISPLAY=:1