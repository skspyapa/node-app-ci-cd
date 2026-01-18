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
                bat 'node --version && npm --version && npm ci'
            }
        }

        stage('Lint') {
            steps {
                echo 'Running ESLint...'
                bat 'npm run lint || exit 0'
            }
        }

        stage('Unit Tests') {
            steps {
                echo 'Running unit tests...'
                bat 'npm test -- --coverage --passWithNoTests'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                script {
                    bat 'docker build -t %DOCKER_IMAGE%:%IMAGE_TAG% . && docker build -t %DOCKER_IMAGE%:latest .'
                }
            }
        }

        stage('Debug Branch') {
            steps {
                echo "GIT_BRANCH: ${env.GIT_BRANCH}"
                echo "BRANCH_NAME: ${env.BRANCH_NAME}"
                bat 'echo %GIT_BRANCH%'
                bat 'git branch -a'
                bat 'git rev-parse --abbrev-ref HEAD'
            }
        }

        stage('Push Docker Image') {
            when {
                expression { 
                    env.GIT_BRANCH?.contains('main') || 
                    env.BRANCH_NAME == 'main' || 
                    env.GIT_BRANCH == 'main'
                }
            }
            steps {
                echo 'Pushing Docker image to registry...'
                echo "Current branch: ${env.GIT_BRANCH}"
                script {
                    bat 'docker login -u %DOCKER_REGISTRY_CREDENTIALS_USR% -p %DOCKER_REGISTRY_CREDENTIALS_PSW% %DOCKER_REGISTRY% && docker push %DOCKER_IMAGE%:%IMAGE_TAG% && docker push %DOCKER_IMAGE%:latest && docker logout'
                }
            }
        }

        stage('Security Scan') {
            steps {
                echo 'Running security scan on dependencies...'
                bat 'npm audit --audit-level=moderate || exit 0'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up workspace...'
            cleanWs()
        }

        success {
            echo '✓ Pipeline completed successfully!'
        }

        failure {
            echo '✗ Pipeline failed!'
        }
    }
}
