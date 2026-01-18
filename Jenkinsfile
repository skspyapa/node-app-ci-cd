pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'docker.io'
        DOCKER_REGISTRY_CREDENTIALS = credentials('docker-registry-credentials')
        DOCKER_IMAGE = "${DOCKER_REGISTRY}/skspyapa/ecommerce-backend"
        NODE_ENV = 'test'
    }

    triggers {
        githubPush()
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

        stage('Push Docker Image') {
            when {
                expression { env.GIT_BRANCH == 'origin/main' }
            }
            steps {
                echo 'Pushing Docker image to registry...'
                echo "Current branch: ${env.GIT_BRANCH}"
                script {
                    // Use Jenkins credentials binding and pipe the password via stdin to avoid CLI warning
                    withCredentials([usernamePassword(credentialsId: 'docker-registry-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        // Use separate bat steps so failures are clearer in the logs
                        bat 'echo Logging in to Docker registry...'
                        bat 'echo %DOCKER_PASSWORD% | docker login --username %DOCKER_USERNAME% --password-stdin %DOCKER_REGISTRY%'
                        bat 'docker push %DOCKER_IMAGE%:%IMAGE_TAG%'
                        bat 'docker push %DOCKER_IMAGE%:latest'
                        bat 'docker logout'
                    }
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
