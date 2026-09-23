export const cicdData = {
  id: "cicd",
  title: "CI/CD Pipelines & DevOps Automation — Complete Guide",
  subtitle: "Master Continuous Integration & Continuous Delivery principles, production pipeline architectures, GitHub Actions workflows, GitLab CI configs, Docker containerization, and deployment strategies.",
  usefulLinks: [
    { label: "GitHub Actions Documentation", url: "https://docs.github.com/en/actions" },
    { label: "GitHub Actions Marketplace", url: "https://github.com/marketplace?type=actions" },
    { label: "GitLab CI/CD Documentation", url: "https://docs.gitlab.com/ee/ci/" },
    { label: "Docker Documentation", url: "https://docs.docker.com/" },
    { label: "Netlify CI/CD Build Docs", url: "https://docs.netlify.com/configure-builds/overview/" },
    { label: "Jenkins Pipeline Docs", url: "https://www.jenkins.io/doc/book/pipeline/" },
    { label: "Semantic Versioning (SemVer)", url: "https://semver.org/" },
    { label: "12-Factor App Methodology", url: "https://12factor.net/" },
    { label: "OWASP DevSecOps Guideline", url: "https://owasp.org/www-project-devsecops-guideline/" }
  ],
  items: [
    {
      id: "cicd-core-concepts",
      name: "CI/CD Core Concepts & Pipeline Architecture",
      category: "Foundations",
      summary: "Continuous Integration (CI): Automatically build, lint, and test code on every push/PR. Continuous Delivery (CD): Automatically package and deploy artifacts to staging/production after CI passes. Continuous Deployment: Deploy to production automatically without manual approval.",
      why: "CI/CD eliminates manual deployment errors, catches bugs before production merge, enforces coding standards, reduces mean-time-to-recovery (MTTR), and enables fast delivery cycles (multiple deploys per day).",
      outcome: "Automated, repeatable, auditable software delivery pipelines that enforce quality gates at every stage.",
      syntax: "Code Push → Build → Lint → Unit Test → Integration Test → Security Scan → Package → Deploy → Smoke Test → Monitor",
      examples: [
        {
          title: "CI/CD Pipeline Stages Explained",
          command: `# STAGE 1: SOURCE — Developer pushes code to Git branch
# Trigger: git push, pull_request, merge to main

# STAGE 2: BUILD — Compile source code and resolve dependencies
# Actions: npm install, pip install, mvn package, docker build
# Artifacts: Compiled binary, Docker image, JAR/WAR file

# STAGE 3: TEST — Automated quality assurance
# Unit Tests: Jest, PyTest, JUnit (test individual functions)
# Integration Tests: Test API endpoints with real DB connections
# E2E Tests: Cypress, Playwright (simulate real browser user flows)
# Code Coverage: Minimum 80% threshold enforcement

# STAGE 4: SECURITY — Vulnerability scanning
# SAST: Static Application Security Testing (SonarQube, CodeQL)
# DAST: Dynamic Application Security Testing (OWASP ZAP)
# Dependency Audit: npm audit, Snyk, Trivy (container scanning)

# STAGE 5: PACKAGE — Create deployable artifact
# Docker Image → Push to Container Registry (ECR, GCR, Docker Hub)
# npm pack → Publish to private npm registry
# Helm Chart → Package Kubernetes manifests

# STAGE 6: DEPLOY — Release to target environment
# Staging: Auto-deploy for QA team testing
# Production: Manual approval gate or auto-deploy (canary/blue-green)

# STAGE 7: VERIFY — Post-deployment health checks
# Smoke Tests: Hit /health endpoint, verify HTTP 200
# Canary Analysis: Compare error rates between old/new versions
# Rollback: Automatic rollback if error rate exceeds threshold`,
          explanation: "Complete 7-stage CI/CD pipeline architecture from code push to production verification."
        },
        {
          title: "Deployment Strategies Comparison",
          command: `# 1. ROLLING UPDATE (Default in Kubernetes)
#    - Gradually replace old pods with new pods one at a time.
#    - Pros: Zero downtime, resource efficient.
#    - Cons: Mixed versions running during rollout.

# 2. BLUE-GREEN DEPLOYMENT
#    - Run two identical environments (Blue = current, Green = new).
#    - Switch traffic from Blue → Green via load balancer.
#    - Pros: Instant rollback (switch back to Blue).
#    - Cons: Requires 2x infrastructure during deployment.

# 3. CANARY DEPLOYMENT
#    - Route 5% of traffic to new version, 95% to old.
#    - Monitor error rates, latency, and metrics.
#    - Gradually increase: 5% → 25% → 50% → 100%.
#    - Pros: Minimal blast radius for bugs.
#    - Cons: Complex routing rules, requires monitoring.

# 4. FEATURE FLAGS (LaunchDarkly, Unleash)
#    - Deploy code changes but hide behind feature toggles.
#    - Enable features per user, percentage, or region.
#    - Pros: Decouple deployment from feature release.
#    - Cons: Technical debt if flags aren't cleaned up.`,
          explanation: "The four primary deployment strategies and when to use each."
        }
      ],
      sampleOutput: `Pipeline Results:
✔ Build Passed                    (8s)
✔ Lint (ESLint, Prettier)         (3s)
✔ 127/127 Unit Tests Passed       (12s)
✔ 24/24 Integration Tests Passed  (18s)
✔ Security Scan: 0 vulnerabilities (6s)
✔ Docker Image Built & Pushed     (22s)
🚀 Deployed to Staging: https://staging.devtech-compass.app
⏳ Awaiting manual approval for production...`,
      useCases: [
        "Enforcing pull request quality gates (tests must pass before merge).",
        "Automating Docker builds and Kubernetes deployments.",
        "Implementing GitOps workflows with ArgoCD or Flux.",
        "Running security vulnerability scans on every commit."
      ]
    },
    {
      id: "github-actions-node-react",
      name: "GitHub Actions — Node.js / React CI/CD Pipeline",
      category: "GitHub Actions YAML",
      summary: "Complete production-ready GitHub Actions workflow for React/Node.js applications with build, test, lint, and Netlify/Vercel deployment.",
      why: "GitHub Actions runs directly in your repository with free 2,000 minutes/month for public repos. Integrates with GitHub's PR checks, environments, and secrets.",
      outcome: "Green check status badges on PRs, automated deployment on merge to main, and artifact storage.",
      syntax: ".github/workflows/ci-cd.yml",
      examples: [
        {
          title: "Complete React CI/CD + Netlify Deploy Workflow",
          command: `# .github/workflows/ci-cd.yml
name: "CI/CD Pipeline — Build, Test & Deploy"

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '20'

jobs:
  # ==========================================
  # JOB 1: Build and Test
  # ==========================================
  build-and-test:
    name: "Build & Test"
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: \${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install Dependencies
        run: npm ci
      
      - name: Run Linter (ESLint)
        run: npm run lint --if-present
      
      - name: Run Unit Tests with Coverage
        run: npm test -- --coverage --watchAll=false
      
      - name: Build Production Bundle
        run: npm run build
      
      - name: Upload Build Artifacts
        uses: actions/upload-artifact@v4
        with:
          name: dist-build
          path: dist/
          retention-days: 7

  # ==========================================
  # JOB 2: Deploy to Netlify (only on main)
  # ==========================================
  deploy-production:
    name: "Deploy to Netlify"
    needs: build-and-test
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    runs-on: ubuntu-latest
    environment:
      name: production
      url: \${{ steps.deploy.outputs.deploy-url }}
    
    steps:
      - name: Download Build Artifacts
        uses: actions/download-artifact@v4
        with:
          name: dist-build
          path: dist/
      
      - name: Deploy to Netlify
        id: deploy
        uses: nwtgck/actions-netlify@v3.0
        with:
          publish-dir: './dist'
          production-deploy: true
          github-token: \${{ secrets.GITHUB_TOKEN }}
          deploy-message: "Deploy from GitHub Actions (commit \${{ github.sha }})"
        env:
          NETLIFY_AUTH_TOKEN: \${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: \${{ secrets.NETLIFY_SITE_ID }}`,
          explanation: "Two-job pipeline: Job 1 builds, lints, tests, and uploads artifacts. Job 2 downloads artifacts and deploys to Netlify only when pushing to main branch."
        }
      ],
      sampleOutput: `✓ Build & Test (42s)
  ✓ Checkout Repository
  ✓ Setup Node.js 20.x
  ✓ Install Dependencies (npm ci)
  ✓ Run Linter (ESLint) — 0 warnings, 0 errors
  ✓ Run Unit Tests — 127 passed, 0 failed (Coverage: 87.4%)
  ✓ Build Production Bundle (dist/)
  ✓ Upload Build Artifacts

✓ Deploy to Netlify (18s)
  ✓ Download Build Artifacts
  ✓ Deploy to Netlify — https://devtech-compass.netlify.app
  Unique deploy URL: https://649abc12--devtech-compass.netlify.app`,
      useCases: [
        "Automating React/Next.js/Vite application deployments.",
        "Running ESLint, Prettier, and test suites on every pull request.",
        "Deploying to Netlify, Vercel, AWS S3, or Firebase Hosting."
      ]
    },
    {
      id: "github-actions-docker-gcp",
      name: "GitHub Actions — Docker Build + GCP Cloud Run Deploy",
      category: "GitHub Actions YAML",
      summary: "Production workflow that builds a Docker container image, pushes it to Google Artifact Registry, and deploys to Cloud Run serverless platform.",
      why: "Standard enterprise pattern for deploying containerized backend APIs and microservices to GCP without managing infrastructure.",
      outcome: "A containerized application running on Cloud Run with a public HTTPS endpoint.",
      syntax: ".github/workflows/deploy-cloud-run.yml",
      examples: [
        {
          title: "Docker Build → Artifact Registry → Cloud Run Deploy",
          command: `# .github/workflows/deploy-cloud-run.yml
name: "Deploy to GCP Cloud Run"

on:
  push:
    branches: [main]

env:
  PROJECT_ID: my-gcp-project
  REGION: us-central1
  SERVICE: devtech-api
  REGISTRY: us-central1-docker.pkg.dev

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    permissions:
      contents: read
      id-token: write  # Required for Workload Identity Federation

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Authenticate to GCP (Workload Identity)
        uses: google-github-actions/auth@v2
        with:
          workload_identity_provider: \${{ secrets.WIF_PROVIDER }}
          service_account: \${{ secrets.WIF_SERVICE_ACCOUNT }}

      - name: Configure Docker for Artifact Registry
        run: gcloud auth configure-docker \${{ env.REGISTRY }} --quiet

      - name: Build Docker Image
        run: |
          docker build -t \${{ env.REGISTRY }}/\${{ env.PROJECT_ID }}/docker-repo/\${{ env.SERVICE }}:\${{ github.sha }} .
          docker tag \${{ env.REGISTRY }}/\${{ env.PROJECT_ID }}/docker-repo/\${{ env.SERVICE }}:\${{ github.sha }} \\
                     \${{ env.REGISTRY }}/\${{ env.PROJECT_ID }}/docker-repo/\${{ env.SERVICE }}:latest

      - name: Push to Artifact Registry
        run: |
          docker push \${{ env.REGISTRY }}/\${{ env.PROJECT_ID }}/docker-repo/\${{ env.SERVICE }}:\${{ github.sha }}
          docker push \${{ env.REGISTRY }}/\${{ env.PROJECT_ID }}/docker-repo/\${{ env.SERVICE }}:latest

      - name: Deploy to Cloud Run
        uses: google-github-actions/deploy-cloudrun@v2
        with:
          service: \${{ env.SERVICE }}
          region: \${{ env.REGION }}
          image: \${{ env.REGISTRY }}/\${{ env.PROJECT_ID }}/docker-repo/\${{ env.SERVICE }}:\${{ github.sha }}
          flags: '--allow-unauthenticated --memory=512Mi --max-instances=10'`,
          explanation: "Uses Workload Identity Federation (keyless auth) instead of JSON key files for maximum security. Builds and pushes Docker image, then deploys to Cloud Run."
        }
      ],
      sampleOutput: `✓ Authenticate to GCP (Workload Identity Federation)
✓ Build Docker Image: sha-4f8a29b
✓ Push to Artifact Registry: us-central1-docker.pkg.dev/my-project/docker-repo/devtech-api
✓ Deploy to Cloud Run: https://devtech-api-xyza-uc.a.run.app
  Serving 100% of traffic on revision devtech-api-00012-zxy`,
      useCases: [
        "Deploying Python/Node.js/Go backend APIs to GCP Cloud Run.",
        "Implementing GitOps with immutable container image tags (commit SHA).",
        "Keyless authentication from GitHub to GCP via Workload Identity Federation."
      ]
    },
    {
      id: "github-actions-matrix-multi",
      name: "GitHub Actions — Matrix Strategy & Reusable Workflows",
      category: "GitHub Actions Advanced",
      summary: "Use matrix strategy to test across multiple OS, Node.js, and Python versions in parallel. Use reusable workflows to share common CI logic across repositories.",
      why: "Matrix builds ensure your application works across all target runtime environments. Reusable workflows eliminate YAML duplication across multiple repositories.",
      outcome: "Parallel test execution across multiple environments and DRY CI/CD configuration.",
      syntax: "strategy: { matrix: { node-version: [18, 20, 22] } }",
      examples: [
        {
          title: "Matrix Build — Test on Multiple Node.js Versions & OS",
          command: `# .github/workflows/matrix-test.yml
name: "Cross-Platform Matrix Test"

on: [push, pull_request]

jobs:
  test:
    runs-on: \${{ matrix.os }}
    
    strategy:
      fail-fast: false  # Don't cancel other jobs if one fails
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        node-version: [18, 20, 22]
        exclude:
          - os: macos-latest
            node-version: 18  # Skip Node 18 on macOS
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Use Node.js \${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
      
      - run: npm ci
      - run: npm test`,
          explanation: "Runs tests across 3 operating systems × 3 Node.js versions = 8 parallel jobs (1 excluded). fail-fast: false ensures all combinations run even if one fails."
        },
        {
          title: "Scheduled Cron Workflow for Nightly Builds",
          command: `# .github/workflows/nightly.yml
name: "Nightly Security Audit"

on:
  schedule:
    - cron: '0 3 * * *'  # Every day at 3:00 AM UTC
  workflow_dispatch:  # Allow manual trigger

jobs:
  security-audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm audit --audit-level=high
      - name: Run Trivy Container Scan
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          severity: 'HIGH,CRITICAL'`,
          explanation: "Runs daily at 3 AM UTC to check for newly published security vulnerabilities. workflow_dispatch allows manual trigger from GitHub UI."
        }
      ],
      sampleOutput: `Matrix Test Results:
✓ ubuntu-latest / Node 18    (32s)
✓ ubuntu-latest / Node 20    (28s)
✓ ubuntu-latest / Node 22    (30s)
✓ windows-latest / Node 18   (45s)
✓ windows-latest / Node 20   (42s)
✓ windows-latest / Node 22   (44s)
✗ macos-latest / Node 18     (skipped)
✓ macos-latest / Node 20     (38s)
✓ macos-latest / Node 22     (36s)

8/8 jobs passed`,
      useCases: [
        "Testing npm packages across multiple Node.js/Python versions before publishing.",
        "Validating cross-platform compatibility (Linux/macOS/Windows).",
        "Nightly security vulnerability scanning and dependency audits.",
        "Reusing common CI steps across 50+ microservice repositories."
      ]
    },
    {
      id: "gitlab-ci-comprehensive",
      name: "GitLab CI/CD Pipeline (.gitlab-ci.yml)",
      category: "GitLab CI YAML",
      summary: "Complete GitLab CI/CD pipeline with caching, artifact passing, multi-stage builds, Docker-in-Docker (DinD), environment deployments, and manual approval gates.",
      why: "Standard pipeline specification format used in enterprise GitLab installations. GitLab CI integrates Container Registry, environments, review apps, and security scanning.",
      outcome: "Multi-stage pipeline with build → test → security → staging → production deployment flow.",
      syntax: "stages: [build, test, security, deploy-staging, deploy-production]",
      examples: [
        {
          title: "Complete GitLab CI/CD YAML Configuration",
          command: `# .gitlab-ci.yml
stages:
  - build
  - test
  - security
  - deploy-staging
  - deploy-production

variables:
  NODE_ENV: production
  DOCKER_IMAGE: $CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA

# ==========================================
# Cache node_modules across all jobs
# ==========================================
cache:
  key:
    files:
      - package-lock.json
  paths:
    - node_modules/

# ==========================================
# STAGE 1: Build
# ==========================================
build:
  stage: build
  image: node:20-alpine
  script:
    - npm ci --production=false
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 day

# ==========================================
# STAGE 2: Tests (Parallel Jobs)
# ==========================================
unit-tests:
  stage: test
  image: node:20-alpine
  script:
    - npm ci
    - npm run test:unit -- --coverage
  coverage: '/All files[\\s]*\\|[\\s]*([\\d\\.]+)/'
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml

lint:
  stage: test
  image: node:20-alpine
  script:
    - npm ci
    - npm run lint
  allow_failure: true  # Lint warnings don't block pipeline

# ==========================================
# STAGE 3: Security Scan
# ==========================================
dependency-scan:
  stage: security
  image: node:20-alpine
  script:
    - npm audit --audit-level=high
  allow_failure: false  # Block deployment on high severity vulnerabilities

container-scan:
  stage: security
  image: docker:latest
  services:
    - docker:dind
  variables:
    DOCKER_TLS_CERTDIR: ""
  script:
    - docker build -t $DOCKER_IMAGE .
    - docker push $DOCKER_IMAGE
    # Trivy scan the built image
    - docker run --rm -v /var/run/docker.sock:/var/run/docker.sock
        aquasec/trivy image --severity HIGH,CRITICAL $DOCKER_IMAGE

# ==========================================
# STAGE 4: Deploy to Staging (Auto)
# ==========================================
deploy-staging:
  stage: deploy-staging
  image: google/cloud-sdk:alpine
  environment:
    name: staging
    url: https://staging.devtech-compass.app
  script:
    - echo $GCP_SA_KEY | base64 -d > /tmp/sa-key.json
    - gcloud auth activate-service-account --key-file=/tmp/sa-key.json
    - gcloud run deploy devtech-staging --image $DOCKER_IMAGE
        --platform managed --region us-central1
  only:
    - main

# ==========================================
# STAGE 5: Deploy to Production (Manual Gate)
# ==========================================
deploy-production:
  stage: deploy-production
  image: google/cloud-sdk:alpine
  environment:
    name: production
    url: https://devtech-compass.app
  script:
    - echo $GCP_SA_KEY | base64 -d > /tmp/sa-key.json
    - gcloud auth activate-service-account --key-file=/tmp/sa-key.json
    - gcloud run deploy devtech-prod --image $DOCKER_IMAGE
        --platform managed --region us-central1
  when: manual  # Requires manual click to deploy to production
  only:
    - main`,
          explanation: "5-stage enterprise GitLab CI: Build → Tests (parallel unit + lint) → Security (npm audit + container scan) → Staging (auto) → Production (manual approval gate)."
        }
      ],
      sampleOutput: `Pipeline #12847 — Branch: main
├── build              ✓ passed    (18s)
├── unit-tests         ✓ passed    (24s)   Coverage: 87.4%
├── lint               ✓ passed    (6s)
├── dependency-scan    ✓ passed    (4s)
├── container-scan     ✓ passed    (32s)
├── deploy-staging     ✓ passed    (22s)   → https://staging.devtech-compass.app
└── deploy-production  ⏸ manual    (waiting for approval)`,
      useCases: [
        "Enterprise GitLab-hosted CI/CD with RBAC-controlled deployments.",
        "Docker container builds with integrated security scanning.",
        "Environment-based deployment workflows with manual production gates.",
        "Multi-project pipeline orchestration in GitLab groups."
      ]
    },
    {
      id: "cicd-secrets-management",
      name: "Secrets & Environment Variables Management",
      category: "Security Best Practices",
      summary: "Never hardcode API keys, database passwords, or tokens in source code or YAML files. Use platform-specific encrypted secret stores and environment variable injection.",
      why: "Leaked credentials in public repositories are the #1 cause of cloud account compromises. Automated bots scan GitHub for exposed AWS keys within seconds of being pushed.",
      outcome: "Securely injected runtime secrets with rotation policies and audit logging.",
      syntax: "${{ secrets.SECRET_NAME }}  |  $CI_VARIABLE_NAME  |  process.env.SECRET_NAME",
      examples: [
        {
          title: "GitHub Actions Secrets Setup & Usage",
          command: `# 1. Add secrets via GitHub UI:
#    Repository → Settings → Secrets and variables → Actions → New repository secret
#    Name: NETLIFY_AUTH_TOKEN
#    Value: nfp_abc123...

# 2. Reference in workflow:
steps:
  - name: Deploy
    env:
      NETLIFY_AUTH_TOKEN: \${{ secrets.NETLIFY_AUTH_TOKEN }}
      NETLIFY_SITE_ID: \${{ secrets.NETLIFY_SITE_ID }}
      DATABASE_URL: \${{ secrets.DATABASE_URL }}
    run: netlify deploy --prod

# 3. Environment-scoped secrets (staging vs production):
#    Repository → Settings → Environments → production → Add secret
#    This secret is only available to jobs with: environment: production`,
          explanation: "GitHub encrypts secrets at rest (libsodium sealed box). They are never exposed in logs (masked with ***)."
        },
        {
          title: "GitLab CI/CD Variables Setup",
          command: `# GitLab: Settings → CI/CD → Variables
# Add variable:
#   Key: GCP_SA_KEY
#   Value: (base64-encoded service account JSON)
#   Type: Variable
#   Flags: ✓ Masked, ✓ Protected (only available on protected branches)

# Usage in .gitlab-ci.yml:
deploy:
  script:
    - echo $GCP_SA_KEY | base64 -d > /tmp/key.json
    - gcloud auth activate-service-account --key-file=/tmp/key.json`,
          explanation: "GitLab supports masked (hidden in logs) and protected (only on main/tag branches) variables."
        },
        {
          title: "Docker & Kubernetes Secrets",
          command: `# Docker: Pass secrets as build args or env vars
docker run -e DATABASE_URL="postgres://user:pass@host:5432/db" my-app

# Kubernetes: Create secret and mount in pod
kubectl create secret generic db-credentials \\
  --from-literal=DB_USER=admin \\
  --from-literal=DB_PASS=s3cur3P@ss

# Reference in deployment YAML:
# env:
#   - name: DB_USER
#     valueFrom:
#       secretKeyRef:
#         name: db-credentials
#         key: DB_USER`,
          explanation: "Kubernetes secrets are base64-encoded and can be mounted as environment variables or files."
        }
      ],
      sampleOutput: `GitHub Actions Log:
Run netlify deploy --prod
Deploy path: ./dist
Deploying to production
✓ Deploy is live!
Website URL: https://devtech-compass.netlify.app

Note: NETLIFY_AUTH_TOKEN is masked as ***`,
      useCases: [
        "Storing API keys, database URLs, and cloud credentials securely.",
        "Implementing secret rotation policies with HashiCorp Vault.",
        "Scoping secrets per environment (dev/staging/production).",
        "Preventing accidental credential leaks with pre-commit hooks (git-secrets)."
      ]
    },
    {
      id: "cicd-docker-basics",
      name: "Docker Containerization Fundamentals",
      category: "Containers",
      summary: "Docker packages your application code, runtime, dependencies, and configuration into a portable container image that runs consistently across any environment (dev, staging, production).",
      why: "Eliminates 'works on my machine' problems. Containers ensure your app behaves identically whether running on a developer's laptop, CI/CD pipeline, or production Kubernetes cluster.",
      outcome: "A lightweight, immutable container image tagged with version/commit SHA that can be deployed anywhere Docker runs.",
      syntax: "docker build -t <image:tag> .  |  docker run -p <host>:<container> <image>",
      examples: [
        {
          title: "Production Dockerfile for Node.js React App",
          command: `# Dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --production=false
COPY . .
RUN npm run build

# Stage 2: Production (Nginx serves static files)
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`,
          explanation: "Multi-stage build: Stage 1 builds the React app, Stage 2 copies only the dist/ output into a tiny Nginx image. Final image is ~25 MB instead of ~1 GB."
        },
        {
          title: "Docker Compose for Local Development Stack",
          command: `# docker-compose.yml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgres://admin:password@db:5432/devdb
    volumes:
      - .:/app
      - /app/node_modules
    depends_on:
      - db
      - redis

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: password
      POSTGRES_DB: devdb
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  pgdata:`,
          explanation: "Spins up your full development stack (web app + PostgreSQL + Redis) with a single 'docker-compose up' command."
        },
        {
          title: "Essential Docker Commands",
          command: `# Build image
docker build -t my-app:v1.0 .

# Run container
docker run -d -p 8080:80 --name web my-app:v1.0

# View running containers
docker ps

# View container logs
docker logs -f web

# Execute command inside running container
docker exec -it web /bin/sh

# Stop and remove container
docker stop web && docker rm web

# List and clean up images
docker images
docker system prune -a  # Remove all unused images/containers`,
          explanation: "Core Docker commands for building, running, debugging, and cleaning up containers."
        }
      ],
      sampleOutput: `REPOSITORY   TAG      IMAGE ID       CREATED          SIZE
my-app       v1.0     abc123def456   2 minutes ago    24.8 MB
nginx        alpine   789xyz000111   3 weeks ago      22.1 MB
node         20       555aaa666bbb   1 week ago       1.09 GB`,
      useCases: [
        "Packaging applications for consistent cross-environment deployment.",
        "Local development stacks with Docker Compose (app + DB + cache).",
        "Building CI/CD pipeline artifacts (immutable container images).",
        "Microservices containerization for Kubernetes orchestration."
      ]
    }
  ]
};
