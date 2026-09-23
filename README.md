# 💻 DevTech Compass

> **The Ultimate Computer Science, DevOps, Cloud & AI Fundamentals Guide**

DevTech Compass is a comprehensive, interactive learning platform and developer reference built to master core technology essentials.

---

## 📚 Topics Covered

1. **🌐 Networking & CLI Tools**: Deep-dive into `nslookup`, `curl`, `telnet`, `net group /domain`, `ping`, `traceroute`, `dig`, `nmap`, `netstat`, and `ipconfig`. (Includes *What it is*, *Why use it*, *Syntax*, *Expected Outcome*, and *Real-world scenarios*).
2. **🐙 Git Command Cheat Sheet**: `git init`, `clone`, `status`, `add`, `commit`, `push`, `pull`, `branch`, `merge`, `rebase`, `stash`, `cherry-pick`, `reset`, `reflog`, `.gitignore`.
3. **🚀 CI/CD Pipelines**: Architecture principles, GitHub Actions YAML workflows, GitLab CI scripts, matrix builds, secrets management.
4. **🤖 AI & Machine Learning**: ML/DL foundations, Transformers, LLMs, RAG (Retrieval-Augmented Generation), Prompt Engineering, and Python code samples.
5. **🐍 Python Essentials**: Variables, Data Structures, OOP, Virtual Environments (`venv`), AsyncIO, REST API integrations.
6. **🗄️ Database Fundamentals**: SQL vs NoSQL, ACID properties, essential SQL statements (SELECT, JOINs, GROUP BY, Indexing), MongoDB, Redis, PostgreSQL.
7. **☁️ Google Cloud Platform (GCP)**: Compute Engine, Cloud Run, GKE, Cloud Storage, BigQuery, IAM roles, and `gcloud` CLI cheat sheet.
8. **🚢 Step-by-Step GitHub & Netlify Deployment Guide**: Built-in interactive guide to host this project on your GitHub and Netlify.

---

## ⚡ Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Build production bundle
npm run build
```

---

## 🚀 How to Connect to GitHub & Host on Netlify

### Step 1: Create a GitHub Repository & Push Code

```bash
# Initialize local git repository
git init

# Add all files to staging
git add .

# Create initial commit
git commit -m "Initial commit - DevTech Compass application"

# Rename default branch to main
git branch -M main

# Add your GitHub remote repository
git remote add origin https://github.com/pcbzmani/allinall.git

# Push to GitHub
git push -u origin main
```

### Step 2: Deploy to Netlify

1. Log into your **[Netlify Account](https://app.netlify.com)**.
2. Click **"Add new site"** -> **"Import an existing project"**.
3. Select **GitHub** as your Git provider and authorize Netlify.
4. Search for and select your `devtech-compass` repository.
5. Netlify will automatically detect `netlify.toml` settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click **"Deploy devtech-compass"**.
7. Your site is live! Netlify will automatically redeploy whenever you push changes to your GitHub `main` branch.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Modern CSS3 (Variables, Dark Glassmorphism, CSS Grid, Flexbox)
- **Icons**: Lucide React
- **Hosting Configuration**: Netlify SPA Redirects (`netlify.toml`)
