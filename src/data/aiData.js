export const aiData = {
  id: "ai",
  title: "AI & Machine Learning Fundamentals",
  subtitle: "Explore Machine Learning paradigm categories, Neural Network architectures, Large Language Models (LLMs), RAG, and Python AI implementations.",
  items: [
    {
      id: "ai-paradigms",
      name: "Machine Learning Paradigms",
      category: "Foundations",
      summary: "Core branches of AI: Supervised Learning (labeled training data), Unsupervised Learning (finding hidden patterns in unlabeled data), and Reinforcement Learning (reward-based agent policies).",
      why: "Understanding which paradigm fits your business problem determines dataset requirements, algorithm selection, and evaluation metrics.",
      outcome: "Select right algorithm (Classification, Regression, Clustering, RL Agent).",
      syntax: "Features (X) + Labels (y) -> Model Training -> Prediction (y_pred)",
      examples: [
        {
          title: "Supervised vs Unsupervised vs RL",
          command: `# Supervised: Spam email detection (Label: Spam / Not Spam)
# Unsupervised: Customer segmentation clustering (K-Means)
# Reinforcement Learning: AlphaGo, Autonomous Robot Navigation`,
          explanation: "Comparison of core learning modes."
        }
      ],
      sampleOutput: `Supervised Accuracy: 98.4%
Unsupervised Clusters Found: 4 Distinct Customer Segments`,
      useCases: ["Fraud detection", "Recommendation engines", "Computer Vision"]
    },
    {
      id: "llms-rag",
      name: "LLMs, Transformers & RAG Architecture",
      category: "Generative AI",
      summary: "Large Language Models (like GPT-4, Gemini, Llama) use Transformer self-attention mechanisms. Retrieval-Augmented Generation (RAG) connects LLMs to custom external vector databases.",
      why: "RAG prevents LLM hallucinations, enables real-time search over private company docs, and avoids expensive full model fine-tuning.",
      outcome: "Accurate, grounded generative responses backed by domain-specific vector embeddings.",
      syntax: "Query -> Vector Embedding -> Vector Search (FAISS/Chroma) -> Context + Query -> LLM -> Response",
      examples: [
        {
          title: "RAG Architecture Flowchart in Python (OpenAI + Vector DB Concept)",
          command: `import openai

def answer_with_rag(user_query, retrieved_documents):
    context = "\\n".join(retrieved_documents)
    prompt = f"""Use the following context to answer the question accurately:
Context: {context}

Question: {user_query}
Answer:"""

    response = openai.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content`,
          explanation: "Combines context retrieval with generative prompting."
        }
      ],
      sampleOutput: `Generative Answer: "According to the company handbook, remote work allowance is $500 per year."`,
      useCases: ["Enterprise AI search", "Document Q&A bots", "Customer support automation"]
    },
    {
      id: "scikit-pytorch-code",
      name: "Python ML Implementation (Scikit-Learn & PyTorch)",
      category: "Code Snippets",
      summary: "Building machine learning models in Python using industry-standard libraries.",
      why: "Demonstrates practical code structure for training models and evaluating performance.",
      outcome: "Trained model classifier object capable of predicting target labels.",
      syntax: "model.fit(X_train, y_train)  |  model.predict(X_test)",
      examples: [
        {
          title: "Random Forest Classifier with Scikit-Learn",
          command: `from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# Sample feature data (X) and target labels (y)
X = [[25, 50000], [45, 85000], [35, 62000], [20, 22000]]
y = [0, 1, 1, 0]  # 0 = Low Credit Risk, 1 = High Credit Risk

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25)

# Instantiate and train model
clf = RandomForestClassifier(n_estimators=100)
clf.fit(X_train, y_train)

# Evaluate predictions
predictions = clf.predict(X_test)
print("Model Accuracy:", accuracy_score(y_test, predictions))`,
          explanation: "Trains a random forest classifier to evaluate credit risk."
        }
      ],
      sampleOutput: `Model Accuracy: 1.0 (100%)`,
      useCases: ["Predictive analytics", "Tabular data classification"]
    }
  ]
};
