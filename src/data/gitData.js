export const gitData = {
  id: "git",
  title: "Git Version Control — Complete Command Reference",
  subtitle: "Master version control from basic commits to advanced rebasing, stashing, cherry-picking, interactive rebase, bisect debugging, and disaster recovery with reflog.",
  usefulLinks: [
    { label: "Official Git Documentation", url: "https://git-scm.com/doc" },
    { label: "Pro Git Book (Free)", url: "https://git-scm.com/book/en/v2" },
    { label: "GitHub Flow Guide", url: "https://docs.github.com/en/get-started/quickstart/github-flow" },
    { label: "Conventional Commits Spec", url: "https://www.conventionalcommits.org/" },
    { label: "Git Cheat Sheet (GitHub)", url: "https://education.github.com/git-cheat-sheet-education.pdf" },
    { label: "Learn Git Branching (Interactive)", url: "https://learngitbranching.js.org/" },
    { label: "Atlassian Git Tutorials", url: "https://www.atlassian.com/git/tutorials" },
    { label: ".gitignore Templates", url: "https://github.com/github/gitignore" }
  ],
  items: [
    {
      id: "git-init-clone",
      name: "git init & git clone",
      category: "Setup & Initialization",
      summary: "Start a brand-new repository locally or duplicate an existing remote repository with its full commit history, branches, and tags.",
      why: "Required when initiating a new project or onboarding to a codebase hosted on GitHub/GitLab/Bitbucket. git init creates the .git metadata directory; git clone downloads everything.",
      outcome: "Creates a hidden .git folder containing configuration, object database, refs, and HEAD pointer.",
      syntax: "git init [project-name]  |  git clone <repository-url> [directory-name]",
      examples: [
        {
          title: "Initialize Current Directory as Git Repository",
          command: "git init",
          explanation: "Turns current directory into a Git repository. Creates .git/ with default branch 'main' or 'master'."
        },
        {
          title: "Clone GitHub Repository",
          command: "git clone https://github.com/pcbzmani/allinall.git",
          explanation: "Downloads source code, full commit history, branches, and tags. Sets 'origin' remote automatically."
        },
        {
          title: "Clone Only Latest Commit (Shallow Clone for CI/CD)",
          command: "git clone --depth 1 https://github.com/pcbzmani/allinall.git",
          explanation: "--depth 1 downloads only the latest commit, not full history. Much faster for CI/CD pipelines."
        },
        {
          title: "Clone Specific Branch",
          command: "git clone -b develop https://github.com/pcbzmani/allinall.git",
          explanation: "Clones and checks out the 'develop' branch instead of the default branch."
        }
      ],
      sampleOutput: `Cloning into 'allinall'...
remote: Enumerating objects: 127, done.
remote: Counting objects: 100% (127/127), done.
remote: Compressing objects: 100% (89/89), done.
Receiving objects: 100% (127/127), 142.50 KiB | 2.84 MiB/s, done.
Resolving deltas: 100% (42/42), done.`,
      useCases: ["New project setup", "Repository duplication", "CI/CD shallow clones for fast checkout"]
    },
    {
      id: "git-status-add-commit",
      name: "git status, add & commit",
      category: "Core Daily Workflow",
      summary: "Track modified files, stage snapshots into the index, and save permanent commits into the commit history graph with unique SHA-1 hashes.",
      why: "This is the fundamental core of every Git workflow. Every change you make goes through: modify → stage → commit. Understanding the three states (working directory, staging area, repository) is essential.",
      outcome: "Saves code state permanently with a unique SHA-1 hash, author identity, timestamp, and descriptive commit message.",
      syntax: "git status  |  git add <file>  |  git commit -m 'message'",
      examples: [
        {
          title: "Check Modified & Untracked Files",
          command: "git status",
          explanation: "Shows files in three categories: untracked (new), modified (changed), and staged (ready to commit)."
        },
        {
          title: "Stage All Changes (New + Modified + Deleted)",
          command: "git add .",
          explanation: "Stages all changes in current directory recursively. Use 'git add -p' for interactive per-hunk staging."
        },
        {
          title: "Stage Specific Files Only",
          command: "git add src/App.jsx src/components/Navbar.jsx",
          explanation: "Stage only specific files for a focused, atomic commit."
        },
        {
          title: "Commit with Conventional Commit Message",
          command: 'git commit -m "feat(auth): add JWT token refresh endpoint"',
          explanation: "Conventional Commits format: type(scope): description. Types: feat, fix, docs, style, refactor, test, chore."
        },
        {
          title: "Amend Last Commit (Change Message or Add Files)",
          command: 'git add forgotten-file.js\ngit commit --amend -m "feat(auth): add JWT token refresh with forgotten file"',
          explanation: "--amend modifies the last commit instead of creating a new one. Warning: Don't amend commits already pushed to shared branches."
        },
        {
          title: "Interactive Staging (Stage Individual Hunks)",
          command: "git add -p",
          explanation: "Walks through each change hunk-by-hunk, letting you stage parts of files. Essential for creating clean, focused commits."
        }
      ],
      sampleOutput: `On branch main
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   src/App.jsx
        new file:   src/components/Navbar.jsx

Changes not staged for commit:
        modified:   src/index.css

Untracked files:
        src/components/Footer.jsx`,
      useCases: ["Saving daily progress", "Creating clean atomic commits", "Preparing code for push", "Code review friendly commit history"]
    },
    {
      id: "git-branch-checkout",
      name: "git branch, checkout & switch",
      category: "Branching & Switching",
      summary: "Create, list, rename, delete, and switch between isolated development branches. Branches are lightweight pointers to commits, enabling parallel development streams.",
      why: "Allows developers to build features, hotfixes, or experiments in complete isolation without polluting the main production branch. Essential for team collaboration and code review workflows.",
      outcome: "Moves the HEAD pointer to target branch or creates new branch references without copying files.",
      syntax: "git branch <name>  |  git checkout -b <name>  |  git switch -c <name>",
      examples: [
        {
          title: "Create and Switch to New Feature Branch",
          command: "git checkout -b feature/dark-mode",
          explanation: "Creates feature/dark-mode branch and instantly switches HEAD to it. Equivalent to: git branch feature/dark-mode && git checkout feature/dark-mode."
        },
        {
          title: "List All Branches (Local & Remote)",
          command: "git branch -a",
          explanation: "Lists all local branches and remote-tracking branches (remotes/origin/*)."
        },
        {
          title: "Rename a Branch",
          command: "git branch -m old-name new-name",
          explanation: "Renames a branch locally. To rename the current branch: git branch -m new-name."
        },
        {
          title: "Delete a Merged Branch",
          command: "git branch -d feature/dark-mode",
          explanation: "-d safely deletes only if branch is merged. Use -D to force-delete unmerged branches."
        },
        {
          title: "Modern Switch Command (Git 2.23+)",
          command: "git switch -c feature/new-api",
          explanation: "git switch is the modern replacement for 'git checkout' for branch operations. -c creates and switches."
        }
      ],
      sampleOutput: `  main
* feature/dark-mode
  develop
  hotfix/login-fix
  remotes/origin/main
  remotes/origin/develop`,
      useCases: ["Feature branch development", "Hotfix isolation", "Release branch management", "Experimentation without risk"]
    },
    {
      id: "git-merge-rebase",
      name: "git merge vs git rebase",
      category: "Branch Integration",
      summary: "Two strategies for combining branch changes: merge creates a merge commit preserving branch topology; rebase rewrites history by replaying commits onto the base branch tip for a linear history.",
      why: "Merge preserves the complete chronological history including when branches diverged. Rebase creates a clean, linear commit history that reads like a story. Choose based on team conventions.",
      outcome: "Integrates branch code changes into a single unified branch.",
      syntax: "git merge <branch>  |  git rebase <base-branch>  |  git rebase -i HEAD~n",
      examples: [
        {
          title: "Merge Feature Branch into Main",
          command: "git checkout main\ngit merge feature/dark-mode",
          explanation: "Creates a merge commit combining feature/dark-mode into main. Git automatically resolves non-conflicting changes."
        },
        {
          title: "Rebase Feature onto Latest Main",
          command: "git checkout feature/dark-mode\ngit rebase main",
          explanation: "Re-applies all feature commits one-by-one onto the latest tip of main, creating a linear history."
        },
        {
          title: "Interactive Rebase — Squash, Reorder, Edit Commits",
          command: "git rebase -i HEAD~4",
          explanation: "Opens editor to reorder, squash (combine), edit, or drop the last 4 commits. Powerful for cleaning up messy commit history before PR submission."
        },
        {
          title: "Abort a Rebase After Conflicts",
          command: "git rebase --abort",
          explanation: "Cancels the rebase and restores your branch to its pre-rebase state. Use when conflicts are too complex."
        },
        {
          title: "Merge with No-Fast-Forward (Always Create Merge Commit)",
          command: "git merge --no-ff feature/dark-mode",
          explanation: "--no-ff forces a merge commit even if fast-forward is possible. This preserves the feature branch history in the commit graph."
        }
      ],
      sampleOutput: `Updating 9c8d7e6..4f8a29b
Fast-forward
 src/App.jsx                | 42 +++++++++++++++++++++
 src/components/DarkMode.jsx | 89 ++++++++++++++++++++++++++++++++++++++++
 2 files changed, 131 insertions(+)
 create mode 100644 src/components/DarkMode.jsx`,
      useCases: ["Merging approved PRs", "Keeping feature branches up-to-date with main", "Cleaning up commit history before code review", "Squashing WIP commits into meaningful atomic commits"]
    },
    {
      id: "git-remote-push-pull",
      name: "git remote, push, pull & fetch",
      category: "Remote Synchronization",
      summary: "Synchronize local commits with remote Git hosts (GitHub, GitLab, Bitbucket). Push uploads commits, pull fetches and merges, fetch downloads without merging.",
      why: "Collaborate with team members and trigger automated CI/CD deployments upon code push. Pull keeps your local branch synchronized with team changes.",
      outcome: "Uploads or downloads commits between local .git and remote repository host.",
      syntax: "git push origin <branch>  |  git pull origin <branch>  |  git fetch --all",
      examples: [
        {
          title: "Set Remote and Push Branch for First Time",
          command: "git push -u origin main",
          explanation: "-u sets upstream tracking branch so future pushes only need 'git push'."
        },
        {
          title: "Fetch and Merge Latest Remote Commits",
          command: "git pull origin main",
          explanation: "Equivalent to 'git fetch origin main' + 'git merge origin/main'. Fetches and integrates changes."
        },
        {
          title: "Fetch Without Merging (Inspect Before Merge)",
          command: "git fetch origin\ngit log origin/main --oneline -5\ngit merge origin/main",
          explanation: "Fetch first, inspect what changed on remote, then merge manually. Safer than blind git pull."
        },
        {
          title: "Force Push (After Rebase — Use With Caution!)",
          command: "git push --force-with-lease origin feature/dark-mode",
          explanation: "--force-with-lease is safer than --force: it fails if someone else pushed to the branch since your last fetch."
        },
        {
          title: "View and Manage Remote URLs",
          command: "git remote -v\ngit remote set-url origin https://github.com/pcbzmani/allinall.git",
          explanation: "View configured remotes or change the remote URL (e.g., switching from HTTPS to SSH)."
        }
      ],
      sampleOutput: `To https://github.com/pcbzmani/allinall.git
   9c8d7e6..4f8a29b  main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.`,
      useCases: ["Publishing code to GitHub", "Pulling team changes", "Setting up CI/CD triggers on push", "Managing multiple remotes (origin, upstream)"]
    },
    {
      id: "git-stash-cherrypick-reflog",
      name: "git stash, cherry-pick & reflog",
      category: "Advanced Utilities & Disaster Recovery",
      summary: "Temporarily shelve dirty changes (stash), copy a specific commit across branches (cherry-pick), recover deleted commits or branches (reflog), and binary-search for bug-introducing commits (bisect).",
      why: "Invaluable for emergency hotfixes (stash work, switch branches), selectively porting bugfixes across release branches (cherry-pick), and disaster recovery when commits or branches are accidentally deleted (reflog).",
      outcome: "Shelves, restores, or recovers repository states that would otherwise be lost.",
      syntax: "git stash  |  git cherry-pick <sha>  |  git reflog  |  git bisect start",
      examples: [
        {
          title: "Stash Uncommitted Work and Restore Later",
          command: "git stash save 'WIP: API design refactor'\ngit stash list\ngit stash pop",
          explanation: "Shelves all uncommitted changes to a stack. 'pop' restores the latest stash and removes it from the stack. 'apply' restores without removing."
        },
        {
          title: "Cherry-Pick a Specific Commit to Current Branch",
          command: "git cherry-pick 7a2b91f",
          explanation: "Copies commit 7a2b91f from any branch and applies it to your current branch. Creates a new commit with a new SHA."
        },
        {
          title: "Recover from Accidental git reset --hard (Reflog)",
          command: "git reflog\n# Find the commit SHA before the reset\ngit reset --hard HEAD@{2}",
          explanation: "reflog shows history of ALL HEAD position changes locally. Even after hard reset, commits are recoverable for ~30 days."
        },
        {
          title: "Binary Search for Bug-Introducing Commit (Bisect)",
          command: "git bisect start\ngit bisect bad          # Current commit has the bug\ngit bisect good v1.0.0  # This tag was known to work\n# Git checks out middle commit... test it... then:\ngit bisect good  # or: git bisect bad\n# Repeat until Git identifies the exact commit\ngit bisect reset  # Done",
          explanation: "Performs a binary search through commit history to find the exact commit that introduced a bug. Reduces search from O(n) to O(log n)."
        },
        {
          title: "View Compact Commit Log with Graph",
          command: 'git log --oneline --graph --all --decorate -20',
          explanation: "Shows last 20 commits with branch graph visualization, one line per commit."
        }
      ],
      sampleOutput: `4f8a29b (HEAD -> main) HEAD@{0}: commit: feat: add authentication
1b3e9a2 HEAD@{1}: checkout: moving from feature to main
9c8d7e6 HEAD@{2}: reset: moving to HEAD~1
a7d4c2e HEAD@{3}: commit: chore: cleanup temp files
b8e5f3d HEAD@{4}: commit: fix: resolve login redirect bug`,
      useCases: [
        "Emergency context switching: stash work → fix hotfix → pop stash → resume.",
        "Recovering from accidental 'git reset --hard' or deleted branches.",
        "Selectively porting security patches across release branches with cherry-pick.",
        "Finding the exact commit that broke a feature using git bisect.",
        "Cleaning up commit history with interactive rebase before PR review."
      ]
    },
    {
      id: "git-gitignore-config",
      name: ".gitignore & Git Configuration",
      category: "Configuration & Best Practices",
      summary: "Configure Git identity, editor preferences, aliases, and .gitignore rules to exclude build artifacts, dependencies, secrets, and OS-specific files from version control.",
      why: "Prevents accidental commits of node_modules (100MB+), .env secrets, OS metadata files (.DS_Store, Thumbs.db), and compiled build outputs. Proper Git config ensures consistent commit authorship.",
      outcome: "Clean repository with only source code tracked. No bloated dependencies, secrets, or temp files.",
      syntax: "git config --global user.name  |  .gitignore patterns",
      examples: [
        {
          title: "Essential Git Global Configuration",
          command: `git config --global user.name "Your Name"
git config --global user.email "your.email@company.com"
git config --global init.defaultBranch main
git config --global core.editor "code --wait"
git config --global pull.rebase false
git config --list`,
          explanation: "Sets identity, default branch name (main instead of master), VS Code as editor, and merge strategy for pulls."
        },
        {
          title: "Comprehensive .gitignore for Web Projects",
          command: `# Dependencies
node_modules/
.pnpm-store/
vendor/

# Build output
dist/
build/
.next/
out/

# Environment & Secrets (NEVER commit these!)
.env
.env.local
.env.production
*.key
*.pem

# OS files
.DS_Store
Thumbs.db
desktop.ini

# IDE / Editor
.vscode/settings.json
.idea/
*.swp
*.swo

# Logs
npm-debug.log*
yarn-error.log*
*.log

# Test coverage
coverage/
.nyc_output/`,
          explanation: "Standard .gitignore patterns for Node.js/React/Python web projects."
        },
        {
          title: "Useful Git Aliases for Productivity",
          command: `git config --global alias.st "status -sb"
git config --global alias.lg "log --oneline --graph --all --decorate -20"
git config --global alias.co "checkout"
git config --global alias.br "branch -a"
git config --global alias.unstage "reset HEAD --"
git config --global alias.last "log -1 HEAD --stat"`,
          explanation: "Shorthand aliases: 'git st' for short status, 'git lg' for pretty log graph, 'git co' for checkout."
        }
      ],
      sampleOutput: `user.name=Your Name
user.email=your.email@company.com
init.defaultbranch=main
core.editor=code --wait
alias.st=status -sb
alias.lg=log --oneline --graph --all --decorate -20`,
      useCases: [
        "Setting up Git on a new development machine.",
        "Preventing accidental commits of sensitive .env files and API keys.",
        "Reducing repository size by excluding node_modules and build artifacts.",
        "Standardizing commit authorship across team members."
      ]
    }
  ]
};
