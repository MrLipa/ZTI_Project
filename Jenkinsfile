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
        stage('Deploy backend') {
            agent any
            steps {
                script {
                    sh 'docker cp backend/. projekt-backend-1:/usr/src/app'
                    sh 'docker exec projekt-backend-1 npm install'
                }
            }
        }
        stage('Deploy frontend') {
            agent {
                docker { image 'node:latest' }
            }
            steps {
                script {
                    sh 'cd frontend && npm install && npm run build'
                    sh 'docker cp frontend/dist/. projekt-frontend-1:/usr/share/nginx/html'
                    sh 'docker cp frontend/nginx.conf projekt-frontend-1:/etc/nginx/conf.d/default.conf'
                }
            }
        }
    }
}