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
        
        stage('Install Dependencies') {
            // agent {
            //     docker { image 'node:latest' }
            // }
            agent any
            steps {
                script {
                    sh 'cd backend && npm install'
                    stash includes: 'backend/node_modules/**', name: 'backend-node-modules'
                    sh 'cd frontend && npm install'
                    stash includes: 'frontend/node_modules/**', name: 'frontend-node-modules'
                }
            }
        }
        
        stage('Unit Tests Backend') {
            // agent {
            //     dockerfile {
            //         filename 'backend.Dockerfile'
            //         dir 'config/other'
            //     }
            // }
            // agent {
            //     docker { image 'node:latest' }
            // }
            agent any
            steps {
                script {
                    unstash 'backend-node-modules'
                    sh 'cd backend && npm run test'
                }
            }
        }

        stage('Unit Tests Frontend') {
            // agent {
            //     dockerfile {
            //         filename 'frontend.Dockerfile'
            //         dir 'config/other'
            //     }
            // }
            // agent {
            //     docker { image 'node:latest' }
            // }
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
                    unstash 'backend-node-modules'
                    unstash 'frontend-node-modules'
                    sh 'cd backend && npm run start &'
                    sh 'cd frontend && npm run dev &'
                    sh 'cd integration_tests && pytest test.py'
                }
            }
        }

        
        stage('Deploy backend and frontend') {
            // agent {
            //     docker { image 'node:latest' }
            // }
            agent any
            steps {
                script {
                    sh 'docker cp backend/. projekt-backend-1:/usr/src/app'
                    sh 'docker exec projekt-backend-1 npm install'
                    
                    unstash 'frontend-node-modules'
                    sh 'cd frontend && npm run build'
                    sh 'docker cp frontend/dist/. projekt-frontend-1:/usr/share/nginx/html'
                    sh 'docker cp frontend/nginx.conf projekt-frontend-1:/etc/nginx/conf.d/default.conf'
                }
            }
        }
    }
}
