pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'docker.io'
        DOCKER_REGISTRY_CREDENTIALS = credentials('docker-registry-credentials')
        DOCKER_IMAGE = "${DOCKER_REGISTRY}/skspyapa/ecommerce-backend"
        NODE_ENV = 'test'
    }

    parameters {
        string(name: 'IMAGE_TAG', defaultValue: 'latest', description: 'Docker image tag')
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from repository...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                bat '''
                    node --version
                    npm --version
                    npm ci
                '''
            }
        }

        stage('Lint') {
            steps {
                echo 'Running ESLint...'
                bat '''
                    npm run lint
                '''
            }
        }

        stage('Unit Tests') {
            steps {
                echo 'Running unit tests...'
                bat '''
                    npm test -- --coverage --passWithNoTests
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                script {
                    bat '''
                        docker build -t %DOCKER_IMAGE%:%IMAGE_TAG% .
                        docker build -t %DOCKER_IMAGE%:latest .
                    '''
                }
            }
        }

        stage('Push Docker Image') {
            when {
                branch 'main'
            }
            steps {
                echo 'Pushing Docker image to registry...'
                script {
                    bat '''
                        @echo %DOCKER_REGISTRY_CREDENTIALS_PSW% | docker login -u %DOCKER_REGISTRY_CREDENTIALS_USR% --password-stdin %DOCKER_REGISTRY%
                        docker push %DOCKER_IMAGE%:%IMAGE_TAG%
                        docker push %DOCKER_IMAGE%:latest
                        docker logout
                    '''
                }
            }
        }

        stage('Security Scan') {
            steps {
                echo 'Running security scan on dependencies...'
                bat '''
                    npm audit --audit-level=moderate
                '''
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            cleanWs()
        }

        success {
            echo 'Pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed!'
        }
    }
}
