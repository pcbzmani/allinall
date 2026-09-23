export const gcpData = {
  id: "gcp",
  title: "Google Cloud Platform (GCP) Core Essentials",
  subtitle: "Understand GCP Compute, Cloud Run serverless, GKE Kubernetes, Cloud Storage, BigQuery, IAM access controls, and `gcloud` CLI commands.",
  items: [
    {
      id: "gcp-services-overview",
      name: "GCP Core Architecture & Services",
      category: "Cloud Services",
      summary: "Overview of Google Cloud building blocks across Compute, Storage, Big Data, and Security.",
      why: "Cloud infrastructure powers modern enterprise applications with auto-scaling, global availability, and pay-as-you-go pricing.",
      outcome: "Architect scalable GCP cloud infrastructure.",
      syntax: "GCP Organization -> Projects -> IAM Service Accounts -> Resources (VPC, VMs, Buckets)",
      examples: [
        {
          title: "GCP Key Service Matrix",
          command: `# COMPUTE:
# - Compute Engine: Infrastructure as a Service (IaaS) Virtual Machines
# - Cloud Run: Fully managed serverless container platform (Knative)
# - Google Kubernetes Engine (GKE): Managed Kubernetes cluster engine

# STORAGE & DATABASES:
# - Cloud Storage (GCS): Object storage buckets for images/videos/backups
# - Cloud SQL: Managed PostgreSQL, MySQL, and SQL Server
# - BigQuery: Serverless, highly scalable enterprise data warehouse for SQL analytics

# IAM & SECURITY:
# - IAM: Identity and Access Management (Roles, Policies, Service Accounts)
# - VPC: Virtual Private Cloud networking, subnets, firewall rules`,
          explanation: "Primary cloud components."
        }
      ],
      sampleOutput: `Cloud Run Deployment: Automatic scale to zero when idle, scale to 1000 instances on traffic spikes.`,
      useCases: ["Microservices hosting", "Data warehousing with BigQuery", "Container orchestration"]
    },
    {
      id: "gcloud-cli",
      name: "gcloud CLI Command Cheat Sheet",
      category: "CLI Reference",
      summary: "Manage GCP resources directly from your local terminal using the `gcloud` SDK.",
      why: "Essential for automating cloud resource provisioning, inspecting cloud logs, and deploying applications.",
      outcome: "Terminal management of GCP project resources.",
      syntax: "gcloud <service> <group> <command> [flags]",
      examples: [
        {
          title: "Authenticate and Set Active Project",
          command: "gcloud auth login\ngcloud config set project my-gcp-project-123",
          explanation: "Authenticates your Google account and targets active GCP project."
        },
        {
          title: "Deploy Container Image to Cloud Run",
          command: "gcloud run deploy devtech-app --image gcr.io/my-gcp-project-123/devtech-app:latest --platform managed --region us-central1 --allow-unauthenticated",
          explanation: "Deploys a container image directly to Cloud Run with public HTTPS access."
        },
        {
          title: "List Compute Engine VM Instances",
          command: "gcloud compute instances list",
          explanation: "Lists all running virtual machines, internal IPs, and external public IPs."
        }
      ],
      sampleOutput: `Service [devtech-app] revision [devtech-app-00001-vax] has been deployed and is serving 100% of traffic.
Service URL: https://devtech-app-xyza-uc.a.run.app`,
      useCases: ["Cloud resource provisioning", "Serverless deployment", "Log tailing"]
    }
  ]
};
