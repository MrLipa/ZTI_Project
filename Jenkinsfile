pipeline {
    agent any

    stages {
        stage('Clone repository') {
            steps {
                git 'https://github.com/MrLipa/ZTI_Project.git'
            }
        }

        stage('Update /app and Run Tests') {
            steps {
                script {
                    sh 'docker cp . backend:/app'
                    sh 'docker exec backend npm run test'
                }
            }
        }
    }
}