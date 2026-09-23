export const gcpData = {
  id: "gcp",
  title: "Google Cloud Platform (GCP) — Complete Guide",
  subtitle: "Master GCP Compute, Serverless, Big Data (Dataproc, Composer), Storage, BigQuery, IAM, Networking, and the gcloud CLI with real-world architecture patterns.",
  usefulLinks: [
    { label: "GCP Console Dashboard", url: "https://console.cloud.google.com/" },
    { label: "GCP Documentation Home", url: "https://cloud.google.com/docs" },
    { label: "IAM Roles Reference", url: "https://cloud.google.com/iam/docs/understanding-roles" },
    { label: "gcloud CLI Reference", url: "https://cloud.google.com/sdk/gcloud/reference" },
    { label: "Cloud Run Docs", url: "https://cloud.google.com/run/docs" },
    { label: "Dataproc Docs", url: "https://cloud.google.com/dataproc/docs" },
    { label: "Cloud Composer Docs", url: "https://cloud.google.com/composer/docs" },
    { label: "BigQuery SQL Reference", url: "https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax" },
    { label: "GCP Pricing Calculator", url: "https://cloud.google.com/products/calculator" },
    { label: "GCP Architecture Center", url: "https://cloud.google.com/architecture" },
    { label: "GCP Free Tier", url: "https://cloud.google.com/free" }
  ],
  items: [
    {
      id: "gcp-compute-engine",
      name: "Compute Engine (Virtual Machines)",
      category: "IaaS Compute",
      summary: "Infrastructure-as-a-Service (IaaS) offering fully customizable Linux and Windows virtual machines with options for preemptible/spot instances, custom machine types, GPUs, and local SSD storage.",
      why: "When you need full OS-level control over servers — install custom software, run legacy applications, host game servers, or perform GPU-accelerated ML training that doesn't fit serverless models.",
      outcome: "A running VM instance with a public/internal IP address, configurable firewall rules, and SSH/RDP access for full administrative control.",
      syntax: "gcloud compute instances create <vm-name> --zone=<zone> --machine-type=<type> --image-family=<os>",
      examples: [
        {
          title: "Create an Ubuntu VM with 4 vCPUs",
          command: `gcloud compute instances create dev-server-01 \\
  --zone=us-central1-a \\
  --machine-type=e2-standard-4 \\
  --image-family=ubuntu-2204-lts \\
  --image-project=ubuntu-os-cloud \\
  --boot-disk-size=100GB \\
  --tags=http-server,https-server`,
          explanation: "Creates an e2-standard-4 VM (4 vCPUs, 16 GB RAM) running Ubuntu 22.04 LTS with a 100 GB boot disk and HTTP/HTTPS firewall tags."
        },
        {
          title: "Create a Preemptible (Spot) VM for Cost Savings",
          command: `gcloud compute instances create batch-worker-01 \\
  --zone=us-central1-b \\
  --machine-type=n2-standard-8 \\
  --provisioning-model=SPOT \\
  --instance-termination-action=STOP \\
  --maintenance-policy=TERMINATE`,
          explanation: "Spot VMs cost 60-91% less but can be reclaimed by Google with 30s notice. Perfect for batch processing, CI/CD runners, and fault-tolerant workloads."
        },
        {
          title: "SSH into a Running VM",
          command: "gcloud compute ssh dev-server-01 --zone=us-central1-a",
          explanation: "Opens an SSH session directly into the VM using OS Login or metadata SSH keys."
        },
        {
          title: "List All Running VM Instances",
          command: "gcloud compute instances list",
          explanation: "Displays all VMs across all zones with their status, machine type, and IP addresses."
        }
      ],
      sampleOutput: `NAME             ZONE            MACHINE_TYPE    PREEMPTIBLE  INTERNAL_IP  EXTERNAL_IP     STATUS
dev-server-01    us-central1-a   e2-standard-4                10.128.0.2   34.122.45.89    RUNNING
batch-worker-01  us-central1-b   n2-standard-8   true         10.128.0.5   35.200.12.11    RUNNING`,
      useCases: [
        "Hosting web application backend servers behind a load balancer.",
        "Running GPU-accelerated deep learning model training (attach NVIDIA T4/A100).",
        "Migrating on-premises legacy enterprise applications to the cloud.",
        "Self-hosted CI/CD build runners (Jenkins, GitLab Runner)."
      ]
    },
    {
      id: "gcp-cloud-run",
      name: "Cloud Run (Serverless Containers)",
      category: "Serverless Compute",
      summary: "Fully managed serverless platform that auto-scales Docker container instances from zero to thousands based on incoming HTTP request traffic. Built on open-source Knative.",
      why: "Deploy containerized REST APIs, web apps, or microservices without managing any server infrastructure. Pay only when your code is actively handling requests (scale to zero when idle).",
      outcome: "A production HTTPS endpoint URL with auto-TLS, automatic scaling, and IAM-controlled authentication.",
      syntax: "gcloud run deploy <service-name> --image <container-image> --platform managed --region <region>",
      examples: [
        {
          title: "Deploy a Docker Container to Cloud Run",
          command: `gcloud run deploy devtech-api \\
  --image gcr.io/my-project/devtech-api:latest \\
  --platform managed \\
  --region us-central1 \\
  --allow-unauthenticated \\
  --memory 512Mi \\
  --max-instances 10 \\
  --set-env-vars "NODE_ENV=production,DB_HOST=10.0.0.5"`,
          explanation: "Deploys container with public access, 512 MB RAM, max 10 concurrent instances, and environment variables."
        },
        {
          title: "Deploy from Source Code (Cloud Build Auto-Detect)",
          command: `gcloud run deploy my-app \\
  --source . \\
  --region us-central1`,
          explanation: "Cloud Run automatically detects your Dockerfile (or uses Buildpacks), builds the container image, pushes to Artifact Registry, and deploys — all in one command."
        },
        {
          title: "View Service Logs in Real-Time",
          command: "gcloud run services logs read devtech-api --region us-central1 --limit 50",
          explanation: "Streams recent application logs for debugging."
        }
      ],
      sampleOutput: `Deploying container to Cloud Run service [devtech-api] in project [my-project] region [us-central1]
✓ Deploying... Done.
  ✓ Creating Revision... Revision deployment finished. Checking container health.
  ✓ Routing traffic...
  ✓ Setting IAM Policy...
Done.
Service [devtech-api] revision [devtech-api-00003-zxy] has been deployed and is serving 100% of traffic.
Service URL: https://devtech-api-xyza-uc.a.run.app`,
      useCases: [
        "Deploying REST APIs and GraphQL microservices with zero infrastructure management.",
        "Running background jobs triggered by Pub/Sub messages or Cloud Scheduler.",
        "Hosting static site generators (Next.js, Nuxt) in containers.",
        "Building webhook processors for GitHub, Slack, or Stripe."
      ]
    },
    {
      id: "gcp-gke",
      name: "Google Kubernetes Engine (GKE)",
      category: "Container Orchestration",
      summary: "Managed Kubernetes cluster service for deploying, scaling, and managing containerized workloads with auto-upgrades, auto-repair, and integrated monitoring.",
      why: "When your application has multiple interconnected microservices that need service discovery, load balancing, rolling updates, health checks, and horizontal pod auto-scaling.",
      outcome: "A production-grade Kubernetes cluster with kubectl access, Ingress controllers, and Workload Identity for secure service-to-service communication.",
      syntax: "gcloud container clusters create <name> --zone <zone> --num-nodes <n>",
      examples: [
        {
          title: "Create a 3-Node GKE Cluster",
          command: `gcloud container clusters create production-cluster \\
  --zone us-central1-a \\
  --num-nodes 3 \\
  --machine-type e2-standard-4 \\
  --enable-autoscaling --min-nodes 2 --max-nodes 10 \\
  --enable-autorepair \\
  --enable-autoupgrade`,
          explanation: "Creates a Kubernetes cluster with 3 initial nodes, auto-scaling between 2-10 nodes based on CPU/memory load."
        },
        {
          title: "Get Cluster Credentials for kubectl",
          command: "gcloud container clusters get-credentials production-cluster --zone us-central1-a",
          explanation: "Configures kubectl to interact with your GKE cluster."
        },
        {
          title: "Deploy Application with kubectl",
          command: `kubectl create deployment web-app --image=gcr.io/my-project/web-app:v1.2
kubectl expose deployment web-app --type=LoadBalancer --port=80 --target-port=8080
kubectl get services`,
          explanation: "Creates a deployment, exposes it via a cloud load balancer, and lists the external IP."
        }
      ],
      sampleOutput: `NAME       TYPE           CLUSTER-IP    EXTERNAL-IP    PORT(S)        AGE
web-app    LoadBalancer   10.3.245.12   34.72.180.55   80:30892/TCP   45s`,
      useCases: [
        "Running complex microservice architectures with service mesh (Istio).",
        "Deploying stateful applications (databases, message queues) with persistent volumes.",
        "Multi-tenant SaaS application hosting with namespace isolation.",
        "Running ML inference pipelines with GPU node pools."
      ]
    },
    {
      id: "gcp-dataproc",
      name: "Cloud Dataproc (Managed Spark & Hadoop)",
      category: "Big Data Processing",
      summary: "Fully managed Apache Spark, Hadoop, Flink, and Presto cluster service for large-scale distributed data processing, ETL pipelines, and machine learning workloads.",
      why: "Process terabytes/petabytes of data using distributed computing frameworks without managing cluster infrastructure. Integrates natively with Cloud Storage (GCS), BigQuery, and Pub/Sub.",
      outcome: "Ephemeral or persistent Spark/Hadoop clusters that scale dynamically and auto-delete after job completion to minimize costs.",
      syntax: "gcloud dataproc clusters create <name> --region <region> [--num-workers <n>]",
      examples: [
        {
          title: "Create a Dataproc Spark Cluster",
          command: `gcloud dataproc clusters create etl-spark-cluster \\
  --region us-central1 \\
  --master-machine-type n2-standard-4 \\
  --worker-machine-type n2-standard-4 \\
  --num-workers 4 \\
  --image-version 2.1-debian11 \\
  --optional-components JUPYTER \\
  --max-idle 30m \\
  --enable-component-gateway`,
          explanation: "Creates a Spark cluster with 1 master + 4 workers, auto-deletes after 30 minutes of idle, includes JupyterLab web interface."
        },
        {
          title: "Submit a PySpark Job to Dataproc",
          command: `gcloud dataproc jobs submit pyspark \\
  gs://my-bucket/scripts/etl_pipeline.py \\
  --cluster=etl-spark-cluster \\
  --region=us-central1 \\
  --py-files=gs://my-bucket/libs/helpers.zip \\
  -- --input=gs://my-bucket/raw-data/ \\
     --output=gs://my-bucket/processed-data/`,
          explanation: "Submits a PySpark ETL script stored in GCS to the cluster with arguments for input/output paths."
        },
        {
          title: "Create a Single-Node Cluster for Development",
          command: `gcloud dataproc clusters create dev-cluster \\
  --region us-central1 \\
  --single-node \\
  --optional-components JUPYTER,ZEPPELIN`,
          explanation: "Single-node mode is cheaper for development, testing, and debugging Spark jobs before production."
        },
        {
          title: "Submit a Spark SQL Job",
          command: `gcloud dataproc jobs submit spark-sql \\
  --cluster=etl-spark-cluster \\
  --region=us-central1 \\
  --execute="SELECT customer_id, SUM(amount) as total FROM orders GROUP BY customer_id ORDER BY total DESC LIMIT 100"`,
          explanation: "Runs an interactive Spark SQL query directly on the cluster."
        }
      ],
      sampleOutput: `Job [etl-job-20260923] submitted.
Waiting for job output...
[Stage 0:>                                        (0 + 8) / 8]
[Stage 0:======>                                  (1 + 7) / 8]
[Stage 0:=============================>           (5 + 3) / 8]
[Stage 0:========================================>(8 + 0) / 8]
Processed 2,847,291 records in 42.3 seconds
Output written to gs://my-bucket/processed-data/
Job [etl-job-20260923] finished successfully.`,
      useCases: [
        "Processing terabyte-scale CSV/Parquet/Avro data in data lake pipelines.",
        "Running distributed machine learning training with Spark MLlib.",
        "Migrating on-premises Hadoop MapReduce workloads to the cloud.",
        "Ad-hoc interactive Spark SQL analysis on large datasets via JupyterLab.",
        "Streaming ETL from Pub/Sub or Kafka using Spark Structured Streaming."
      ]
    },
    {
      id: "gcp-composer",
      name: "Cloud Composer (Managed Apache Airflow)",
      category: "Workflow Orchestration",
      summary: "Fully managed Apache Airflow service for authoring, scheduling, and monitoring complex multi-step data engineering and ML pipelines as Python DAGs (Directed Acyclic Graphs).",
      why: "When you need to orchestrate dependent ETL/ELT stages across multiple services (BigQuery → Dataproc → Cloud Storage → Pub/Sub) with retries, SLA alerting, and dependency resolution.",
      outcome: "A hosted Airflow web UI with DAG visualization, task execution logs, trigger rules, and integration with 150+ GCP and third-party operators.",
      syntax: "gcloud composer environments create <name> --location <region> --image-version <version>",
      examples: [
        {
          title: "Create a Cloud Composer 2 Environment",
          command: `gcloud composer environments create prod-airflow \\
  --location us-central1 \\
  --image-version composer-2.6.6-airflow-2.7.3 \\
  --environment-size small \\
  --service-account airflow-sa@my-project.iam.gserviceaccount.com`,
          explanation: "Creates a Composer 2 (Autopilot GKE-backed) Airflow environment with a dedicated service account."
        },
        {
          title: "Sample Airflow DAG — BigQuery ETL Pipeline",
          command: `# dags/bq_etl_pipeline.py
from airflow import DAG
from airflow.providers.google.cloud.operators.bigquery import (
    BigQueryInsertJobOperator,
    BigQueryCheckOperator,
)
from airflow.providers.google.cloud.transfers.gcs_to_bigquery import GCSToBigQueryOperator
from airflow.utils.dates import days_ago
from datetime import timedelta

default_args = {
    'owner': 'data-team',
    'retries': 2,
    'retry_delay': timedelta(minutes=5),
    'email_on_failure': True,
    'email': ['data-alerts@company.com'],
}

with DAG(
    dag_id='daily_sales_etl',
    default_args=default_args,
    schedule_interval='0 6 * * *',  # Run daily at 6:00 AM UTC
    start_date=days_ago(1),
    catchup=False,
    tags=['etl', 'bigquery', 'production'],
) as dag:

    # Step 1: Load raw CSV from GCS into BigQuery staging table
    load_raw = GCSToBigQueryOperator(
        task_id='load_raw_csv',
        bucket='my-data-lake',
        source_objects=['raw/sales/{{ ds }}/*.csv'],
        destination_project_dataset_table='my_project.staging.raw_sales',
        write_disposition='WRITE_TRUNCATE',
        source_format='CSV',
        skip_leading_rows=1,
    )

    # Step 2: Transform and aggregate data
    transform = BigQueryInsertJobOperator(
        task_id='transform_aggregate',
        configuration={
            'query': {
                'query': """
                    INSERT INTO analytics.daily_sales_summary
                    SELECT
                        DATE(order_date) as sale_date,
                        product_category,
                        COUNT(*) as total_orders,
                        SUM(amount) as revenue,
                        AVG(amount) as avg_order_value
                    FROM staging.raw_sales
                    WHERE DATE(order_date) = '{{ ds }}'
                    GROUP BY 1, 2
                """,
                'useLegacySql': False,
            }
        },
    )

    # Step 3: Data quality check
    quality_check = BigQueryCheckOperator(
        task_id='quality_check',
        sql="SELECT COUNT(*) FROM analytics.daily_sales_summary WHERE sale_date = '{{ ds }}'",
        use_legacy_sql=False,
    )

    # DAG dependency chain
    load_raw >> transform >> quality_check`,
          explanation: "A production-ready Airflow DAG that: loads CSV from GCS → transforms in BigQuery → runs data quality validation. Runs daily at 6 AM with retry logic and email alerts."
        },
        {
          title: "Upload DAG to Composer Environment",
          command: `gcloud composer environments storage dags import \\
  --environment prod-airflow \\
  --location us-central1 \\
  --source dags/bq_etl_pipeline.py`,
          explanation: "Uploads the DAG Python file to the Composer environment's GCS DAGs folder."
        }
      ],
      sampleOutput: `DAG: daily_sales_etl
├── load_raw_csv       ✓ Success (12s)
├── transform_aggregate ✓ Success (8s)
└── quality_check      ✓ Success (3s)

Next scheduled run: 2026-09-24 06:00:00 UTC`,
      useCases: [
        "Orchestrating multi-step ETL/ELT pipelines across BigQuery, Dataproc, and GCS.",
        "Scheduling ML model retraining pipelines with data validation gates.",
        "Coordinating data ingestion from APIs, databases, and streaming sources.",
        "Building SLA-monitored production data pipelines with alerting and retries.",
        "Migrating on-premises cron-based batch jobs to managed cloud orchestration."
      ]
    },
    {
      id: "gcp-bigquery",
      name: "BigQuery (Serverless Data Warehouse)",
      category: "Analytics & Data Warehouse",
      summary: "Serverless, highly scalable multi-petabyte enterprise data warehouse that runs ANSI SQL queries in seconds using a columnar storage engine with automatic query optimization.",
      why: "Analyze massive datasets without provisioning servers. BigQuery separates storage and compute — you pay $5/TB scanned for queries and $0.02/GB/month for storage (active).",
      outcome: "Sub-second to seconds query response times on billions of rows with built-in ML (BQML), geospatial functions, and scheduled queries.",
      syntax: "bq query --use_legacy_sql=false 'SELECT ...'  |  bq load <dataset.table> <source>",
      examples: [
        {
          title: "Run an Analytical SQL Query",
          command: `SELECT
  FORMAT_DATE('%Y-%m', order_date) AS month,
  product_category,
  COUNT(DISTINCT customer_id) AS unique_customers,
  SUM(revenue) AS total_revenue,
  ROUND(AVG(revenue), 2) AS avg_order_value
FROM \`my-project.analytics.orders\`
WHERE order_date BETWEEN '2026-01-01' AND '2026-09-23'
GROUP BY 1, 2
ORDER BY total_revenue DESC
LIMIT 20;`,
          explanation: "Aggregates monthly revenue by product category across millions of order records."
        },
        {
          title: "Create a BigQuery ML Model (BQML)",
          command: `CREATE OR REPLACE MODEL \`my-project.ml_models.churn_predictor\`
OPTIONS(
  model_type='LOGISTIC_REG',
  input_label_cols=['is_churned'],
  max_iterations=20
) AS
SELECT
  tenure_months,
  monthly_charges,
  total_charges,
  contract_type,
  payment_method,
  is_churned
FROM \`my-project.analytics.customer_features\`;`,
          explanation: "Trains a logistic regression ML model directly in BigQuery SQL — no Python/TensorFlow required."
        },
        {
          title: "Load Data from GCS into BigQuery",
          command: `bq load \\
  --source_format=PARQUET \\
  --autodetect \\
  my_dataset.sales_data \\
  gs://my-bucket/exports/sales_*.parquet`,
          explanation: "Bulk loads Parquet files from Cloud Storage into a BigQuery table with auto-detected schema."
        }
      ],
      sampleOutput: `+----------+------------------+------------------+-----------------+------------------+
| month    | product_category | unique_customers | total_revenue   | avg_order_value  |
+----------+------------------+------------------+-----------------+------------------+
| 2026-09  | Electronics      | 12,847           | $2,847,291.00   | $221.57          |
| 2026-09  | Clothing         | 8,421            | $1,284,102.50   | $152.48          |
| 2026-08  | Electronics      | 11,293           | $2,512,844.00   | $222.50          |
+----------+------------------+------------------+-----------------+------------------+
Query complete (2.1 sec elapsed, 4.8 GB processed)`,
      useCases: [
        "Enterprise business intelligence dashboards (Looker, Data Studio, Tableau).",
        "Ad-hoc SQL analytics on petabyte-scale data lakes.",
        "Training ML models directly in SQL using BigQuery ML (BQML).",
        "Real-time analytics with BigQuery streaming inserts.",
        "Cost-effective long-term data archival with BigQuery Storage API."
      ]
    },
    {
      id: "gcp-cloud-storage",
      name: "Cloud Storage (GCS Object Storage)",
      category: "Storage",
      summary: "Globally distributed, highly durable (99.999999999% — 11 nines) object storage for any amount of unstructured data: images, videos, backups, data lake files, and ML training datasets.",
      why: "Central data lake storage for all GCP services. Cloud Storage integrates natively with BigQuery, Dataproc, Cloud Functions, and Vertex AI.",
      outcome: "gs:// URI-addressable objects with configurable storage classes (Standard, Nearline, Coldline, Archive) and lifecycle policies.",
      syntax: "gsutil cp <local-file> gs://<bucket>/<path>  |  gsutil ls gs://<bucket>/",
      examples: [
        {
          title: "Create a Bucket and Upload Files",
          command: `gsutil mb -l us-central1 gs://my-data-lake-2026/
gsutil -m cp -r ./data/ gs://my-data-lake-2026/raw/
gsutil ls -lh gs://my-data-lake-2026/raw/`,
          explanation: "-m enables multi-threaded parallel upload. -r copies recursively."
        },
        {
          title: "Set Lifecycle Policy to Auto-Archive Old Data",
          command: `gsutil lifecycle set lifecycle.json gs://my-data-lake-2026/

# lifecycle.json:
# { "rule": [{ "action": { "type": "SetStorageClass", "storageClass": "COLDLINE" },
#   "condition": { "age": 90 } }] }`,
          explanation: "Automatically moves objects older than 90 days to cheaper Coldline storage."
        }
      ],
      sampleOutput: `Creating gs://my-data-lake-2026/...
Copying file://./data/sales.csv [Content-Type=text/csv]...
Uploading   gs://my-data-lake-2026/raw/sales.csv:          2.4 MiB/2.4 MiB
Operation completed over 1 objects / 2.4 MiB.`,
      useCases: [
        "Data lake storage for BigQuery external tables and Dataproc jobs.",
        "Static website hosting with HTTPS CDN via Cloud CDN.",
        "Database backup storage with automated lifecycle archival.",
        "ML training dataset storage for Vertex AI pipelines."
      ]
    },
    {
      id: "gcp-iam",
      name: "IAM (Identity & Access Management) — Deep Dive",
      category: "Security & Access Control",
      summary: "IAM controls WHO (identity) can do WHAT (permissions) on WHICH resource (scope). Uses a hierarchy: Organization → Folders → Projects → Resources. Permissions are granted via Roles bound to Members.",
      why: "Principle of Least Privilege — grant only the minimum permissions each service account, user, or group needs. Prevents data breaches, unauthorized resource access, and accidental deletion.",
      outcome: "Fine-grained access control policies that audit-log every API call and enforce compliance.",
      syntax: "gcloud projects add-iam-policy-binding <project> --member=<identity> --role=<role>",
      examples: [
        {
          title: "Grant BigQuery Data Viewer Role to a User",
          command: `gcloud projects add-iam-policy-binding my-project \\
  --member="user:analyst@company.com" \\
  --role="roles/bigquery.dataViewer"`,
          explanation: "Gives read-only access to all BigQuery datasets in the project. Does NOT grant query execution — that requires roles/bigquery.jobUser."
        },
        {
          title: "Create a Service Account with Limited Permissions",
          command: `# Create service account
gcloud iam service-accounts create etl-pipeline-sa \\
  --display-name="ETL Pipeline Service Account"

# Grant only the needed roles
gcloud projects add-iam-policy-binding my-project \\
  --member="serviceAccount:etl-pipeline-sa@my-project.iam.gserviceaccount.com" \\
  --role="roles/bigquery.dataEditor"

gcloud projects add-iam-policy-binding my-project \\
  --member="serviceAccount:etl-pipeline-sa@my-project.iam.gserviceaccount.com" \\
  --role="roles/storage.objectViewer"`,
          explanation: "Creates a dedicated service account that can write to BigQuery and read from GCS — nothing more."
        },
        {
          title: "View Current IAM Policy Bindings",
          command: "gcloud projects get-iam-policy my-project --format=json",
          explanation: "Outputs the complete IAM policy for audit and compliance review."
        },
        {
          title: "Common IAM Roles Quick Reference",
          command: `# VIEWER ROLES (Read-Only):
# roles/viewer                         - Read all resources (broad)
# roles/bigquery.dataViewer            - Read BigQuery datasets/tables
# roles/storage.objectViewer           - Read GCS objects
# roles/compute.viewer                 - Read Compute Engine resources

# EDITOR ROLES (Read + Write):
# roles/editor                         - Edit all resources (broad - avoid)
# roles/bigquery.dataEditor            - Create/update BigQuery tables
# roles/storage.objectAdmin            - Full control of GCS objects
# roles/cloudsql.editor                - Manage Cloud SQL instances

# ADMIN ROLES (Full Control):
# roles/owner                          - Full project owner (avoid for SAs)
# roles/bigquery.admin                 - Full BigQuery admin
# roles/iam.serviceAccountAdmin        - Manage service accounts
# roles/resourcemanager.projectIamAdmin - Manage IAM policies

# CUSTOM ROLES:
# gcloud iam roles create customDataReader \\
#   --project=my-project \\
#   --title="Custom Data Reader" \\
#   --permissions=bigquery.datasets.get,bigquery.tables.list,bigquery.tables.getData`,
          explanation: "Quick reference of the most commonly used predefined IAM roles organized by access level."
        }
      ],
      sampleOutput: `Updated IAM policy for project [my-project].
bindings:
- members:
  - user:admin@company.com
  role: roles/owner
- members:
  - user:analyst@company.com
  role: roles/bigquery.dataViewer
- members:
  - serviceAccount:etl-pipeline-sa@my-project.iam.gserviceaccount.com
  role: roles/bigquery.dataEditor
  role: roles/storage.objectViewer`,
      useCases: [
        "Enforcing Principle of Least Privilege for all human users and service accounts.",
        "Creating dedicated service accounts per microservice/pipeline with scoped permissions.",
        "Auditing who accessed what data using Cloud Audit Logs + IAM Analyzer.",
        "Setting up Organization Policies to restrict resource creation to specific regions.",
        "Implementing Workload Identity Federation for keyless authentication from GitHub Actions or AWS."
      ]
    },
    {
      id: "gcp-cloud-functions-pubsub",
      name: "Cloud Functions & Pub/Sub (Event-Driven Architecture)",
      category: "Serverless & Messaging",
      summary: "Cloud Functions: lightweight serverless functions triggered by HTTP requests or cloud events. Pub/Sub: globally distributed real-time message queue for asynchronous event-driven microservice communication.",
      why: "Build loosely-coupled event-driven architectures where services communicate via messages rather than direct API calls, enabling independent scaling and fault isolation.",
      outcome: "Auto-scaling functions that respond to events (file uploads, database changes, messages) with exactly-once or at-least-once delivery guarantees.",
      syntax: "gcloud functions deploy <name> --trigger-topic=<topic> --runtime=python311",
      examples: [
        {
          title: "Create a Pub/Sub Topic and Subscription",
          command: `gcloud pubsub topics create order-events
gcloud pubsub subscriptions create order-processor-sub \\
  --topic=order-events \\
  --ack-deadline=30 \\
  --message-retention-duration=7d`,
          explanation: "Creates a topic for order events and a pull subscription with 30s acknowledgment deadline and 7-day message retention."
        },
        {
          title: "Deploy a Cloud Function Triggered by Pub/Sub",
          command: `# main.py
import base64
import json
import functions_framework

@functions_framework.cloud_event
def process_order(cloud_event):
    message = base64.b64decode(cloud_event.data["message"]["data"]).decode()
    order = json.loads(message)
    print(f"Processing order {order['order_id']} for customer {order['customer_id']}")
    # Business logic here...
    return "OK"

# Deploy command:
gcloud functions deploy process-order \\
  --gen2 \\
  --runtime=python311 \\
  --trigger-topic=order-events \\
  --region=us-central1 \\
  --memory=256Mi \\
  --timeout=60s`,
          explanation: "Deploys a Gen2 Cloud Function that automatically triggers whenever a message is published to the order-events topic."
        },
        {
          title: "Publish a Message to Pub/Sub",
          command: `gcloud pubsub topics publish order-events \\
  --message='{"order_id":"ORD-12345","customer_id":"CUST-789","amount":99.99}'`,
          explanation: "Publishes a JSON message that triggers the Cloud Function."
        }
      ],
      sampleOutput: `messageIds:
- '8247691753804'
Published message to topic [order-events].`,
      useCases: [
        "Processing file upload events from Cloud Storage (image resizing, virus scanning).",
        "Real-time stream processing pipelines: Pub/Sub → Dataflow → BigQuery.",
        "Decoupling microservices with asynchronous event-driven messaging.",
        "Building webhook processors and chatbot backends."
      ]
    },
    {
      id: "gcp-vpc-networking",
      name: "VPC Networking & Firewall Rules",
      category: "Networking",
      summary: "Virtual Private Cloud (VPC) provides isolated private networking for your GCP resources with subnets, firewall rules, Cloud NAT, VPN, and peering.",
      why: "Isolate workloads, control traffic flow between services, and securely connect on-premises data centers to GCP via Cloud VPN or Cloud Interconnect.",
      outcome: "Segmented private network with strict firewall rules allowing only necessary traffic between tiers.",
      syntax: "gcloud compute networks create <vpc-name> --subnet-mode=custom",
      examples: [
        {
          title: "Create a Custom VPC with Subnets",
          command: `gcloud compute networks create prod-vpc --subnet-mode=custom

gcloud compute networks subnets create web-tier \\
  --network=prod-vpc --region=us-central1 --range=10.0.1.0/24

gcloud compute networks subnets create db-tier \\
  --network=prod-vpc --region=us-central1 --range=10.0.2.0/24`,
          explanation: "Creates isolated subnets for web and database tiers with non-overlapping CIDR ranges."
        },
        {
          title: "Create Firewall Rules",
          command: `# Allow HTTP/HTTPS to web tier
gcloud compute firewall-rules create allow-web-traffic \\
  --network=prod-vpc --allow=tcp:80,tcp:443 \\
  --source-ranges=0.0.0.0/0 --target-tags=web-server

# Allow internal DB access only from web tier
gcloud compute firewall-rules create allow-db-internal \\
  --network=prod-vpc --allow=tcp:5432 \\
  --source-ranges=10.0.1.0/24 --target-tags=db-server`,
          explanation: "Web servers accept public HTTP/HTTPS; database servers only accept PostgreSQL traffic from the web subnet."
        }
      ],
      sampleOutput: `NAME                NETWORK   DIRECTION  PRIORITY  ALLOW          DENY
allow-web-traffic   prod-vpc  INGRESS    1000      tcp:80,tcp:443
allow-db-internal   prod-vpc  INGRESS    1000      tcp:5432`,
      useCases: [
        "Multi-tier application network architecture (web → app → database).",
        "Hybrid cloud connectivity via Cloud VPN tunnels or Cloud Interconnect.",
        "Private Google Access for VMs without external IPs.",
        "VPC peering between projects for shared services."
      ]
    },
    {
      id: "gcloud-cli-cheatsheet",
      name: "gcloud CLI Essential Commands Cheat Sheet",
      category: "CLI Reference",
      summary: "Quick reference for the most frequently used gcloud SDK commands for project management, authentication, resource provisioning, and troubleshooting.",
      why: "The gcloud CLI is the primary interface for managing GCP resources from your local terminal, CI/CD pipelines, and Cloud Shell.",
      outcome: "Efficient terminal-based management of all GCP project resources.",
      syntax: "gcloud <service> <resource> <action> [--flags]",
      examples: [
        {
          title: "Authentication & Project Setup",
          command: `# Login to GCP
gcloud auth login

# Set active project
gcloud config set project my-project-id

# View current configuration
gcloud config list

# List all accessible projects
gcloud projects list

# Activate service account (for CI/CD)
gcloud auth activate-service-account --key-file=credentials.json

# Get access token for API calls
gcloud auth print-access-token`,
          explanation: "Essential authentication and project selection commands."
        },
        {
          title: "Resource Inspection & Troubleshooting",
          command: `# View recent logs
gcloud logging read "severity>=WARNING" --limit=20 --format=json

# List all enabled APIs
gcloud services list --enabled

# Enable a new API
gcloud services enable bigquery.googleapis.com

# Describe a specific resource
gcloud compute instances describe my-vm --zone=us-central1-a

# View billing account
gcloud billing accounts list`,
          explanation: "Commands for debugging, API management, and resource inspection."
        }
      ],
      sampleOutput: `[core]
project = my-project-id
account = dev@company.com

[compute]
region = us-central1
zone = us-central1-a`,
      useCases: [
        "Daily cloud infrastructure management from terminal.",
        "Scripting automated infrastructure provisioning in CI/CD pipelines.",
        "Debugging production issues by tailing logs and inspecting resources.",
        "Onboarding new team members to GCP project access."
      ]
    }
  ]
};
