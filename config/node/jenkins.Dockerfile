FROM jenkins/jenkins:lts

COPY jenkins_config.sh /var/jenkins_home/jenkins_config.sh
COPY requirements.txt /var/jenkins_home/requirements.txt

ENV DISPLAY=:1




# USER root

# COPY vnc_config.sh /var/jenkins_home/vnc_config.sh
# RUN chmod +x /var/jenkins_home/vnc_config.sh && /bin/sh -c ". /var/jenkins_home/vnc_config.sh"

# USER jenkins
# USER root
# RUN chmod +x /var/jenkins_home/vnc_config.sh
# USER jenkins

# FROM jenkinsci/blueocean
# COPY plugins.txt /usr/share/jenkins/ref/plugins.txt
# COPY script.groovy /usr/share/jenkins/ref/init.groovy.d/setup.groovy
# RUN jenkins-plugin-cli -f /usr/share/jenkins/ref/plugins.txt
