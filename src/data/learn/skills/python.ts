import type { Skill } from '@/types/index'

export const python: Skill = {
    id: 'python',
    name: 'Python',
    content: `## Python Refresher

Python is a general-purpose language known for readable syntax and a massive ecosystem. In the context of AI and data work, it's the dominant language — most ML frameworks, vector databases, and LLM toolkits have Python-first APIs. This refresher focuses on the parts of Python you'll actually use when building AI applications.

---

### Setup and environments

Always work inside a virtual environment to isolate dependencies per project:

\`\`\`bash
# Create a virtual environment
python -m venv .venv

# Activate it
source .venv/bin/activate        # macOS / Linux
.venv\\Scripts\\activate           # Windows

# Install packages
pip install openai langchain

# Save dependencies
pip freeze > requirements.txt

# Install from requirements
pip install -r requirements.txt
\`\`\`

---

### Variables and types

Python is dynamically typed — you don't declare types, but you can annotate them for clarity and tooling support:

\`\`\`python
name: str = "Ada"
age: int = 30
score: float = 9.5
active: bool = True

# Lists
items: list[str] = ["apple", "banana", "cherry"]

# Dictionaries
user: dict[str, str] = {"name": "Ada", "email": "ada@example.com"}

# Tuples (immutable)
point: tuple[int, int] = (10, 20)

# None
result: str | None = None
\`\`\`

---

### Functions

\`\`\`python
# Basic function with type hints
def greet(name: str, greeting: str = "Hello") -> str:
    return f"{greeting}, {name}"

# *args and **kwargs
def log(*messages: str, level: str = "info") -> None:
    for msg in messages:
        print(f"[{level}] {msg}")

# Lambda (anonymous function)
double = lambda x: x * 2

# List comprehension — often replaces a for loop + append
squares = [x ** 2 for x in range(10)]
evens = [x for x in range(20) if x % 2 == 0]
\`\`\`

---

### Classes

\`\`\`python
from dataclasses import dataclass

# dataclass — less boilerplate than a regular class for data containers
@dataclass
class Document:
    id: str
    content: str
    metadata: dict = None

    def __post_init__(self):
        if self.metadata is None:
            self.metadata = {}

    def word_count(self) -> int:
        return len(self.content.split())

doc = Document(id="doc-1", content="Hello world")
print(doc.word_count())  # 2
\`\`\`

For more complex classes:

\`\`\`python
class VectorStore:
    def __init__(self, dimension: int):
        self.dimension = dimension
        self._vectors: list[list[float]] = []

    def add(self, vector: list[float]) -> None:
        if len(vector) != self.dimension:
            raise ValueError(f"Expected {self.dimension} dimensions, got {len(vector)}")
        self._vectors.append(vector)

    def __len__(self) -> int:
        return len(self._vectors)
\`\`\`

---

### Error handling

\`\`\`python
import openai

try:
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": "Hello"}]
    )
except openai.RateLimitError:
    print("Rate limit hit — back off and retry")
except openai.APIError as e:
    print(f"API error {e.status_code}: {e.message}")
except Exception as e:
    print(f"Unexpected error: {e}")
    raise  # re-raise if you can't handle it
\`\`\`

---

### Working with files and JSON

\`\`\`python
import json
from pathlib import Path

# Read a file
text = Path("document.txt").read_text(encoding="utf-8")

# Write a file
Path("output.txt").write_text("Hello, world", encoding="utf-8")

# Read JSON
data = json.loads(Path("data.json").read_text())

# Write JSON
Path("output.json").write_text(json.dumps(data, indent=2))

# Read lines
lines = Path("corpus.txt").read_text().splitlines()
\`\`\`

---

### Async Python

Most AI SDK calls are I/O-bound — you're waiting on network requests. \`async\`/\`await\` lets you run multiple requests concurrently instead of sequentially.

\`\`\`python
import asyncio
import openai

client = openai.AsyncOpenAI()

async def get_completion(prompt: str) -> str:
    response = await client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content

async def main():
    # Run multiple requests concurrently
    prompts = ["Summarize X", "Summarize Y", "Summarize Z"]
    results = await asyncio.gather(*[get_completion(p) for p in prompts])
    for result in results:
        print(result)

asyncio.run(main())
\`\`\`

---

### Environment variables

Never hardcode API keys. Use \`python-dotenv\` to load from a \`.env\` file:

\`\`\`bash
pip install python-dotenv
\`\`\`

\`\`\`python
from dotenv import load_dotenv
import os

load_dotenv()  # reads .env file into environment

api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OPENAI_API_KEY not set")
\`\`\`

\`.env\` file:
\`\`\`
OPENAI_API_KEY=sk-...
PINECONE_API_KEY=pcsk-...
\`\`\`

Add \`.env\` to \`.gitignore\` immediately.

---

### Useful standard library modules

\`\`\`python
import os           # environment variables, file paths
import json         # JSON serialization
import re           # regular expressions
import time         # sleep, timing
import hashlib      # hashing (useful for deduplication)
import uuid         # unique IDs
from pathlib import Path   # modern file path handling
from typing import Optional, Union, Any  # type hints
from dataclasses import dataclass, field
\`\`\`

---

### Common gotchas

- **Mutable default arguments** — \`def fn(items=[]):\` shares the same list across all calls. Use \`None\` as the default and create the list inside the function.
- **Indentation is syntax** — Python uses indentation to define blocks. Mixing tabs and spaces causes \`IndentationError\`. Stick to 4 spaces.
- **\`is\` vs \`==\`** — \`is\` checks identity (same object in memory), \`==\` checks equality. Use \`==\` for value comparisons. The exception: \`if x is None\` is idiomatic.
- **Encoding** — always specify \`encoding="utf-8"\` when reading/writing files. The default varies by OS.
- **Virtual environments** — if packages you installed aren't found, you're probably not in the right virtual environment. Check with \`which python\`.`,
}
