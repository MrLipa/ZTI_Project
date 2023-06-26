pipeline {
    agent none

    tools {
        maven 'M3'
    }

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
        
        stage('Install Dependencies') {
            agent any
            steps {
                script {
                    sh 'cd backend && mvn clean install'
                    sh 'cd frontend && npm install'
                    stash includes: 'frontend/node_modules/**', name: 'frontend-node-modules'
                }
            }
        }
        
        stage('Unit Tests Backend') {
            agent any
            steps {
                script {
                    sh 'cd backend && mvn test'
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

        stage('Integration Tests') {
            agent any
            steps {
                script {
                    unstash 'frontend-node-modules'
                    sh 'cd backend && mvn spring-boot:run &'
                    sh 'cd frontend && npm run dev &'
                    sh 'cd tests && pytest test.py'
                }
            }
        }
        
        stage('Deploy backend and frontend') {
            agent any
            steps {
                script {
                    sh 'cd backend && mvn clean install'
                    sh 'docker cp backend/target/backend-0.0.1-SNAPSHOT.jar projekt-backend-1:app.jar'

                    unstash 'frontend-node-modules'
                    sh 'cd frontend && npm run build'
                    sh 'docker cp frontend/dist/. projekt-frontend-1:/usr/share/nginx/html'
                    sh 'docker cp frontend/nginx.conf projekt-frontend-1:/etc/nginx/conf.d/default.conf'
                }
            }
        }
    }
}

