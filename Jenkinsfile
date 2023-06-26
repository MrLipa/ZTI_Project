pipeline {
    agent none

    triggers {
        cron('H H/12 * * *')
    }

    stages {
        stage('Clone repository') {
            agent any
            steps {
                git 'https://github.com/MrLipa/ZTI_Project.git'
            }
        }
        
        stage('Unit Tests Backend') {
            agent any
            steps {
                script {
                    withMaven(maven: 'maven3') {
                        sh "mvn test"
                    }
                }
                post {
                    always {
                        junit '**/target/surefire-reports/*.xml'
                    }
                }
            }
        }


        stage('Unit Tests Frontend') {
            agent any
            steps {
                script {
                    unstash 'frontend-node-modules'
                    sh 'cd frontend && npm run test'
                }
            }
        }
    }
}
