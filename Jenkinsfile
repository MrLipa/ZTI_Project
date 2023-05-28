pipeline {
    agent any

    stages {
        stage('Clone repository') {
            steps {
                git 'https://github.com/MrLipa/ZTI_Project.git'
            }
        }

        stage('Backend: Run Tests') {
            steps {
                script {
                    sh 'docker cp backend projekt-backend-1:/backend' 
                    sh 'docker exec projekt-backend-1 sh -c \'mv /backend /app/test && cd /app/test && npm install && npm run test\''
                }
            }
        }

        // stage('Frontend: Run Tests') {
        //     steps {
        //         script {
        //             sh 'docker cp ./frontend/. projekt-frontend-1:/app/test'
        //             sh 'docker exec projekt-frontend-1 npm run test'
        //         }
        //     }
        // }

        // stage('Deploy') {
        //     steps {
        //         script {
        //             sh 'docker cp ./backend/. projekt-backend-1:/app'
        //             sh 'docker exec projekt-backend-1 npm run test'

        //             sh 'docker cp ./frontend/. projekt-frontend-1:/app'
        //             sh 'docker exec projekt-frontend-1 npm run test'
        //         }
        //     }
        // }
    }
}