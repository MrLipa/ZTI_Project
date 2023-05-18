pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'URL_DO_TWOJEGO_REPOZYTORIUM'
            }
        }

        stage('Build Docker images') {
            steps {
                sh 'docker-compose build'
            }
        }

        stage('Deploy Docker containers') {
            steps {
                sh 'docker-compose up -d'
            }
        }
    }
}