export const cicdData = {
  id: "cicd",
  title: "CI/CD Pipelines & Automation",
  subtitle: "Understand Continuous Integration & Continuous Delivery principles with practical production YAML workflows for GitHub Actions & GitLab CI.",
  items: [
    {
      id: "cicd-concepts",
      name: "Core CI/CD Concepts",
      category: "Architecture",
      summary: "Continuous Integration (CI) automatically builds and tests code on every push; Continuous Delivery/Deployment (CD) automatically releases artifact packages to staging/production.",
      why: "Eliminates manual deployment errors, catches bugs before production merge, enforces linting/testing standards, and enables fast reliable delivery.",
      outcome: "High automated deployment velocity with automated testing guardrails.",
      syntax: "Push Code -> Build -> Unit Test -> Integration Test -> Security Scan -> Deploy",
      examples: [
        {
          title: "CI/CD Pipeline Workflow Stages",
          command: `# 1. Lint & Format check
# 2. Automated Test Suite Execution (Jest, PyTest)
# 3. Docker Image Containerization & Push to ECR/Artifact Registry
# 4. Production Cloud Deployment (Netlify, AWS ECS, Cloud Run)`,
          explanation: "Standard multi-stage pipeline flow."
        }
      ],
      sampleOutput: `✔ Build Passed (12s)
✔ 48/48 Unit Tests Passed (4s)
✔ Security Vulnerability Audit Clean (2s)
🚀 Deployed to Production: https://devtech-compass.netlify.app`,
      useCases: ["Agile release automation", "Pull Request validation"]
    },
    {
      id: "github-actions-yaml",
      name: "GitHub Actions Pipeline (.github/workflows/deploy.yml)",
      category: "GitHub Actions",
      summary: "Native CI/CD automation workflow defined in YAML within your GitHub repository.",
      why: "Runs automatically on GitHub triggers (`push`, `pull_request`, `schedule`, `workflow_dispatch`) on cloud-hosted runners (Ubuntu, Windows, macOS).",
      outcome: "Executes steps, reports status check badge on Pull Requests, and deploys site.",
      syntax: "name: Pipeline Name \n on: [push]\n jobs: ...",
      examples: [
        {
          title: "Complete Node.js React CI/CD & Netlify Deploy Workflow",
          command: `name: Build & Deploy DevTech Compass

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Source Code
        uses: actions/checkout@v4

      - name: Setup Node.js Environment
        uses: actions/selection@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Run Build Check
        run: npm run build

      - name: Deploy to Netlify
        if: github.ref == 'refs/heads/main'
        uses: nwtgck/actions-netlify@v3.0
        with:
          publish-dir: './dist'
          production-deploy: true
        env:
          NETLIFY_AUTH_TOKEN: \${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: \${{ secrets.NETLIFY_SITE_ID }}`,
          explanation: "Checks out repository, installs dependencies, builds React bundle, and deploys to Netlify when pushed to main branch."
        }
      ],
      sampleOutput: `Job 'build-and-test' completed successfully in 48s.
Deployed commit 4f8a29b to production.`,
      useCases: ["Automating React/Node apps", "Pull Request automated testing"]
    },
    {
      id: "gitlab-ci-yaml",
      name: "GitLab CI/CD Pipeline (.gitlab-ci.yml)",
      category: "GitLab CI",
      summary: "Pipeline workflow file used by GitLab Runners for continuous integration.",
      why: "Standard pipeline specification format used in enterprise GitLab setups.",
      outcome: "Executes pipeline stages sequentially or in parallel graphs.",
      syntax: "stages: [build, test, deploy]",
      examples: [
        {
          title: "GitLab CI YAML Config",
          command: `stages:
  - build
  - test
  - deploy

cache:
  paths:
    - node_modules/

build_job:
  stage: build
  image: node:20-alpine
  script:
    - npm install
    - npm run build
  artifacts:
    paths:
      - dist/

test_job:
  stage: test
  image: node:20-alpine
  script:
    - npm test

deploy_staging:
  stage: deploy
  script:
    - echo "Deploying to cloud environment..."
  only:
    - main`,
          explanation: "Defines 3 stages (build, test, deploy) with artifact caching."
        }
      ],
      sampleOutput: `Running with gitlab-runner 16.5.0
Executing "docker" provider with image node:20-alpine...
Job succeeded`,
      useCases: ["GitLab Enterprise deployments", "Container build pipelines"]
    }
  ]
};
