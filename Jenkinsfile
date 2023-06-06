pipeline {
    agent none

    stages {
        stage('Clone repository') {
            agent any
            steps {
                git 'https://github.com/MrLipa/ZTI_Project.git'
            }
        }
        
        stage('Backend: Build and Test') {
            agent {
                dockerfile {
                    filename 'backend.Dockerfile'
                    dir 'config'
                }
            }
            steps {
                script {
                    sh 'node --version'
                    sh 'ls'
                    sh 'cd backend && npm install'
                    sh 'cd backend && npm run test'
                }
            }
        }
        stage('Frontend: Build and Test') {
            agent {
                dockerfile {
                    filename 'frontend.Dockerfile'
                    dir 'config'
                }
            }
            steps {
                script {
                    sh 'node --version'
                    sh 'ls'
                    sh 'cd frontend && npm install'
                    sh 'cd frontend && npm run test'
                }
            }
        }
        stage('Deploy') {
            agent any
            steps {
                script {
                    sh 'docker cp backend/. projekt-backend-1:/usr/src/app'
                    sh 'docker exec projekt-backend-1 npm install'

                    sh 'docker cp frontend/. projekt-frontend-1:/usr/src/app'
                    sh 'docker exec projekt-frontend-1 npm install'
                }
            }
        }
    }
}