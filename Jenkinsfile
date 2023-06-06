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
                    dir 'jenkins'
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
                    dir 'jenkins'
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
            steps {
                script {
                    sh 'docker cp backend projekt-backend-1:/usr/src/app' 
                }
            }
        }
    }
}