export const aiData = {
  id: "ai",
  title: "AI & Machine Learning — Complete Fundamentals Guide",
  subtitle: "Explore ML paradigms, Neural Networks, Deep Learning, Transformers, Large Language Models (LLMs), RAG architecture, Prompt Engineering, and hands-on Python AI implementations.",
  usefulLinks: [
    { label: "Google AI / ML Crash Course", url: "https://developers.google.com/machine-learning/crash-course" },
    { label: "Hugging Face Docs (Transformers)", url: "https://huggingface.co/docs/transformers" },
    { label: "OpenAI API Reference", url: "https://platform.openai.com/docs/api-reference" },
    { label: "PyTorch Official Tutorials", url: "https://pytorch.org/tutorials/" },
    { label: "Scikit-Learn User Guide", url: "https://scikit-learn.org/stable/user_guide.html" },
    { label: "Google Vertex AI Docs", url: "https://cloud.google.com/vertex-ai/docs" },
    { label: "fast.ai Free Course", url: "https://course.fast.ai/" },
    { label: "Papers with Code (SOTA)", url: "https://paperswithcode.com/" },
    { label: "TensorFlow Playground", url: "https://playground.tensorflow.org/" },
    { label: "LangChain Documentation", url: "https://docs.langchain.com/" }
  ],
  items: [
    {
      id: "ai-paradigms",
      name: "Machine Learning Paradigms & Algorithms",
      category: "ML Foundations",
      summary: "Core branches of AI: Supervised Learning (labeled training data → predictions), Unsupervised Learning (finding hidden patterns in unlabeled data), Semi-Supervised Learning, and Reinforcement Learning (reward-based agent policies).",
      why: "Understanding which paradigm fits your business problem determines dataset requirements, algorithm selection, evaluation metrics, and infrastructure costs.",
      outcome: "Select the right algorithm family: Classification (categories), Regression (continuous values), Clustering (grouping), Dimensionality Reduction (feature compression), or RL Agent (sequential decisions).",
      syntax: "Features (X) + Labels (y) → Model.fit(X, y) → Model.predict(X_new) → Evaluation Metrics",
      examples: [
        {
          title: "Supervised vs Unsupervised vs Reinforcement Learning",
          command: `# ═══════════════════════════════════════════
# SUPERVISED LEARNING (Labeled Data Required)
# ═══════════════════════════════════════════
# Classification (Discrete Labels):
#   - Spam detection → Label: Spam / Not Spam
#   - Image recognition → Label: Cat / Dog / Bird
#   - Medical diagnosis → Label: Positive / Negative
#   Algorithms: Logistic Regression, Random Forest, SVM, XGBoost, Neural Networks
#   Metrics: Accuracy, Precision, Recall, F1-Score, AUC-ROC

# Regression (Continuous Values):
#   - House price prediction → Label: $350,000
#   - Stock price forecasting → Label: $142.50
#   - Demand forecasting → Label: 1,247 units
#   Algorithms: Linear Regression, Gradient Boosting, Neural Networks
#   Metrics: MSE, RMSE, MAE, R² Score

# ═══════════════════════════════════════════
# UNSUPERVISED LEARNING (No Labels)
# ═══════════════════════════════════════════
# Clustering (Group Similar Items):
#   - Customer segmentation → K-Means, DBSCAN
#   - Topic modeling → LDA (Latent Dirichlet Allocation)
#   - Anomaly detection → Isolation Forest, Autoencoders

# Dimensionality Reduction:
#   - Feature compression → PCA, t-SNE, UMAP
#   - Visualization of high-dimensional data

# ═══════════════════════════════════════════
# REINFORCEMENT LEARNING (Reward Signal)
# ═══════════════════════════════════════════
#   - Game playing → AlphaGo, OpenAI Five
#   - Robotics → Navigation, Manipulation
#   - Recommendation systems → Dynamic content ranking
#   Algorithms: Q-Learning, PPO, A3C, SAC`,
          explanation: "Comprehensive comparison of all three core machine learning paradigm branches with real-world applications."
        },
        {
          title: "ML Model Evaluation Metrics Cheat Sheet",
          command: `# CLASSIFICATION METRICS:
# Accuracy   = (TP + TN) / Total          → Overall correctness
# Precision  = TP / (TP + FP)             → "Of predicted positives, how many were correct?"
# Recall     = TP / (TP + FN)             → "Of actual positives, how many did we find?"
# F1-Score   = 2 × (Precision × Recall) / (Precision + Recall) → Harmonic mean
# AUC-ROC    = Area under ROC curve       → Discrimination ability

# REGRESSION METRICS:
# MSE   = Mean Squared Error              → Average squared difference
# RMSE  = Root Mean Squared Error          → Same units as target
# MAE   = Mean Absolute Error              → Average absolute difference
# R²    = Coefficient of Determination     → 1.0 = perfect, 0.0 = baseline

# WHEN TO USE WHICH:
# Imbalanced data (fraud detection) → Use F1-Score, AUC-ROC (not Accuracy!)
# Balanced classes → Accuracy is acceptable
# Business cost of errors → Use Precision (FP costly) or Recall (FN costly)`,
          explanation: "Quick reference for choosing the right evaluation metric based on your business problem."
        }
      ],
      sampleOutput: `Model Training Report:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Algorithm:       Random Forest Classifier
Training Set:    8,000 samples
Test Set:        2,000 samples
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Accuracy:        96.4%
Precision:       94.8%
Recall:          97.2%
F1-Score:        96.0%
AUC-ROC:         0.987`,
      useCases: [
        "Fraud detection (classification)", "Customer churn prediction",
        "Demand forecasting (regression)", "Customer segmentation (clustering)",
        "Recommendation engines", "Computer Vision (image classification)"
      ]
    },
    {
      id: "deep-learning-neural-nets",
      name: "Deep Learning & Neural Network Architectures",
      category: "Neural Networks",
      summary: "Neural networks are layers of interconnected nodes (neurons) that learn hierarchical feature representations. Deep learning uses multiple hidden layers to automatically extract complex patterns from raw data.",
      why: "Deep learning achieves state-of-the-art results on tasks where traditional ML struggles: image recognition, speech-to-text, natural language understanding, and generative content creation.",
      outcome: "Trained neural network models that can classify images, generate text, translate languages, and detect objects in real-time.",
      syntax: "Input Layer → Hidden Layers (ReLU activation) → Output Layer (Softmax/Sigmoid) → Loss → Backpropagation",
      examples: [
        {
          title: "Neural Network Architecture Types",
          command: `# ═══════════════════════════════════════════
# 1. FEEDFORWARD NEURAL NETWORK (FNN / MLP)
# ═══════════════════════════════════════════
# Input → Dense → Dense → Output
# Use: Tabular data classification/regression
# Example: Credit scoring, customer churn prediction

# ═══════════════════════════════════════════
# 2. CONVOLUTIONAL NEURAL NETWORK (CNN)
# ═══════════════════════════════════════════
# Input Image → Conv2D → MaxPool → Conv2D → Flatten → Dense → Output
# Use: Image classification, object detection, medical imaging
# Architectures: ResNet, VGG, EfficientNet, YOLO

# ═══════════════════════════════════════════
# 3. RECURRENT NEURAL NETWORK (RNN / LSTM / GRU)
# ═══════════════════════════════════════════
# Input Sequence → LSTM Cell → LSTM Cell → ... → Output
# Use: Time-series forecasting, sentiment analysis, speech recognition
# Note: Mostly replaced by Transformers for NLP tasks

# ═══════════════════════════════════════════
# 4. TRANSFORMER ARCHITECTURE
# ═══════════════════════════════════════════
# Input → Embedding → Multi-Head Self-Attention → FFN → Output
# Use: NLP (BERT, GPT), Vision (ViT), Multi-modal (CLIP, Gemini)
# Key Innovation: Self-attention mechanism (parallel processing)

# ═══════════════════════════════════════════
# 5. GENERATIVE ADVERSARIAL NETWORK (GAN)
# ═══════════════════════════════════════════
# Generator vs Discriminator (adversarial training)
# Use: Image generation, style transfer, data augmentation`,
          explanation: "Overview of the five major neural network families and their primary applications."
        },
        {
          title: "PyTorch Neural Network Example",
          command: `import torch
import torch.nn as nn
import torch.optim as optim

# Define a simple feedforward neural network
class ChurnPredictor(nn.Module):
    def __init__(self, input_features):
        super().__init__()
        self.network = nn.Sequential(
            nn.Linear(input_features, 128),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(128, 64),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(64, 1),
            nn.Sigmoid()
        )

    def forward(self, x):
        return self.network(x)

# Initialize model, loss function, and optimizer
model = ChurnPredictor(input_features=10)
criterion = nn.BCELoss()            # Binary Cross-Entropy for classification
optimizer = optim.Adam(model.parameters(), lr=0.001)

# Training loop (simplified)
for epoch in range(100):
    optimizer.zero_grad()
    outputs = model(X_train_tensor)
    loss = criterion(outputs, y_train_tensor)
    loss.backward()          # Backpropagation
    optimizer.step()         # Update weights
    
    if epoch % 10 == 0:
        print(f"Epoch {epoch}, Loss: {loss.item():.4f}")`,
          explanation: "Complete PyTorch model definition with 3-layer feedforward network, dropout regularization, Adam optimizer, and training loop."
        }
      ],
      sampleOutput: `Epoch 0, Loss: 0.6931
Epoch 10, Loss: 0.4823
Epoch 20, Loss: 0.3512
Epoch 50, Loss: 0.1847
Epoch 90, Loss: 0.0892
Training complete. Final loss: 0.0892`,
      useCases: [
        "Image classification (medical imaging, self-driving cars)",
        "Natural language processing (chatbots, translation, summarization)",
        "Time-series forecasting (stock prices, weather prediction)",
        "Generative AI (image synthesis, music generation, code generation)"
      ]
    },
    {
      id: "llms-rag",
      name: "LLMs, Transformers & RAG Architecture",
      category: "Generative AI & LLMs",
      summary: "Large Language Models (GPT-4, Gemini, Claude, Llama) use Transformer self-attention to generate human-like text. RAG (Retrieval-Augmented Generation) connects LLMs to external knowledge bases via vector embeddings to produce factual, grounded responses.",
      why: "RAG prevents LLM hallucinations, enables real-time search over private company documents, eliminates the need for expensive full model fine-tuning, and keeps responses current (beyond the model's training cutoff date).",
      outcome: "Accurate, grounded generative responses backed by domain-specific vector embeddings retrieved from a vector database (FAISS, Chroma, Pinecone, Weaviate).",
      syntax: "User Query → Embed → Vector Search → Retrieve Top-K Docs → Inject Context → LLM → Grounded Answer",
      examples: [
        {
          title: "RAG Pipeline Implementation (Python + OpenAI + ChromaDB)",
          command: `import openai
import chromadb
from chromadb.utils import embedding_functions

# 1. Initialize ChromaDB vector store with OpenAI embeddings
client = chromadb.PersistentClient(path="./vector_db")
embedder = embedding_functions.OpenAIEmbeddingFunction(
    api_key="sk-...",
    model_name="text-embedding-3-small"
)
collection = client.get_or_create_collection(
    name="company_docs",
    embedding_function=embedder
)

# 2. Index documents (run once)
collection.add(
    documents=[
        "Remote work allowance is $500 per year for equipment.",
        "Annual leave policy: 20 days PTO + 10 sick days.",
        "Health insurance covers dental and vision from day 1.",
    ],
    ids=["doc1", "doc2", "doc3"]
)

# 3. Query: Retrieve relevant documents
results = collection.query(
    query_texts=["What is the remote work budget?"],
    n_results=2  # Top 2 most relevant chunks
)

# 4. Generate grounded answer with retrieved context
context = "\\n".join(results["documents"][0])
response = openai.chat.completions.create(
    model="gpt-4o",
    messages=[{
        "role": "user",
        "content": f"""Answer based ONLY on this context:
{context}

Question: What is the remote work budget?
Answer:"""
    }]
)
print(response.choices[0].message.content)`,
          explanation: "Complete RAG pipeline: embed documents in ChromaDB → search by semantic similarity → inject top results as context → generate grounded LLM response."
        },
        {
          title: "Prompt Engineering Best Practices",
          command: `# ═══════════════════════════════════════════
# PROMPT ENGINEERING TECHNIQUES
# ═══════════════════════════════════════════

# 1. SYSTEM PROMPT (Set persona and rules)
system = "You are a senior DevOps engineer. Answer concisely with code examples."

# 2. FEW-SHOT PROMPTING (Provide examples)
prompt = """
Translate natural language to SQL:
"Show me all users who signed up last month" → SELECT * FROM users WHERE created_at >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month')
"Count orders by category" → SELECT category, COUNT(*) FROM orders GROUP BY category
"Find the top 5 customers by revenue" →
"""

# 3. CHAIN-OF-THOUGHT (CoT) — Force reasoning steps
prompt = "Solve step by step: If a server handles 500 req/s and we need 99.99% uptime..."

# 4. STRUCTURED OUTPUT (JSON mode)
prompt = "Extract entities from this text. Return JSON: {name, email, company}"

# 5. TEMPERATURE CONTROL
# temperature=0.0 → Deterministic (code, factual answers)
# temperature=0.7 → Creative (writing, brainstorming)
# temperature=1.0+ → Very creative / random`,
          explanation: "Five core prompt engineering techniques for getting better, more reliable LLM outputs."
        },
        {
          title: "Fine-Tuning vs RAG — Decision Matrix",
          command: `# ═══════════════════════════════════════════
# WHEN TO USE RAG vs FINE-TUNING
# ═══════════════════════════════════════════
#
# Use RAG when:
#   ✓ Data changes frequently (docs, policies, product catalogs)
#   ✓ You need source attribution ("Based on document X...")
#   ✓ Budget is limited (no GPU training costs)
#   ✓ You need real-time information retrieval
#   ✓ Data is private/sensitive (stays in your vector DB)
#
# Use FINE-TUNING when:
#   ✓ You need to change the model's behavior/tone/format
#   ✓ Task is highly specialized (medical, legal, code generation)
#   ✓ Data is static and well-curated
#   ✓ You need lower latency (no retrieval step)
#   ✓ You want a smaller, cheaper model that matches larger model quality
#
# Use BOTH (RAG + Fine-Tuned Model) when:
#   ✓ Enterprise production systems
#   ✓ Maximum accuracy on domain-specific questions
#   ✓ Custom behavior + real-time knowledge`,
          explanation: "Decision guide for choosing between RAG retrieval and model fine-tuning approaches."
        }
      ],
      sampleOutput: `RAG Pipeline Response:
Query: "What is the remote work budget?"
Retrieved Context: "Remote work allowance is $500 per year for equipment."
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Answer: "According to the company policy, the remote work allowance
is $500 per year, designated for equipment purchases."
Source: doc1 (similarity: 0.94)`,
      useCases: [
        "Enterprise AI search over internal knowledge bases and documentation.",
        "Customer support chatbots grounded in product documentation.",
        "Legal document Q&A with source attribution.",
        "Code generation assistants with company-specific APIs and patterns.",
        "Medical diagnostic assistants backed by clinical guidelines."
      ]
    },
    {
      id: "scikit-pytorch-code",
      name: "Python ML Code Examples (Scikit-Learn & PyTorch)",
      category: "Hands-On Code",
      summary: "Production-ready Python code patterns for training, evaluating, and deploying machine learning models using industry-standard libraries.",
      why: "Demonstrates practical code structure for the complete ML workflow: data loading → preprocessing → training → evaluation → prediction → model saving.",
      outcome: "Trained model objects capable of predicting target labels with measurable accuracy metrics.",
      syntax: "model.fit(X_train, y_train) → model.predict(X_test) → metrics.accuracy_score(y_test, y_pred)",
      examples: [
        {
          title: "Complete Scikit-Learn ML Pipeline (Random Forest)",
          command: `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.pipeline import Pipeline
import joblib

# 1. Load and prepare data
df = pd.read_csv("customer_data.csv")
X = df[["age", "income", "tenure_months", "monthly_charges"]]
y = df["churned"]  # 0 = Stayed, 1 = Churned

# 2. Split into train/test sets (80/20)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# 3. Create sklearn Pipeline (preprocessing + model)
pipeline = Pipeline([
    ("scaler", StandardScaler()),        # Normalize features
    ("classifier", RandomForestClassifier(
        n_estimators=200,
        max_depth=10,
        class_weight="balanced",         # Handle imbalanced classes
        random_state=42
    ))
])

# 4. Train model
pipeline.fit(X_train, y_train)

# 5. Evaluate on test set
y_pred = pipeline.predict(X_test)
print(classification_report(y_test, y_pred))
print("Confusion Matrix:")
print(confusion_matrix(y_test, y_pred))

# 6. Save model for production deployment
joblib.dump(pipeline, "churn_model_v1.pkl")
print("Model saved to churn_model_v1.pkl")`,
          explanation: "End-to-end ML pipeline: data loading → train/test split → StandardScaler + RandomForest pipeline → evaluation report → model serialization with joblib."
        },
        {
          title: "Load Saved Model and Make Predictions",
          command: `import joblib
import numpy as np

# Load trained model
model = joblib.load("churn_model_v1.pkl")

# Predict on new customer data
new_customer = np.array([[35, 75000, 24, 89.99]])  # age, income, tenure, monthly_charges
prediction = model.predict(new_customer)
probability = model.predict_proba(new_customer)

print(f"Churn Prediction: {'Will Churn' if prediction[0] == 1 else 'Will Stay'}")
print(f"Churn Probability: {probability[0][1]:.2%}")`,
          explanation: "Load a saved model and predict churn probability for a new customer."
        }
      ],
      sampleOutput: `              precision    recall  f1-score   support
           0       0.95      0.97      0.96      1420
           1       0.91      0.86      0.88       580
    accuracy                           0.94      2000

Confusion Matrix:
[[1378   42]
 [  81  499]]

Churn Prediction: Will Stay
Churn Probability: 12.34%`,
      useCases: [
        "Customer churn prediction for SaaS businesses.",
        "Fraud detection in financial transactions.",
        "Medical diagnosis classification from patient features.",
        "Deploying trained models as REST APIs using Flask/FastAPI."
      ]
    }
  ]
};
