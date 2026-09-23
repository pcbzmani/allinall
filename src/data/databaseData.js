export const databaseData = {
  id: "database",
  title: "Database Fundamentals (SQL & NoSQL)",
  subtitle: "Understand relational databases (PostgreSQL, MySQL), document databases (MongoDB), key-value stores (Redis), ACID properties, and essential SQL queries.",
  usefulLinks: [
    { label: "PostgreSQL Documentation", url: "https://www.postgresql.org/docs/" },
    { label: "MySQL Reference Manual", url: "https://dev.mysql.com/doc/refman/8.0/en/" },
    { label: "MongoDB University (Free Courses)", url: "https://university.mongodb.com/" },
    { label: "Redis Documentation", url: "https://redis.io/docs/" },
    { label: "SQL Tutorial (W3Schools)", url: "https://www.w3schools.com/sql/" },
    { label: "SQLBolt Interactive Exercises", url: "https://sqlbolt.com/" },
    { label: "DB Fiddle (Online SQL Playground)", url: "https://www.db-fiddle.com/" },
    { label: "Use The Index, Luke (Indexing Guide)", url: "https://use-the-index-luke.com/" }
  ],
  items: [
    {
      id: "sql-vs-nosql",
      name: "SQL vs NoSQL Comparison Matrix",
      category: "Architecture",
      summary: "Relational SQL databases store structured data in tables with strict schemas and foreign keys. NoSQL databases store schema-less JSON documents, key-value pairs, or graphs.",
      why: "Selecting the right database model impacts scalability (Vertical vs Horizontal scaling), consistency (ACID vs BASE), and query flexibility.",
      outcome: "Optimized data persistence strategy.",
      syntax: "SQL: Tables/Rows/Columns  |  NoSQL: Collections/Documents/Fields",
      examples: [
        {
          title: "SQL vs NoSQL Characteristics",
          command: `# SQL (Relational): PostgreSQL, MySQL, SQLite, Oracle
# - Structure: Strict tables, primary keys, foreign keys
# - Guarantees: ACID (Atomicity, Consistency, Isolation, Durability)
# - Scaling: Vertical (scale up CPU/RAM)

# NoSQL (Non-Relational): MongoDB, Redis, DynamoDB, Cassandra
# - Structure: Flexible JSON documents, Key-Value pairs
# - Guarantees: Eventual Consistency / BASE
# - Scaling: Horizontal (sharding across multiple server clusters)`,
          explanation: "High-level feature matrix."
        }
      ],
      sampleOutput: `PostgreSQL: Structured transactional data (Financials, E-Commerce orders)
MongoDB: Unstructured content management, real-time analytics feeds
Redis: In-memory caching, session storage, real-time leaderboards`,
      useCases: ["Choosing DB stack for new applications", "Database architecture design"]
    },
    {
      id: "essential-sql-queries",
      name: "Essential SQL Statements & JOIN Types",
      category: "SQL Commands",
      summary: "Master CRUD operations, INNER/LEFT/RIGHT JOINs, GROUP BY aggregations, and B-Tree database indexing.",
      why: "SQL is the universal query language for relational data retrieval and data engineering.",
      outcome: "Efficient relational queries with optimal indexing execution plans.",
      syntax: "SELECT columns FROM table JOIN other_table ON condition WHERE filter GROUP BY column HAVING condition ORDER BY column LIMIT n",
      examples: [
        {
          title: "Complex SQL Query with INNER JOIN & Aggregations",
          command: `SELECT 
    u.id AS user_id,
    u.username,
    COUNT(o.id) AS total_orders,
    SUM(o.total_amount) AS total_spent
FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE o.status = 'COMPLETED'
GROUP BY u.id, u.username
HAVING SUM(o.total_amount) > 500
ORDER BY total_spent DESC
LIMIT 10;`,
          explanation: "Joins users and orders tables, filters completed orders, calculates aggregated total spent, and retrieves top 10 big spenders."
        },
        {
          title: "Creating Database Index for Fast Lookups",
          command: "CREATE INDEX idx_users_email ON users(email);",
          explanation: "Creates a B-Tree index on email column to reduce lookup time from O(n) table scan to O(log n)."
        }
      ],
      sampleOutput: `user_id | username | total_orders | total_spent
--------+----------+--------------+------------
104     | dev_sam  | 14           | 2450.00
42      | alex_k   | 8            | 1120.50`,
      useCases: ["Business intelligence reports", "Backend database API endpoints"]
    }
  ]
};
