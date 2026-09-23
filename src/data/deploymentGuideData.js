export const deploymentGuideData = {
  id: "deployment-guide",
  title: "GitHub & Netlify Deployment Walkthrough",
  subtitle: "Follow this interactive step-by-step guide to connect your code to GitHub and host your site live on Netlify.",
  steps: [
    {
      step: 1,
      title: "Initialize Git Repository Locally",
      description: "Open your terminal in your project directory (`E:\\allinall`) and run git initialization.",
      command: "git init",
      check: false
    },
    {
      step: 2,
      title: "Stage & Commit Project Code",
      description: "Add all project files and create your baseline initial commit.",
      command: "git add .\ngit commit -m 'Initial commit - DevTech Compass web app'",
      check: false
    },
    {
      step: 3,
      title: "Create GitHub Repository & Add Remote",
      description: "Go to [GitHub New Repo](https://github.com/new), name it `devtech-compass`, and link your remote URL.",
      command: "git branch -M main\ngit remote add origin https://github.com/pcbzmani/allinall.git",
      check: false
    },
    {
      step: 4,
      title: "Push Code to GitHub",
      description: "Push your local commits to GitHub's remote `main` branch.",
      command: "git push -u origin main",
      check: false
    },
    {
      step: 5,
      title: "Log into Netlify & Import Project",
      description: "Log into [Netlify App](https://app.netlify.com), click **'Add new site'** -> **'Import an existing project'**.",
      command: "# Select 'GitHub' as Git provider and choose repository 'devtech-compass'",
      check: false
    },
    {
      step: 6,
      title: "Confirm Build Settings & Deploy",
      description: "Netlify auto-detects settings from `netlify.toml`:\n- Build Command: `npm run build` \n- Publish Directory: `dist`",
      command: "# Click 'Deploy site' -> Your site will be live on *.netlify.app within seconds!",
      check: false
    }
  ]
};
