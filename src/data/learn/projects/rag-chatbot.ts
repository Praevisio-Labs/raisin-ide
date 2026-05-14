import type { Project } from '@/types/index'

export const ragChatbot: Project = {
    id: 'rag-chatbot',
    name: 'RAG Chatbot',
    description:
        'Build a retrieval-augmented assistant that indexes documents, searches context, and grounds generated answers.',
    overview: `## Overview

You'll build a retrieval-augmented generation (RAG) pipeline: a Python script that ingests a set of text documents, embeds them into a Pinecone vector index, and a chatbot that retrieves the most relevant chunks before answering each question. The result is an assistant that can answer questions about your documents accurately — without hallucinating facts that aren't in the source material.

RAG is the most important pattern in applied AI right now. It's how you give a language model access to private knowledge (company docs, codebases, research papers) without fine-tuning, and it's how you ground answers in verifiable sources. Understanding how to build it from scratch — rather than using a pre-packaged solution — is what lets you debug it when retrieval quality is poor and tune it when answers are off.

This project is specifically well-suited to learning because the pipeline has clear, separable stages: ingest, embed, store, retrieve, generate. Each stage has a distinct failure mode, and building them yourself means you understand what can go wrong at each step. That understanding is what separates someone who can use a RAG library from someone who can build and maintain a production RAG system.`,
    instructions: `## Your Exercise

The starter files give you the project structure and the scaffolding for each pipeline stage. The core logic is left for you to implement.

**\`ingest.py\`** is the indexing script — run it once to load documents into Pinecone. You'll need to:
1. Implement \`load_documents(directory)\` to read all \`.txt\` files from a directory and return a list of \`Document\` objects (each with \`id\`, \`text\`, and \`source\` fields).
2. Implement \`chunk_document(doc, chunk_size, overlap)\` to split a document's text into overlapping chunks. Each chunk should be its own \`Document\` with a unique ID.
3. Implement \`embed_and_upsert(chunks, index)\` to embed each chunk with OpenAI's \`text-embedding-3-small\` model and upsert the vectors into Pinecone. Store the original text and source filename in the metadata.

**\`retrieve.py\`** handles the search step. You'll need to:
1. Implement \`retrieve(query, index, k)\` to embed the query and call \`index.query()\` to find the \`k\` most similar chunks. Return the metadata from each match.

**\`chatbot.py\`** is the main conversation loop. The message history and input loop are in place. You'll need to:
1. Implement \`build_prompt(query, context_chunks)\` to format the retrieved chunks into a context block and inject it into the system prompt.
2. Wire the retrieve → build_prompt → OpenAI call sequence in the main loop.

Build in this order: \`ingest.py\` first (run it and verify vectors appear in Pinecone), then \`retrieve.py\` (test it with a few queries), then \`chatbot.py\`.`,
    outcomes: `## Learning Outcomes

By the time you finish, you should be able to:

- **Implement** a complete RAG pipeline from scratch — document loading, chunking, embedding, vector storage, retrieval, and grounded generation — without relying on a framework to hide the steps.
- **Understand** why chunking strategy and overlap matter for retrieval quality, and what happens when chunks are too large or too small.
- **Recognize** the failure modes of RAG — retrieval misses, context window overflow, hallucination despite good retrieval — and know which part of the pipeline to inspect when answers are wrong.`,
    skills: ['python', 'pinecone'],
    domains: ['ai', 'rag', 'agents'],
    level: 'Intermediate',
    duration: '12 hrs',
    teachers: ['feynman'],
    isReleased: true,
    files: [
        {
            name: 'docs/sample.txt',
            fileType: 'text',
            content: `Introduction to Vector Databases

Vector databases are specialized data stores designed to handle high-dimensional vector embeddings. Unlike traditional databases that store structured data in rows and columns, vector databases store numerical representations of data — typically arrays of floating-point numbers — and enable fast similarity search across millions or billions of vectors.

The core operation in a vector database is similarity search. Given a query vector, the database returns the k most similar vectors from its index. Similarity is typically measured using cosine similarity, Euclidean distance, or dot product. This operation powers semantic search, recommendation systems, and retrieval-augmented generation (RAG) in AI applications.

Modern vector databases like Pinecone, Weaviate, and Qdrant use approximate nearest neighbor (ANN) algorithms to make similarity search fast even at scale. These algorithms trade a small amount of accuracy for massive speed improvements, making it practical to search billions of vectors in milliseconds.

In a RAG system, vector databases serve as the knowledge layer. Documents are split into chunks, embedded into vectors, and stored in the database. When a user asks a question, the question is embedded and used to retrieve the most relevant chunks. These chunks are then injected into the language model's context, grounding its response in the source material.
`,
        },
        {
            name: 'README.md',
            fileType: 'markdown',
            content: `# RAG Chatbot

A retrieval-augmented generation chatbot that answers questions based on your documents.

## Setup

1. Install dependencies:
   \`\`\`bash
   pip install -r requirements.txt
   \`\`\`

2. Set environment variables in \`.env\`:
   \`\`\`
   OPENAI_API_KEY=sk-...
   PINECONE_API_KEY=pcsk-...
   \`\`\`

3. Run the ingestion script to index your documents:
   \`\`\`bash
   python ingest.py
   \`\`\`

4. Start the chatbot:
   \`\`\`bash
   python chatbot.py
   \`\`\`

## How it works

- \`ingest.py\` loads documents from \`docs/\`, chunks them, embeds them with OpenAI, and stores the vectors in Pinecone.
- \`retrieve.py\` handles semantic search — given a query, it finds the most relevant chunks.
- \`chatbot.py\` ties it together: retrieves context for each question, injects it into the prompt, and streams the answer.
`,
        },
        {
            name: 'ingest.py',
            fileType: 'python',
            content: `"""
ingest.py — Load documents, chunk them, embed them, and store in Pinecone.
Run this script once (or whenever your documents change) to build the index.
"""

import os
from pathlib import Path
from dataclasses import dataclass, field
from dotenv import load_dotenv
from pinecone import Pinecone, ServerlessSpec
import openai

load_dotenv()

PINECONE_INDEX = "rag-chatbot"
EMBED_MODEL = "text-embedding-3-small"
EMBED_DIM = 1536


@dataclass
class Document:
    id: str
    text: str
    source: str
    metadata: dict = field(default_factory=dict)


def load_documents(directory: str) -> list[Document]:
    """
    Read all .txt files in the given directory.
    Return a list of Document objects, one per file.
    Each document's id should be the filename (without extension).
    """
    # TODO: Use pathlib.Path to iterate over .txt files in the directory.
    # For each file, read its text content and create a Document.
    # Return the list.
    raise NotImplementedError


def chunk_document(doc: Document, chunk_size: int = 800, overlap: int = 150) -> list[Document]:
    """
    Split doc.text into overlapping chunks of approximately chunk_size characters.
    Each chunk becomes its own Document with id="{doc.id}-chunk-{i}".
    The overlap ensures that sentences split across chunk boundaries are still
    represented in at least one complete chunk.
    """
    # TODO: Implement a sliding window chunker.
    # Start at position 0, take chunk_size characters, then advance by (chunk_size - overlap).
    # Continue until you've covered the full text.
    # Each chunk Document should have source=doc.source and metadata={'source': doc.source}.
    raise NotImplementedError


def embed_and_upsert(chunks: list[Document], index) -> None:
    """
    Embed each chunk and upsert into Pinecone in batches of 100.
    Store the chunk text and source in the vector metadata so we can
    retrieve the original text after a similarity search.
    """
    client = openai.OpenAI()

    # TODO: For each chunk, call client.embeddings.create() to get the vector.
    # Build a Pinecone vector dict: { 'id': chunk.id, 'values': vector, 'metadata': {...} }
    # Include 'text' and 'source' in the metadata.
    # Upsert in batches of 100 using index.upsert(vectors=batch).
    raise NotImplementedError


def get_or_create_index(pc: Pinecone):
    """Get the Pinecone index, creating it if it doesn't exist."""
    existing = [idx.name for idx in pc.list_indexes()]
    if PINECONE_INDEX not in existing:
        print(f"Creating index '{PINECONE_INDEX}'...")
        pc.create_index(
            name=PINECONE_INDEX,
            dimension=EMBED_DIM,
            metric="cosine",
            spec=ServerlessSpec(cloud="aws", region="us-east-1"),
        )
    return pc.Index(PINECONE_INDEX)


if __name__ == "__main__":
    pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
    index = get_or_create_index(pc)

    docs_dir = "./docs"
    print(f"Loading documents from {docs_dir}...")
    documents = load_documents(docs_dir)
    print(f"Loaded {len(documents)} documents")

    all_chunks: list[Document] = []
    for doc in documents:
        chunks = chunk_document(doc)
        all_chunks.extend(chunks)
    print(f"Created {len(all_chunks)} chunks")

    print("Embedding and upserting to Pinecone...")
    embed_and_upsert(all_chunks, index)
    print("Done. Index is ready.")
`,
        },
        {
            name: 'retrieve.py',
            fileType: 'python',
            content: `"""
retrieve.py — Semantic search over the Pinecone index.
"""

import os
from dotenv import load_dotenv
import openai

load_dotenv()

EMBED_MODEL = "text-embedding-3-small"


def retrieve(query: str, index, k: int = 4) -> list[dict]:
    """
    Embed the query and search the Pinecone index for the k most similar chunks.
    Returns a list of metadata dicts from the matching vectors.
    Each dict has 'text' and 'source' keys (from the metadata stored during ingest).
    """
    # TODO: Embed the query using openai.OpenAI().embeddings.create().
    # Call index.query() with the query vector, top_k=k, and include_metadata=True.
    # Extract the metadata from each match and return the list.
    raise NotImplementedError
`,
        },
        {
            name: 'chatbot.py',
            fileType: 'python',
            content: `"""
chatbot.py — Interactive RAG chatbot.
Retrieves relevant document chunks before each answer.
"""

import os
from dotenv import load_dotenv
from pinecone import Pinecone
import openai
from retrieve import retrieve

load_dotenv()

PINECONE_INDEX = "rag-chatbot"
CHAT_MODEL = "gpt-4o-mini"


def build_prompt(query: str, context_chunks: list[dict]) -> str:
    """
    Format the retrieved chunks into a context block and return a system prompt
    that instructs the model to answer only from the provided context.

    Each chunk dict has 'text' and 'source' keys (from the Pinecone metadata).
    """
    # TODO: Build a context string by joining the text from each chunk.
    # Include the source filename so the model can cite it.
    # Format example:
    #   [Source: handbook.txt]
    #   <chunk text>
    #
    #   [Source: faq.txt]
    #   <chunk text>
    #
    # Then return a system prompt that:
    # 1. Tells the model to answer based only on the provided context.
    # 2. Instructs it to say "I don't know" if the answer isn't in the context.
    # 3. Includes the formatted context block.
    raise NotImplementedError


def main():
    pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
    index = pc.Index(PINECONE_INDEX)
    client = openai.OpenAI()

    print("RAG Chatbot ready. Type 'quit' to exit.\\n")

    # Conversation history — we keep it so the model has context across turns.
    # Note: we rebuild the system prompt on every turn with fresh retrieved context.
    history: list[dict] = []

    while True:
        query = input("You: ").strip()
        if query.lower() in ("quit", "exit"):
            break
        if not query:
            continue

        # TODO: Step 1 — Retrieve relevant chunks for the query.
        # Call retrieve(query, index, k=4) from retrieve.py.

        # TODO: Step 2 — Build the system prompt with the retrieved context.
        # Call build_prompt(query, chunks).

        # TODO: Step 3 — Call the OpenAI chat completions API.
        # Use the system prompt from Step 2.
        # Pass the conversation history as the messages array.
        # Append the user's query to history before the call,
        # and append the assistant's response after.

        # TODO: Step 4 — Print the assistant's response and continue the loop.

        print()  # blank line between turns


if __name__ == "__main__":
    main()
`,
        },
        {
            name: 'requirements.txt',
            fileType: 'text',
            content: `openai==1.30.1
pinecone==4.1.0
python-dotenv==1.0.1
`,
        },
    ],
}
