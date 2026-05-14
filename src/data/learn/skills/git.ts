import type { Skill } from '@/types/index'

export const git: Skill = {
    id: 'git',
    name: 'Git',
    content: `## Git Refresher

Git is a distributed version control system. It tracks changes to your files over time, lets you branch off to experiment without affecting the main codebase, and makes it possible to collaborate with others without overwriting each other's work.

---

### Core concepts

- **Repository (repo)** — a directory Git is tracking, containing your files and the full history of every change.
- **Commit** — a snapshot of your files at a point in time. Each commit has a unique hash, an author, a timestamp, and a message.
- **Branch** — a lightweight pointer to a commit. Creating a branch lets you diverge from the main line of development without touching it.
- **Remote** — a version of the repo hosted elsewhere (GitHub, GitLab, etc.). \`origin\` is the conventional name for the primary remote.
- **Working tree** — the files you see on disk, in their current state.
- **Staging area (index)** — a holding area where you assemble the next commit. You choose exactly which changes to include.

---

### Initial setup

\`\`\`bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

# Initialize a new repo in the current directory
git init

# Clone an existing repo
git clone https://github.com/user/repo.git
git clone https://github.com/user/repo.git my-folder  # clone into a named folder
\`\`\`

---

### The basic workflow

\`\`\`bash
# 1. Check what's changed
git status

# 2. Stage changes
git add file.txt           # stage a specific file
git add src/               # stage a directory
git add .                  # stage everything in the working tree

# 3. Commit
git commit -m "Add login form validation"

# 4. Push to the remote
git push origin main
\`\`\`

Write commit messages in the imperative mood: "Fix bug" not "Fixed bug" or "Fixes bug." Keep the subject line under 72 characters.

---

### Viewing history

\`\`\`bash
git log                        # full log
git log --oneline              # compact — one commit per line
git log --oneline --graph      # with branch/merge visualization
git log --oneline -10          # last 10 commits

git show abc1234               # show a specific commit's diff
git diff                       # unstaged changes vs last commit
git diff --staged              # staged changes vs last commit
git diff main..feature-branch  # diff between two branches
\`\`\`

---

### Branching

\`\`\`bash
git branch                     # list local branches
git branch -a                  # list local and remote branches

git branch feature/login       # create a branch
git switch feature/login       # switch to it
git switch -c feature/login    # create and switch in one step

git branch -d feature/login    # delete a merged branch
git branch -D feature/login    # force-delete (even if unmerged)
\`\`\`

---

### Merging and rebasing

**Merge** — joins two branches by creating a merge commit. Preserves the full history of both branches.

\`\`\`bash
git switch main
git merge feature/login        # merge feature into main
\`\`\`

**Rebase** — replays your branch's commits on top of another branch. Produces a linear history, but rewrites commit hashes.

\`\`\`bash
git switch feature/login
git rebase main                # replay feature commits on top of main
\`\`\`

Use merge for integrating finished work into a shared branch. Use rebase to keep a feature branch up to date with \`main\` before opening a pull request. Never rebase commits that have already been pushed to a shared remote.

---

### Resolving conflicts

A conflict occurs when two branches change the same lines differently. Git marks the conflict in the file:

\`\`\`
<<<<<<< HEAD
const greeting = 'Hello'
=======
const greeting = 'Hi'
>>>>>>> feature/login
\`\`\`

To resolve:
1. Edit the file to keep the version you want (remove the markers).
2. Stage the resolved file: \`git add file.txt\`
3. Complete the merge: \`git commit\`

---

### Undoing things

\`\`\`bash
# Unstage a file (keep changes in working tree)
git restore --staged file.txt

# Discard changes in the working tree (irreversible)
git restore file.txt

# Amend the last commit message or add a forgotten file
git add forgotten.txt
git commit --amend --no-edit   # keep the same message

# Undo a commit by creating a new "reverse" commit (safe for shared branches)
git revert abc1234

# Move HEAD back N commits, keeping changes staged
git reset --soft HEAD~1

# Move HEAD back N commits, keeping changes unstaged
git reset HEAD~1

# Move HEAD back N commits, discarding changes entirely (destructive)
git reset --hard HEAD~1
\`\`\`

Prefer \`revert\` over \`reset\` on any branch others are working on. \`reset --hard\` is destructive — the discarded commits are gone.

---

### Working with remotes

\`\`\`bash
git remote -v                          # list remotes
git remote add origin <url>            # add a remote

git fetch origin                       # download remote changes, don't merge
git pull origin main                   # fetch + merge
git pull --rebase origin main          # fetch + rebase (cleaner history)

git push origin feature/login          # push a branch
git push -u origin feature/login       # push and set upstream tracking
git push --force-with-lease            # safer force push — fails if remote has new commits
\`\`\`

---

### Stashing

Stash saves your uncommitted changes temporarily so you can switch context without committing half-done work.

\`\`\`bash
git stash                    # stash working tree and staged changes
git stash push -m "WIP: form validation"  # stash with a description

git stash list               # see all stashes
git stash pop                # apply the most recent stash and remove it
git stash apply stash@{1}    # apply a specific stash, keep it in the list
git stash drop stash@{1}     # delete a specific stash
\`\`\`

---

### Useful everyday commands

\`\`\`bash
# See which branch you're on and what's staged/unstaged
git status

# Interactively stage chunks of a file (not the whole file)
git add -p file.txt

# Find which commit introduced a bug using binary search
git bisect start
git bisect bad                 # current commit is broken
git bisect good abc1234        # this commit was fine

# Show who last changed each line of a file
git blame file.txt

# Search commit messages
git log --oneline --grep="login"

# Search code changes across history
git log -S "functionName" --oneline
\`\`\`

---

### \`.gitignore\`

List files and patterns Git should never track. Common entries:

\`\`\`
# Dependencies
node_modules/

# Build output
.next/
dist/
build/

# Environment files
.env
.env.local
.env*.local

# OS files
.DS_Store
Thumbs.db

# Editor
.vscode/
.idea/
\`\`\`

Once a file is already tracked, adding it to \`.gitignore\` won't stop Git from watching it. You need to untrack it first:

\`\`\`bash
git rm --cached file.txt
\`\`\`

---

### Common gotchas

- **Committing secrets** — if you accidentally commit a secret (API key, password), assume it's compromised. Remove it from history with \`git filter-repo\` and rotate the credential immediately.
- **Detached HEAD** — happens when you check out a specific commit instead of a branch. Any commits you make won't belong to a branch and can be lost. Run \`git switch -c new-branch\` to save your work.
- **\`git pull\` creates merge commits** — use \`git pull --rebase\` to keep history linear, or configure it as the default: \`git config --global pull.rebase true\`.
- **Large files** — Git stores the full content of every version of every file. Don't commit large binaries or build artifacts. Use Git LFS for assets that must be versioned.`,
}
