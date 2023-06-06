pipeline {
    agent any

    stages {
        stage('Clone repository') {
            steps {
                git 'https://github.com/MrLipa/ZTI_Project.git'
            }
        }
        stage('Backend: Build and Test') {
            steps {
                script {
                    docker.build("my-app:latest", "./backend")
                    sh 'docker run -v $PWD/backend:/app -w /app my-app:latest npm run test'
                }
            }
        }
    }
}