pipeline {
    agent any

    stages {
        // stage('Checkout') {
        //     steps {
        //         git 'https://github.com/MrLipa/ZTI_Project.git'
        //     }
        // }

        stage('Build Docker image') {
            steps {
                dir('client') {
                    sh 'docker build -t react-image .'
                }
            }
        }

        stage('Run Docker container') {
            steps {
                sh 'docker run -d -p 3000:3000 --name react-app --env CHOKIDAR_USEPOLLING=true --env WATCHPACK_POLLING=true react-image'
            }
        }
    }
}
