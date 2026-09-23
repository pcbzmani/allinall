export const quizData = [
  {
    id: 1,
    category: "Networking",
    question: "Why do we use the 'nslookup' CLI command?",
    options: [
      "To test TCP port connectivity on remote web servers.",
      "To query DNS servers to resolve IP addresses for domain names or inspect MX/TXT records.",
      "To transfer binary files over SFTP protocol.",
      "To inspect corporate Active Directory user groups."
    ],
    correctIndex: 1,
    explanation: "nslookup (Name Server Lookup) is specifically used to query Domain Name System (DNS) servers for address records, MX mail servers, and domain verification."
  },
  {
    id: 2,
    category: "Networking",
    question: "What is the primary difference between 'curl' and 'telnet'?",
    options: [
      "curl is used for Windows AD groups, whereas telnet is for Linux.",
      "curl is an HTTP/data transfer tool; telnet tests raw bidirectional TCP port connectivity.",
      "curl resolves DNS names, while telnet traces IP routing hops.",
      "They are identical tools with different names."
    ],
    correctIndex: 1,
    explanation: "curl transfers data using protocols like HTTP/HTTPS/FTP, while telnet opens a direct TCP socket connection to test if a raw port (e.g. 5432, 80) is open."
  },
  {
    id: 3,
    category: "Git",
    question: "Which command allows you to view the HEAD position history to recover a accidentally deleted commit after a 'git reset --hard'?",
    options: [
      "git log --oneline",
      "git status",
      "git reflog",
      "git branch -d"
    ],
    correctIndex: 2,
    explanation: "git reflog keeps track of every single HEAD change locally, allowing you to restore state even after hard resets or branch deletions."
  },
  {
    id: 4,
    category: "CI/CD",
    question: "Where should sensitive deployment tokens (like NETLIFY_AUTH_TOKEN) be stored in a GitHub Actions pipeline?",
    options: [
      "Hardcoded directly in .github/workflows/deploy.yml",
      "In the public README.md file",
      "In GitHub Repository Encrypted Secrets (${{ secrets.TOKEN_NAME }})",
      "In package.json"
    ],
    correctIndex: 2,
    explanation: "Sensitive credentials must be stored in Repository Secrets to prevent leaking API tokens in public or private code repositories."
  },
  {
    id: 5,
    category: "AI & ML",
    question: "What problem does RAG (Retrieval-Augmented Generation) solve in Generative AI LLM applications?",
    options: [
      "It replaces Python with C++ for faster execution.",
      "It connects LLMs to custom external vector database knowledge to provide factual answers without model fine-tuning.",
      "It trains neural networks without GPU acceleration.",
      "It converts SQL queries into HTML."
    ],
    correctIndex: 1,
    explanation: "RAG retrieves relevant private/domain document snippets from a vector database and includes them in the LLM prompt to eliminate hallucinations."
  },
  {
    id: 6,
    category: "Databases",
    question: "What guarantee does the 'I' in ACID properties stand for in relational SQL databases?",
    options: [
      "Indexing",
      "Isolation (Transactions execute without interfering with one another)",
      "Information",
      "Interface"
    ],
    correctIndex: 1,
    explanation: "Isolation ensures that concurrently running transactions do not interfere with each other, maintaining data consistency."
  }
];
