export const agentDevData = {
  id: "agent-dev",
  title: "Google Agent Development Kit (ADK)",
  subtitle: "Open-source, code-first framework from Google for building, testing, orchestrating, and deploying enterprise AI agents & multi-agent systems with Gemini.",
  usefulLinks: [
    { label: "Google ADK Official Portal", url: "https://adk.dev" },
    { label: "Google ADK Python Repository", url: "https://github.com/google/adk-python" },
    { label: "Google ADK TypeScript Repository", url: "https://github.com/google/adk-js" },
    { label: "Vertex AI Agent Builder", url: "https://cloud.google.com/vertex-ai/docs/agent-builder" },
    { label: "Gemini API Documentation", url: "https://ai.google.dev/docs" },
    { label: "Model Context Protocol (MCP)", url: "https://modelcontextprotocol.io" }
  ],
  items: [
    {
      id: "adk-overview-setup",
      name: "Google ADK Core Architecture & Installation",
      category: "ADK Core Setup",
      summary: "The Agent Development Kit (ADK) is Google's code-first framework designed for building scalable, multi-language AI agents. Available in Python, TypeScript, Go, and Java, ADK bridges Gemini LLMs with enterprise tools, multi-agent collaboration, and Vertex AI.",
      why: "Visual low-code builders lack programmatic control, unit testing, versioning, and custom logic. ADK gives developers full code-first control over prompt structures, tool dispatch, memory state, and multi-agent dynamic routing.",
      outcome: "A fully configured local development environment ready to build, run, and debug Gemini-powered AI agents using the ADK CLI and SDKs.",
      syntax: "# Python:\npip install google-adk\n# TypeScript:\nnpm install @google/adk",
      examples: [
        {
          title: "Install ADK & Initialize Project (Python & TypeScript)",
          command: `# ═══════════════════════════════════════════
# 1. PYTHON ADK SETUP
# ═══════════════════════════════════════════
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\\Scripts\\activate

# Install Google ADK package
pip install google-adk google-genai

# Set API Key / Google Cloud Project
export GEMINI_API_KEY="AIzaSy..."
export GOOGLE_CLOUD_PROJECT="my-gcp-project"

# Verify CLI installation
adk --version

# ═══════════════════════════════════════════
# 2. TYPESCRIPT / NODE.JS ADK SETUP
# ═══════════════════════════════════════════
# Initialize Node project
npm init -y

# Install Google ADK TypeScript SDK & DevTools
npm install @google/adk @google/genai zod
npm install --save-dev @google/adk-devtools tsx typescript

# Initialize project using ADK CLI scaffold
npx adk create my-adk-agent --template=typescript`,
          explanation: "Steps to install and set up Google ADK in Python or Node.js/TypeScript environment with essential dependencies."
        },
        {
          title: "ADK CLI Commands Reference",
          command: `# Create a new agent project from template
adk create web-researcher --language=python

# Run agent interactively in local terminal CLI
adk run agent.py --input "Summarize latest AI news"

# Launch interactive Developer Web UI on localhost:8000
adk dev agent.py --port 8000

# Export agent bundle for Vertex AI Engine deployment
adk export --target=vertex-ai --output=dist/`,
          explanation: "Core ADK CLI commands for scaffolding, local terminal execution, launching web debugging UI, and cloud deployment export."
        }
      ],
      sampleOutput: `Google Agent Development Kit (ADK) v2.4.0
[+] Initializing environment...
[+] Connected to Gemini 1.5 Pro (gemini-1.5-pro-002)
[+] Project Google Cloud: my-gcp-project-prod
[+] Local Dev UI listening on http://localhost:8000
Ready for agent execution.`,
      useCases: [
        "Building autonomous developer assistance agents.",
        "Enterprise document research and report synthesis.",
        "Automated Customer Operations & multi-turn support bots.",
        "Code review & automated DevOps task runners."
      ]
    },
    {
      id: "adk-defining-agents",
      name: "Defining Agents & Gemini Model Configuration",
      category: "Agent Architecture",
      summary: "Agents in ADK combine system instructions, Gemini LLM model selection (Gemini 1.5 Flash/Pro), safety settings, tool bindings, and output schema validation.",
      why: "Properly structuring agent definitions ensures predictable responses, clear role boundaries, and reliable execution when processing complex multi-step user prompts.",
      outcome: "A functional Agent instance configured with system prompts, structured outputs, and Gemini LLM parameters.",
      syntax: "Agent(name='DevBot', model='gemini-1.5-pro', instructions='...', tools=[...])",
      examples: [
        {
          title: "Defining an ADK Agent in Python",
          command: `from google.adk import Agent
from google.adk.models import GeminiModel

# Configure Gemini 1.5 Pro model
model = GeminiModel(
    model_name="gemini-1.5-pro",
    temperature=0.2,
    top_p=0.95
)

# Define specialized Code Reviewer Agent
code_reviewer = Agent(
    name="CodeReviewerBot",
    description="Expert code review agent for Python and TypeScript",
    instructions="""
    You are a Senior Principal Software Architect.
    When given source code:
    1. Identify potential security vulnerabilities and performance bottlenecks.
    2. Suggest refactoring steps with clean code examples.
    3. Verify compliance with industry standards.
    """,
    model=model,
    tools=[]  # Attach custom tools here
)

# Execute agent turn
response = code_reviewer.run("Review this function: def get_user(id): return db.query('SELECT * FROM users WHERE id=' + id)")
print(response.text)`,
          explanation: "Defines a production Python ADK Agent configured with Gemini 1.5 Pro, custom instructions, and execution parameters."
        },
        {
          title: "Defining an ADK Agent in TypeScript",
          command: `import { Agent } from "@google/adk";
import { GeminiModel } from "@google/adk/models";
import { z } from "zod";

// Initialize Gemini 1.5 Flash for low-latency tasks
const model = new GeminiModel({
  modelName: "gemini-1.5-flash",
  temperature: 0.1,
});

// Define Agent with Zod Schema for structured output
export const summaryAgent = new Agent({
  name: "DocSummarizer",
  instructions: "Analyze the provided engineering document and output key takeaways in JSON format.",
  model: model,
  outputSchema: z.object({
    title: z.string(),
    keyPoints: z.array(z.string()),
    actionItems: z.array(z.string()),
    riskLevel: z.enum(["LOW", "MEDIUM", "HIGH"]),
  }),
});

// Run agent turn
const result = await summaryAgent.run({
  prompt: "Review the Q3 Infrastructure Migration Plan..."
});

console.log("Structured JSON Output:", result.structuredOutput);`,
          explanation: "TypeScript ADK Agent definition featuring structured JSON output schema validation powered by Zod."
        }
      ],
      sampleOutput: `[CodeReviewerBot Output]:
⚠️ Security Vulnerability Detected (SQL Injection):
The function directly concatenates 'id' into the raw SQL string.

Recommended Fix:
def get_user(user_id: int):
    return db.query("SELECT * FROM users WHERE id = %s", (user_id,))`,
      useCases: [
        "Structured data extraction (PDF to JSON).",
        "Code quality and compliance security scanning.",
        "Multi-modal input processing (text + images + audio).",
        "Automated customer query routing."
      ]
    },
    {
      id: "adk-tools-integration",
      name: "Tool Integration & Custom Function Binding",
      category: "Tools & Functions",
      summary: "ADK seamlessly connects agents with external APIs, databases, custom Python/JS functions, and built-in Google services (Google Search, Code Execution, Vertex Search).",
      why: "LLMs are isolated without tools. Binding function tools enables agents to query real-time databases, fetch weather/stock data, trigger GCP Cloud Functions, or execute Python code safely.",
      outcome: "An agent capable of dynamically deciding when to call external functions, passing structured arguments, and using returned data in final responses.",
      syntax: "@adk.tool or new Tool({ name, description, parameters, execute })",
      examples: [
        {
          title: "Custom Python Tool Definition with @tool Decorator",
          command: `from google.adk import Agent, tool
import requests

# Define a custom tool with strict type annotations and docstrings
@tool
def fetch_weather(city: str) -> str:
    """Fetches the current weather report for a given city name.
    
    Args:
        city: The name of the city (e.g. 'Tokyo', 'San Francisco')
    """
    # Simulate API call or connect to real service
    return f"Weather in {city}: 22°C (71°F), Partly Cloudy, Humidity 45%"

@tool
def calculate_compute_cost(vcpu: int, ram_gb: int, hours: int) -> dict:
    """Calculates estimated Google Cloud Compute Engine cost.
    
    Args:
        vcpu: Number of virtual CPUs
        ram_gb: Memory in Gigabytes
        hours: Total running hours
    """
    cost_per_hour = (vcpu * 0.033) + (ram_gb * 0.004)
    total = cost_per_hour * hours
    return {"hourly_rate": round(cost_per_hour, 4), "total_cost_usd": round(total, 2)}

# Attach tools to ADK Agent
cloud_assistant = Agent(
    name="GCPCloudAssistant",
    instructions="You help users manage and estimate costs for Google Cloud infrastructure.",
    model="gemini-1.5-flash",
    tools=[fetch_weather, calculate_compute_cost]
)

response = cloud_assistant.run("How much will 8 vCPUs and 32GB RAM cost for 720 hours?")
print(response.text)`,
          explanation: "Using python decorators to create strongly typed tools that Gemini automatically invokes based on prompt context."
        },
        {
          title: "Built-In Google Tools (Google Search & Code Execution)",
          command: `from google.adk import Agent
from google.adk.tools import GoogleSearchTool, CodeExecutionTool

# Initialize Google Search and Grounding tool
search_tool = GoogleSearchTool()

# Initialize Sandboxed Code Execution tool
code_tool = CodeExecutionTool()

# Agent equipped with Google Search & Python Execution
research_agent = Agent(
    name="DeepResearcher",
    instructions="Research real-time information using Google Search and perform math calculations using code execution.",
    model="gemini-1.5-pro",
    tools=[search_tool, code_tool]
)

result = research_agent.run("Find Google's latest quarterly revenue and compute the 15% increase.")
print(result.text)`,
          explanation: "Equipping ADK Agents with native Google Search web grounding and sandboxed code execution tools."
        }
      ],
      sampleOutput: `[GCPCloudAssistant]:
Tool Invocation: calculate_compute_cost(vcpu=8, ram_gb=32, hours=720)
Tool Output: {'hourly_rate': 0.392, 'total_cost_usd': 282.24}

Response:
Estimated cost for 8 vCPUs and 32GB RAM running for 720 hours (approx. 1 month):
• Hourly Rate: $0.392 / hr
• Total Monthly Cost: $282.24 USD`,
      useCases: [
        "Querying relational databases (PostgreSQL, BigQuery).",
        "Executing live web searches and live market data APIs.",
        "Triggering REST APIs and enterprise webhooks.",
        "Sandboxed python code execution for mathematical analysis."
      ]
    },
    {
      id: "adk-multi-agent",
      name: "Multi-Agent Orchestration & Delegation",
      category: "Multi-Agent Orchestration",
      summary: "ADK provides first-class primitives for composing multi-agent systems where specialized agents collaborate via Sequential Chains, Routing Teams, or Supervisor-Worker patterns.",
      why: "Single large prompts quickly hit context limits or hallucinate on complex workflows. Multi-agent architecture splits tasks into domain experts (e.g. Architect, Developer, Tester, Writer).",
      outcome: "A multi-agent team capable of delegating sub-tasks, reviewing each other's outputs, and delivering verified multi-step results.",
      syntax: "SequentialOrchestrator([agent1, agent2]) or RouterAgent(routes={'dev': dev_agent, 'qa': qa_agent})",
      examples: [
        {
          title: "Multi-Agent Team Setup in Python (Supervisor-Worker Pattern)",
          command: `from google.adk import Agent, Team
from google.adk.orchestrators import SupervisorOrchestrator

# 1. Specialized Worker Agents
researcher = Agent(
    name="Researcher",
    instructions="Gather facts, API specifications, and tech documentation.",
    model="gemini-1.5-flash"
)

coder = Agent(
    name="Developer",
    instructions="Write clean, tested Python code based on specifications from Researcher.",
    model="gemini-1.5-pro"
)

reviewer = Agent(
    name="SecurityReviewer",
    instructions="Scan code produced by Developer for bugs, edge cases, and security flaws.",
    model="gemini-1.5-pro"
)

# 2. Team Orchestrator (Supervisor directs workflow)
engineering_team = Team(
    name="EngineeringSquad",
    agents=[researcher, coder, reviewer],
    orchestrator=SupervisorOrchestrator(
        supervisor_instructions="First delegate research to Researcher, then pass requirements to Developer to write code, and finally have SecurityReviewer audit the code."
    )
)

# Run full multi-agent workflow
final_output = engineering_team.run("Build a secure FastAPI endpoint for JWT authentication.")
print(final_output.text)`,
          explanation: "Defines a 3-agent software engineering team managed by a Supervisor orchestrator."
        },
        {
          title: "Router Agent Pattern (Intent Classification & Delegation)",
          command: `from google.adk import Agent, RouterAgent

# Sub-Agents
billing_agent = Agent(name="BillingBot", instructions="Handle invoices, refunds, and subscriptions.")
tech_agent = Agent(name="TechSupportBot", instructions="Handle API errors, downtime, and SDK bugs.")
sales_agent = Agent(name="SalesBot", instructions="Handle enterprise tier pricing and demo requests.")

# Router Agent dynamically routes based on user input intent
router = RouterAgent(
    name="SupportDispatcher",
    instructions="Analyze customer query intent and route to the best support agent.",
    routes={
        "billing": billing_agent,
        "technical": tech_agent,
        "sales": sales_agent
    }
)

response = router.run("My API call is failing with HTTP 500 status error")
print(f"Handled by: {response.active_agent_name}")
print(response.text)`,
          explanation: "Router Agent pattern automatically classifying incoming user intent and passing control to specialized domain agents."
        }
      ],
      sampleOutput: `[SupportDispatcher] Routing request to: TechSupportBot
[TechSupportBot] 
HTTP 500 error indicates an internal server side error.
Here are 3 diagnostic steps:
1. Check your API payload body syntax.
2. Verify API key permissions in Google Cloud Console.
3. Inspect system status at status.cloud.google.com.`,
      useCases: [
        "Autonomous software development pipelines (PR creation & review).",
        "Complex customer service escalation systems.",
        "Financial analysis teams (Data Collector + Quant Model + Report Writer).",
        "Legal document analysis & cross-verification."
      ]
    },
    {
      id: "adk-state-mcp",
      name: "Session State, Memory & Model Context Protocol (MCP)",
      category: "State & Protocols",
      summary: "ADK manages stateful multi-turn conversations through session memory stores (In-Memory, Redis, Firestore) and integrates with Anthropic Model Context Protocol (MCP) tool servers.",
      why: "State retention lets agents remember user context across sessions. MCP integration enables ADK agents to talk to standardized external tools (GitHub MCP, Postgres MCP, Slack MCP).",
      outcome: "Stateful agents with persistent memory and interoperable MCP tool connectivity.",
      syntax: "SessionManager(store=FirestoreStore()) & MCPServerClient(url='http://localhost:3000/mcp')",
      examples: [
        {
          title: "Stateful Session Management in ADK",
          command: `from google.adk import Agent, SessionManager
from google.adk.memory import InMemoryStore, FirestoreMemoryStore

# 1. Initialize session store (Firestore for production)
memory_store = InMemoryStore()  # or FirestoreMemoryStore(project_id="my-gcp")
session_mgr = SessionManager(store=memory_store)

agent = Agent(
    name="AssistantBot",
    instructions="You are a personal task assistant. Remember user preferences across messages.",
    model="gemini-1.5-flash"
)

# Multi-turn interaction sharing session_id
session_id = "user_session_9921"

# Turn 1
r1 = agent.run("My preferred language is Python and I use GCP.", session_id=session_id)

# Turn 2 (Agent recalls context from session store)
r2 = agent.run("Write a quick snippet to upload a blob.", session_id=session_id)
print(r2.text)`,
          explanation: "Using ADK SessionManager to persist conversational context across turns."
        },
        {
          title: "Connecting ADK Agent to Model Context Protocol (MCP) Server",
          command: `from google.adk import Agent
from google.adk.mcp import MCPClientTool

# Connect to external MCP server (e.g. GitHub MCP server)
github_mcp = MCPClientTool(
    server_url="http://localhost:8080/mcp",
    auth_token="mcp_secret_token"
)

# Agent equipped with standardized MCP tools
dev_bot = Agent(
    name="GitHubMCPAgent",
    instructions="You manage GitHub repositories via Model Context Protocol.",
    model="gemini-1.5-pro",
    tools=[github_mcp]
)

response = dev_bot.run("List open pull requests in repo pcbzmani/allinall")
print(response.text)`,
          explanation: "Connecting ADK Agent to an MCP server to access standardized remote tool repositories."
        }
      ],
      sampleOutput: `[AssistantBot Turn 2 Output]:
Here is the Python GCP Cloud Storage upload snippet for your preferences:

from google.cloud import storage

def upload_blob(bucket_name, source_file, destination_blob):
    client = storage.Client()
    bucket = client.bucket(bucket_name)
    blob = bucket.blob(destination_blob)
    blob.upload_from_filename(source_file)
    print(f"Uploaded {source_file} to gs://{bucket_name}/{destination_blob}")`,
      useCases: [
        "Persistent multi-turn customer chat sessions.",
        "Cross-platform MCP tool integration (GitHub, Jira, Salesforce, Slack).",
        "Long-term memory retention for personalized AI assistants.",
        "Audit logging and compliance tracking for enterprise agents."
      ]
    },
    {
      id: "adk-devtools-debugging",
      name: "ADK Developer Web UI & Local Debugging",
      category: "Developer Tools & Testing",
      summary: "ADK features an interactive local Developer Web UI (`adk dev`) that allows developers to visualize agent execution graphs, step through agent turns, inspect raw Gemini prompt tokens, and trace tool calls.",
      why: "Debugging AI agent loops in logs is painful. Visualizing execution trees in real time makes it easy to spot broken prompts, failed tool calls, or infinite agent delegation loops.",
      outcome: "Accelerated development cycles with real-time visual inspection of agent decisions and tool payloads.",
      syntax: "adk dev agent.py --port 8000 or npx @google/adk-devtools",
      examples: [
        {
          title: "Launching ADK Developer Web UI",
          command: `# Python ADK Dev Server
adk dev agent.py --port 8000 --reload

# TypeScript ADK Dev Server
npx adk-devtools --entry src/index.ts --port 3000

# Features available in Web UI (http://localhost:8000):
# 1. Interactive Chat Sandbox
# 2. Execution Graph & Turn Sequence Timeline
# 3. Tool Input / Output JSON Inspector
# 4. Token Consumption & Latency Metrics per turn
# 5. System Instruction & Prompt Live Editor`,
          explanation: "Launching local ADK DevTools Web interface for visual inspection and prompt tweaking."
        },
        {
          title: "Writing Unit Tests for ADK Agents",
          command: `import pytest
from google.adk.testing import AgentTestCase, MockTool
from agent import code_reviewer

def test_code_reviewer_detects_sql_injection():
    # Setup test case
    test = AgentTestCase(agent=code_reviewer)
    
    # Run agent against test input
    result = test.run("SELECT * FROM users WHERE name = '" + name + "'")
    
    # Assertions on response content and tool calls
    assert result.status == "SUCCESS"
    assert "SQL Injection" in result.text
    assert result.has_tool_called("security_scanner") == False`,
          explanation: "Unit testing ADK Agents using built-in testing utilities and assertions."
        }
      ],
      sampleOutput: `[ADK Web UI Server] Listening on http://127.0.0.1:8000
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Visual Execution Log:
 Turn #1 | User Prompt: "Review PR #42"
 ├── Agent: CodeReviewerBot (gemini-1.5-pro)
 ├── Tool Call: fetch_github_pr(pr_id=42) [240ms] -> Status 200
 ├── Tool Output: {"files": ["auth.py"], "diff": "+ password = req.body.pass"}
 └── Agent Response Generated (Token count: 420 | Latency: 1.1s)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      useCases: [
        "Visualizing complex multi-agent message routing.",
        "Debugging tool parameter serialization errors.",
        "Measuring turn latency and Gemini API token costs.",
        "Automated regression testing of prompt instruction updates."
      ]
    },
    {
      id: "adk-deployment",
      name: "Deploying ADK Agents to Vertex AI & Cloud Run",
      category: "Production Deployment",
      summary: "ADK agents are deployment-agnostic and containerized. They can be deployed seamlessly to Google Cloud Run (serverless container) or exported directly to Vertex AI Agent Engine for enterprise managed runtime.",
      why: "Moving from prototype to enterprise production requires scalable hosting, secret management, IAM permissions, autoscaling, and telemetry.",
      outcome: "A production-deployed ADK agent endpoint accessible via REST/gRPC API with Cloud Run auto-scaling and Vertex AI observability.",
      syntax: "adk export --target=vertex-ai or gcloud run deploy adk-agent --source .",
      examples: [
        {
          title: "Dockerfile for Containerizing ADK Agent",
          command: `# Dockerfile for Google ADK Agent Service
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y gcc && rm -rf /var/lib/apt/lists/*

# Copy requirements & install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code
COPY . .

# Expose port (Cloud Run defaults to 8080)
EXPOSE 8080

# Run ADK agent web server
CMD ["adk", "serve", "agent.py", "--host", "0.0.0.0", "--port", "8080"]`,
          explanation: "Production Dockerfile packaging Python ADK agent for Cloud Run or Kubernetes deployment."
        },
        {
          title: "Deploying ADK Agent to Google Cloud Run & Vertex AI",
          command: `# ═══════════════════════════════════════════
# 1. DEPLOY TO GOOGLE CLOUD RUN
# ═══════════════════════════════════════════
gcloud run deploy adk-agent-service \\
  --source . \\
  --region us-central1 \\
  --platform managed \\
  --allow-unauthenticated \\
  --set-env-vars GOOGLE_CLOUD_PROJECT=my-gcp-project \\
  --set-secrets GEMINI_API_KEY=gemini-key-secret:latest

# ═══════════════════════════════════════════
# 2. EXPORT TO VERTEX AI AGENT ENGINE
# ═══════════════════════════════════════════
# Bundle agent code for Vertex AI Engine runtime
adk export --target=vertex-ai --output=./dist

# Deploy to Vertex AI Agent Engine using gcloud
gcloud alpha vertex AI-agents deploy \\
  --agent-config=./dist/agent.yaml \\
  --location=us-central1`,
          explanation: "Commands for deploying ADK Agents to Cloud Run container serverless or Vertex AI Agent Engine runtime."
        }
      ],
      sampleOutput: `Deploying container to Cloud Run service [adk-agent-service] in project [my-gcp-project] region [us-central1]
✓ Building Container... Done.
✓ Uploading Image... Done.
✓ Deploying Revision... Done.
✓ Setting IAM Policy... Done.

Service URL: https://adk-agent-service-xkq92a-uc.a.run.app
Health Check: HTTP 200 OK`,
      useCases: [
        "Deploying production microservice agents with REST APIs.",
        "Enterprise-wide agent deployment on Vertex AI Agent Engine.",
        "Scaling agent workloads automatically on Google Cloud Run.",
        "Integrating AI agents into existing CI/CD GitOps pipelines."
      ]
    }
  ]
};
