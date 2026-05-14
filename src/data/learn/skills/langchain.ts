import type { Skill } from '@/types/index'

export const langchain: Skill = {
    id: 'langchain',
    name: 'Langchain',
    content: `## LangChain Refresher

LangChain is a Python (and JavaScript) framework for building applications with LLMs. It provides composable abstractions for the most common patterns: chaining prompts together, loading and splitting documents, retrieving relevant context, and building agents that use tools. You don't need LangChain to do any of these things — but it reduces the boilerplate significantly once you understand what it's doing.

---

### Setup

\`\`\`bash
pip install langchain langchain-openai langchain-community
\`\`\`

LangChain splits its packages: \`langchain\` is the core, \`langchain-openai\` adds OpenAI integrations, \`langchain-community\` adds third-party integrations (vector stores, document loaders, etc.).

---

### Chat models

The \`ChatOpenAI\` class wraps the OpenAI API with LangChain's interface:

\`\`\`python
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.7)

messages = [
    SystemMessage(content="You are a helpful assistant."),
    HumanMessage(content="What is the capital of France?"),
]

response = llm.invoke(messages)
print(response.content)  # "The capital of France is Paris."
\`\`\`

---

### Prompt templates

Prompt templates let you define reusable prompts with variables:

\`\`\`python
from langchain_core.prompts import ChatPromptTemplate

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are an expert in {domain}. Answer concisely."),
    ("human", "{question}"),
])

# Format the prompt with values
formatted = prompt.format_messages(
    domain="machine learning",
    question="What is gradient descent?"
)

response = llm.invoke(formatted)
\`\`\`

---

### Chains with LCEL

LangChain Expression Language (LCEL) uses the \`|\` operator to compose components into a pipeline. Each component's output becomes the next component's input.

\`\`\`python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

llm = ChatOpenAI(model="gpt-4o-mini")

prompt = ChatPromptTemplate.from_template(
    "Summarize the following text in one sentence:\\n\\n{text}"
)

# Build the chain: prompt → llm → parse output to string
chain = prompt | llm | StrOutputParser()

result = chain.invoke({"text": "LangChain is a framework for building LLM applications..."})
print(result)  # "LangChain is a framework that simplifies building LLM-powered apps."
\`\`\`

LCEL chains are lazy — they don't run until you call \`.invoke()\`, \`.stream()\`, or \`.batch()\`.

---

### Document loaders and text splitters

For RAG, you first need to load and chunk your documents:

\`\`\`python
from langchain_community.document_loaders import TextLoader, PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

# Load a document
loader = TextLoader("docs/handbook.txt")
documents = loader.load()
# documents is a list of Document objects with .page_content and .metadata

# Split into chunks
splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,      # characters per chunk
    chunk_overlap=200,    # overlap between chunks to preserve context
)
chunks = splitter.split_documents(documents)
print(f"{len(chunks)} chunks created")
\`\`\`

\`RecursiveCharacterTextSplitter\` tries to split on paragraph breaks, then sentences, then words — it preserves natural boundaries as much as possible.

---

### Embeddings

\`\`\`python
from langchain_openai import OpenAIEmbeddings

embeddings = OpenAIEmbeddings(model="text-embedding-3-small")

# Embed a single string
vector = embeddings.embed_query("What is gradient descent?")
print(len(vector))  # 1536

# Embed a list of documents (more efficient for bulk operations)
vectors = embeddings.embed_documents(["text one", "text two", "text three"])
\`\`\`

---

### Vector stores

A vector store indexes your embedded chunks and lets you search by semantic similarity:

\`\`\`python
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings

embeddings = OpenAIEmbeddings(model="text-embedding-3-small")

# Create a vector store from documents
vectorstore = Chroma.from_documents(
    documents=chunks,
    embedding=embeddings,
    persist_directory="./chroma_db",  # save to disk
)

# Search for similar documents
results = vectorstore.similarity_search("How do I reset my password?", k=3)
for doc in results:
    print(doc.page_content)
\`\`\`

For production, swap \`Chroma\` for \`PineconeVectorStore\` or another managed store — the API is the same.

---

### Retrieval-Augmented Generation (RAG)

The full RAG pattern: retrieve relevant chunks, inject them into the prompt, generate a grounded answer.

\`\`\`python
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

retriever = vectorstore.as_retriever(search_kwargs={"k": 4})

prompt = ChatPromptTemplate.from_template("""
Answer the question based only on the following context:

{context}

Question: {question}
""")

def format_docs(docs):
    return "\\n\\n".join(doc.page_content for doc in docs)

rag_chain = (
    {"context": retriever | format_docs, "question": RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
)

answer = rag_chain.invoke("How do I reset my password?")
\`\`\`

---

### Memory and conversation history

For multi-turn conversations, you need to pass history back to the model:

\`\`\`python
from langchain_core.chat_history import InMemoryChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory

history_store: dict[str, InMemoryChatMessageHistory] = {}

def get_history(session_id: str) -> InMemoryChatMessageHistory:
    if session_id not in history_store:
        history_store[session_id] = InMemoryChatMessageHistory()
    return history_store[session_id]

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant."),
    ("placeholder", "{history}"),
    ("human", "{input}"),
])

chain = prompt | llm | StrOutputParser()

chain_with_history = RunnableWithMessageHistory(
    chain,
    get_history,
    input_messages_key="input",
    history_messages_key="history",
)

# Each call with the same session_id shares history
response = chain_with_history.invoke(
    {"input": "My name is Ada."},
    config={"configurable": {"session_id": "user-123"}},
)
\`\`\`

---

### Common gotchas

- **LCEL is lazy** — building a chain with \`|\` doesn't execute anything. You must call \`.invoke()\` to run it. This is easy to forget when debugging.
- **Chunk size matters** — too large and you retrieve irrelevant context; too small and you lose coherence. 500–1000 characters with 10–20% overlap is a reasonable starting point.
- **Retriever \`k\` affects cost and quality** — retrieving more chunks gives the model more context but increases token usage. Start with \`k=4\` and tune from there.
- **LangChain versions move fast** — the API changed significantly between v0.1 and v0.2. If you find conflicting documentation online, check the version. Prefer the \`langchain-core\` imports (\`langchain_core.prompts\`, etc.) over the older top-level ones.
- **Don't over-abstract** — LangChain is most useful for RAG pipelines and document processing. For simple single-turn completions, calling the OpenAI SDK directly is cleaner.`,
}
