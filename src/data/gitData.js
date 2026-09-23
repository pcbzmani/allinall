export const gitData = {
  id: "git",
  title: "Git Command Cheat Sheet",
  subtitle: "Master version control from basic commits to advanced rebasing, stashing, cherry-picking, and disaster recovery.",
  items: [
    {
      id: "git-init-clone",
      name: "git init & git clone",
      category: "Setup & Initialization",
      summary: "Start a brand-new repository locally or duplicate an existing remote repository.",
      why: "Required whenever initiating a new project or onboarding to a codebase hosted on GitHub/GitLab.",
      outcome: "Creates a hidden `.git` folder containing history metadata or clones code and branch commit history.",
      syntax: "git init [project-name]  |  git clone <repository-url>",
      examples: [
        {
          title: "Initialize Current Directory",
          command: "git init",
          explanation: "Turns current directory into a Git repository."
        },
        {
          title: "Clone GitHub Repository",
          command: "git clone https://github.com/user/devtech-compass.git",
          explanation: "Downloads source code and full git commit history locally."
        }
      ],
      sampleOutput: `Initialized empty Git repository in E:/allinall/.git/`,
      useCases: ["Project setup", "Repository duplication"]
    },
    {
      id: "git-status-add-commit",
      name: "git status, add & commit",
      category: "Core Workflow",
      summary: "Track modified files, stage snapshots into index, and save permanent commits into commit history.",
      why: "Forms the fundamental core of Git development workflow.",
      outcome: "Saves code state with a unique SHA-1 hash and commit author message.",
      syntax: "git status  |  git add <file>  |  git commit -m 'message'",
      examples: [
        {
          title: "Check Modified & Untracked Files",
          command: "git status",
          explanation: "Shows files in working directory vs staged area."
        },
        {
          title: "Stage All Changes",
          command: "git add .",
          explanation: "Stages all added, modified, and deleted files."
        },
        {
          title: "Commit Staged Snapshots",
          command: 'git commit -m "feat: add user authentication API"',
          explanation: "Records snapshot in local git database."
        }
      ],
      sampleOutput: `[main 4f8a29b] feat: add user authentication API
 3 files changed, 142 insertions(+), 8 deletions(-)`,
      useCases: ["Saving progress", "Preparing code for push"]
    },
    {
      id: "git-branch-checkout",
      name: "git branch, checkout & switch",
      category: "Branching & Switching",
      summary: "Create, list, rename, delete, and switch between isolated development branches.",
      why: "Allows developers to build features or hotfixes in isolation without polluting the main production branch.",
      outcome: "Moves the HEAD pointer to target branch or creates new branch references.",
      syntax: "git branch <name>  |  git checkout -b <name>  |  git switch -c <name>",
      examples: [
        {
          title: "Create and Switch to New Branch",
          command: "git checkout -b feature/dark-mode",
          explanation: "Creates feature/dark-mode and instantly switches HEAD to it."
        },
        {
          title: "List All Branches (Local & Remote)",
          command: "git branch -a",
          explanation: "Lists all local and remote-tracking branches."
        }
      ],
      sampleOutput: `  main
* feature/dark-mode
  remotes/origin/main`,
      useCases: ["Feature development", "Bugfix isolation", "Release management"]
    },
    {
      id: "git-merge-rebase",
      name: "git merge vs git rebase",
      category: "Integration",
      summary: "Combine changes from one branch into another using either a 3-way merge commit or linear commit history rebase.",
      why: "Merge preserves chronological commit history; Rebase creates a clean linear history by applying commits on top of base branch.",
      outcome: "Integrates branch code changes.",
      syntax: "git merge <branch>  |  git rebase <base-branch>",
      examples: [
        {
          title: "Merge Feature Branch into Main",
          command: "git checkout main\ngit merge feature/dark-mode",
          explanation: "Combines feature/dark-mode commits into main."
        },
        {
          title: "Rebase Current Feature onto Main",
          command: "git checkout feature/dark-mode\ngit rebase main",
          explanation: "Re-applies feature commits onto latest tip of main."
        }
      ],
      sampleOutput: `First, rewinding head to replay your work on top of it...
Applying: feat: add dark mode toggle`,
      useCases: ["Merging PRs", "Keeping feature branches up to date"]
    },
    {
      id: "git-remote-push-pull",
      name: "git remote, push & pull",
      category: "Remote Synchronization",
      summary: "Synchronize local commits with remote Git hosts (GitHub, GitLab, Bitbucket).",
      why: "Collaborate with team members and trigger automated CI/CD deployments upon code push.",
      outcome: "Uploads or fetches commits between local `.git` and remote host.",
      syntax: "git push origin <branch>  |  git pull origin <branch>",
      examples: [
        {
          title: "Set Remote and Push Branch for First Time",
          command: "git push -u origin main",
          explanation: "-u sets upstream tracking branch for simple future 'git push'."
        },
        {
          title: "Fetch and Merge Latest Remote Commits",
          command: "git pull origin main",
          explanation: "Fetches changes from GitHub main branch and merges them locally."
        }
      ],
      sampleOutput: `To https://github.com/user/devtech-compass.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.`,
      useCases: ["Publishing updates to GitHub", "Pulling team code changes"]
    },
    {
      id: "git-stash-cherrypick-reflog",
      name: "git stash, cherry-pick & reflog",
      category: "Advanced Utilities & Recovery",
      summary: "Temporarily shelve dirty changes (stash), copy a specific commit across branches (cherry-pick), or recover deleted commits (reflog).",
      why: "Invaluable for hotfix switching, picking single commits without merging full branches, and disaster recovery when branches are accidentally deleted.",
      outcome: "Shelves or restores repository states.",
      syntax: "git stash  |  git cherry-pick <commit-hash>  |  git reflog",
      examples: [
        {
          title: "Stash Uncommitted Work",
          command: "git stash save 'work in progress API design'\ngit stash pop",
          explanation: "Shelves uncommitted changes, allowing clean context switch, then restores them later."
        },
        {
          title: "Cherry-Pick Specific Commit",
          command: "git cherry-pick 7a2b91f",
          explanation: "Applies commit 7a2b91f onto current branch."
        },
        {
          title: "View Reference Log for Recovery",
          command: "git reflog",
          explanation: "Shows history of ALL HEAD position changes, allowing recovery of hard-reset commits."
        }
      ],
      sampleOutput: `4f8a29b HEAD@{0}: commit: feat: add authentication
1b3e9a2 HEAD@{1}: checkout: moving from main to feature
9c8d7e6 HEAD@{2}: reset: moving to HEAD~1`,
      useCases: ["Context switching", "Fixing accidental git reset --hard", "Selectively porting bugfixes"]
    }
  ]
};
