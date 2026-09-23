export const pythonData = {
  id: "python",
  title: "Python Essentials & Best Practices",
  subtitle: "Master core Python syntax, data structures, Object-Oriented Programming (OOP), virtual environments (`venv`), and REST API integration.",
  items: [
    {
      id: "python-datastructures",
      name: "Core Data Structures & Control Flow",
      category: "Syntax & Fundamentals",
      summary: "Lists (mutable arrays), Tuples (immutable), Dictionaries (key-value maps), and Sets (unique items).",
      why: "Choosing the right data structure optimizes time complexity (e.g. O(1) dictionary lookups vs O(n) list searches).",
      outcome: "Clean, pythonic code execution.",
      syntax: "my_list = [] | my_dict = {} | my_set = set()",
      examples: [
        {
          title: "Python Dictionary Comprehension & Filtering",
          command: `# List Comprehension
numbers = [1, 2, 3, 4, 5, 6]
evens = [x for x in numbers if x % 2 == 0]

# Dictionary Operations
user_roles = {"alice": "admin", "bob": "developer", "charlie": "viewer"}
admins = {user: role for user, role in user_roles.items() if role == "admin"}

print("Evens:", evens)
print("Admins:", admins)`,
          explanation: "Filters lists and dictionaries using concise Python comprehensions."
        }
      ],
      sampleOutput: `Evens: [2, 4, 6]
Admins: {'alice': 'admin'}`,
      useCases: ["Data manipulation", "Backend algorithms"]
    },
    {
      id: "python-oop",
      name: "Object-Oriented Programming (Classes & Inheritance)",
      category: "OOP Design",
      summary: "Encapsulate logic into reusable classes with properties, methods, inheritance, and dunder methods (`__init__`, `__str__`).",
      why: "Provides structure for large codebase applications and maintainable software architecture.",
      outcome: "Reusable class instances.",
      syntax: "class ClassName(ParentClass): ...",
      examples: [
        {
          title: "Developer Class with Inheritance",
          command: `class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    def get_info(self):
        return f"{self.name} - \${self.salary}"

class CloudEngineer(Employee):
    def __init__(self, name, salary, cloud_provider):
        super().__init__(name, salary)
        self.cloud_provider = cloud_provider

    def deploy(self):
        return f"{self.name} is deploying app to {self.cloud_provider}!"

eng = CloudEngineer("Sarah", 120000, "GCP")
print(eng.get_info())
print(eng.deploy())`,
          explanation: "Demonstrates class inheritance and method override."
        }
      ],
      sampleOutput: `Sarah - $120000
Sarah is deploying app to GCP!`,
      useCases: ["Domain modeling", "API wrappers"]
    },
    {
      id: "python-venv-requests",
      name: "Virtual Environments (venv) & REST API Requests",
      category: "Package Management & APIs",
      summary: "Isolate project dependencies using `python -m venv` and consume REST APIs using the `requests` library.",
      why: "Prevents global Python dependency conflicts and enables external microservice communication.",
      outcome: "Clean isolated `.venv` directory and JSON API handling.",
      syntax: "python -m venv .venv  |  source .venv/bin/activate",
      examples: [
        {
          title: "Virtual Environment Setup & Fetching JSON API",
          command: `# 1. Create and Activate Virtual Environment
# Windows: python -m venv venv && venv\\Scripts\\activate
# Mac/Linux: python3 -m venv venv && source venv/bin/activate

import requests

def get_github_user(username):
    url = f"https://api.github.com/users/{username}"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        print(f"User: {data['name']} | Public Repos: {data['public_repos']}")
    else:
        print("User not found.")

get_github_user("torvalds")`,
          explanation: "Makes an HTTP GET request to GitHub REST API and parses JSON."
        }
      ],
      sampleOutput: `User: Linus Torvalds | Public Repos: 7`,
      useCases: ["Web scraping", "Microservices integration", "CLI script building"]
    }
  ]
};
