FROM jenkins/jenkins:lts

COPY vnc_config.sh /var/jenkins_home/vnc_config.sh
COPY requirements.txt /var/jenkins_home/requirements.txt

USER root

RUN chmod +x /var/jenkins_home/vnc_config.sh && /var/jenkins_home/vnc_config.sh

USER jenkins

# USER root
# RUN chmod +x /var/jenkins_home/vnc_config.sh
# USER jenkins

# FROM jenkinsci/blueocean
# COPY plugins.txt /usr/share/jenkins/ref/plugins.txt
# COPY script.groovy /usr/share/jenkins/ref/init.groovy.d/setup.groovy
# RUN jenkins-plugin-cli -f /usr/share/jenkins/ref/plugins.txt
