import type { Skill } from '@/types/index'

export const pinecone: Skill = {
    id: 'pinecone',
    name: 'Pinecone',
    content: `## Pinecone Refresher

Pinecone is a managed vector database. You store embeddings (high-dimensional float arrays) in it, and query it by semantic similarity — "find the 5 vectors most similar to this one." It's the persistence layer in most production RAG systems, replacing in-memory or local vector stores like Chroma when you need scale, persistence, and low-latency search.

---

### Setup

\`\`\`bash
pip install pinecone
\`\`\`

Get your API key from the Pinecone console and store it in your \`.env\` file:

\`\`\`
PINECONE_API_KEY=pcsk-...
\`\`\`

Initialize the client:

\`\`\`python
from pinecone import Pinecone
import os

pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
\`\`\`

---

### Core concepts

- **Index** — the top-level container for vectors. Analogous to a database table. Each index has a fixed dimension (must match your embedding model) and a distance metric.
- **Vector** — a record in the index. Has an \`id\` (string), \`values\` (list of floats), and optional \`metadata\` (dict of filterable key-value pairs).
- **Namespace** — a partition within an index. Useful for multi-tenant apps where you want to isolate one user's data from another's.
- **Dimension** — the length of the float array. Must match your embedding model: \`text-embedding-3-small\` → 1536, \`text-embedding-3-large\` → 3072.

---

### Creating an index

\`\`\`python
from pinecone import Pinecone, ServerlessSpec

pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))

# Create a serverless index (recommended for most projects)
pc.create_index(
    name="my-documents",
    dimension=1536,           # must match your embedding model
    metric="cosine",          # cosine | euclidean | dotproduct
    spec=ServerlessSpec(
        cloud="aws",
        region="us-east-1",
    ),
)

# Connect to an existing index
index = pc.Index("my-documents")
\`\`\`

You only create an index once. After that, just connect to it with \`pc.Index(name)\`.

---

### Upserting vectors

"Upsert" means insert-or-update — if a vector with that ID already exists, it's replaced.

\`\`\`python
import openai

openai_client = openai.OpenAI()

def embed(text: str) -> list[float]:
    response = openai_client.embeddings.create(
        model="text-embedding-3-small",
        input=text,
    )
    return response.data[0].embedding

# Upsert a batch of vectors
vectors = [
    {
        "id": "doc-001",
        "values": embed("Pinecone is a vector database."),
        "metadata": {
            "source": "handbook",
            "page": 1,
            "text": "Pinecone is a vector database.",  # store the original text
        },
    },
    {
        "id": "doc-002",
        "values": embed("Vector databases enable semantic search."),
        "metadata": {
            "source": "handbook",
            "page": 2,
            "text": "Vector databases enable semantic search.",
        },
    },
]

index.upsert(vectors=vectors)
\`\`\`

Always store the original text in metadata — Pinecone only stores vectors, not the source text, so you need metadata to reconstruct the document after retrieval.

---

### Querying

\`\`\`python
query = "How does semantic search work?"
query_vector = embed(query)

results = index.query(
    vector=query_vector,
    top_k=5,                    # return the 5 most similar vectors
    include_metadata=True,      # include the metadata dict in results
)

for match in results.matches:
    print(f"Score: {match.score:.4f}")
    print(f"Text: {match.metadata['text']}")
    print()
\`\`\`

The \`score\` is the cosine similarity (0–1 for cosine metric). Higher is more similar. A score above 0.8 is generally a strong match; below 0.5 is likely irrelevant.

---

### Metadata filtering

Filter results to a subset of your index without scanning everything:

\`\`\`python
# Only return results from the "handbook" source
results = index.query(
    vector=query_vector,
    top_k=5,
    include_metadata=True,
    filter={"source": {"$eq": "handbook"}},
)

# Multiple conditions
results = index.query(
    vector=query_vector,
    top_k=5,
    include_metadata=True,
    filter={
        "source": {"$eq": "handbook"},
        "page": {"$gte": 10, "$lte": 50},
    },
)
\`\`\`

Supported operators: \`$eq\`, \`$ne\`, \`$gt\`, \`$gte\`, \`$lt\`, \`$lte\`, \`$in\`, \`$nin\`.

---

### Namespaces

Use namespaces to partition data within a single index — useful for multi-tenant apps:

\`\`\`python
# Upsert into a namespace
index.upsert(vectors=vectors, namespace="user-abc123")

# Query within a namespace
results = index.query(
    vector=query_vector,
    top_k=5,
    namespace="user-abc123",
    include_metadata=True,
)

# Delete all vectors in a namespace
index.delete(delete_all=True, namespace="user-abc123")
\`\`\`

---

### Batch upserts for large datasets

Pinecone recommends batches of 100 vectors at a time:

\`\`\`python
def upsert_in_batches(index, vectors: list[dict], batch_size: int = 100):
    for i in range(0, len(vectors), batch_size):
        batch = vectors[i : i + batch_size]
        index.upsert(vectors=batch)
        print(f"Upserted {min(i + batch_size, len(vectors))} / {len(vectors)}")
\`\`\`

---

### Using Pinecone with LangChain

LangChain has a built-in \`PineconeVectorStore\` that wraps the Pinecone client:

\`\`\`python
from langchain_pinecone import PineconeVectorStore
from langchain_openai import OpenAIEmbeddings

embeddings = OpenAIEmbeddings(model="text-embedding-3-small")

# Create from documents (embeds and upserts automatically)
vectorstore = PineconeVectorStore.from_documents(
    documents=chunks,
    embedding=embeddings,
    index_name="my-documents",
)

# Or connect to an existing index
vectorstore = PineconeVectorStore(
    index_name="my-documents",
    embedding=embeddings,
)

# Use as a retriever in a RAG chain
retriever = vectorstore.as_retriever(search_kwargs={"k": 4})
\`\`\`

---

### Common gotchas

- **Dimension mismatch** — if you create an index with dimension 1536 but upsert vectors of length 3072, you'll get an error. The dimension is set at index creation and can't be changed.
- **IDs must be strings** — Pinecone vector IDs are strings. If you're using numeric IDs, convert them: \`str(doc_id)\`.
- **Metadata is not full-text search** — metadata filters work on exact values and ranges, not text search. Don't try to filter on the full text of a document; that's what the vector similarity is for.
- **Upsert is eventually consistent** — after upserting, there's a short delay before vectors are queryable. In tests, add a small \`time.sleep(1)\` after upserting before querying.
- **Free tier limits** — the Pinecone free tier has a single index limit and a storage cap. For development, this is fine; for production, plan your index strategy accordingly.`,
}
