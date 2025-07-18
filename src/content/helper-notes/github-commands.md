---
title: "GitHub Commands & Tips"
description: "Essential Git commands, GitHub workflows, and tips for remote development"
pubDate: 2025-07-18
categories: ["commands", "development", "git", "tools"]
---

# GitHub Commands & Tips

Essential Git commands, GitHub workflows, and tips for effective remote development and collaboration.

## Initial Setup

### First-Time Configuration
```bash
# Set your identity
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Set default branch name
git config --global init.defaultBranch main

# Configure credential storage
git config --global credential.helper store
git config --global credential.helper cache

# Set default editor
git config --global core.editor "code --wait"
```

### SSH Key Setup
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"

# Start SSH agent
eval "$(ssh-agent -s)"

# Add SSH key to agent
ssh-add ~/.ssh/id_ed25519

# Copy public key to clipboard (macOS)
pbcopy < ~/.ssh/id_ed25519.pub

# Copy public key to clipboard (Linux)
cat ~/.ssh/id_ed25519.pub | xclip -selection clipboard

# Copy public key to clipboard (Windows)
clip < ~/.ssh/id_ed25519.pub
```

## Basic Workflow

### Repository Operations
```bash
# Clone a repository
git clone https://github.com/username/repository.git
git clone git@github.com:username/repository.git

# Clone specific branch
git clone -b branch-name https://github.com/username/repository.git

# Clone with limited history (shallow clone)
git clone --depth 1 https://github.com/username/repository.git

# Initialize new repository
git init
git remote add origin https://github.com/username/repository.git
```

### Daily Commands
```bash
# Check status
git status

# Add files to staging
git add filename.txt
git add .                    # Add all files
git add *.js                 # Add all JS files
git add -p                   # Interactive add

# Commit changes
git commit -m "Your commit message"
git commit -am "Add message" # Add and commit tracked files

# Push changes
git push origin main
git push -u origin main      # Set upstream branch
```

## Branch Management

### Creating and Switching
```bash
# Create new branch
git branch feature-name
git checkout -b feature-name  # Create and switch

# Switch branches
git checkout branch-name
git switch branch-name        # Modern alternative

# List branches
git branch                    # Local branches
git branch -r                 # Remote branches
git branch -a                 # All branches
```

### Branch Operations
```bash
# Merge branches
git merge feature-name
git merge --no-ff feature-name  # Force merge commit

# Delete branches
git branch -d feature-name    # Safe delete
git branch -D feature-name    # Force delete
git push origin --delete feature-name  # Delete remote

# Rename branch
git branch -m old-name new-name
git push origin -u new-name
git push origin --delete old-name
```

## Advanced Git Operations

### Stashing
```bash
# Save work in progress
git stash
git stash push -m "WIP: feature description"

# List stashes
git stash list

# Apply stashes
git stash pop                 # Apply and remove
git stash apply stash@{0}     # Apply specific stash
git stash drop stash@{0}      # Remove specific stash

# Clear all stashes
git stash clear
```

### Rebasing
```bash
# Rebase current branch
git rebase main

# Interactive rebase
git rebase -i HEAD~3          # Last 3 commits
git rebase -i main            # Rebase onto main

# Abort rebase
git rebase --abort

# Continue rebase
git rebase --continue
```

### Cherry-Picking
```bash
# Apply specific commit
git cherry-pick commit-hash

# Cherry-pick range
git cherry-pick start-commit..end-commit

# Cherry-pick without auto-commit
git cherry-pick --no-commit commit-hash
```

## GitHub-Specific Features

### Pull Requests
```bash
# Create PR from command line (GitHub CLI)
gh pr create --title "Feature title" --body "Description"

# Check PR status
gh pr status

# List PRs
gh pr list

# Review PR
gh pr review --approve
gh pr review --request-changes
```

### Issues and Projects
```bash
# Create issue
gh issue create --title "Bug title" --body "Description"

# List issues
gh issue list

# Add to project
gh issue add-to-project --project-name "Project Name"

# Create discussion
gh discussion create --title "Discussion title" --body "Content"
```

## Collaboration Tips

### Code Review
```bash
# Request review
gh pr edit --add-reviewer username

# Add reviewers
gh pr edit --add-reviewer user1,user2

# Request changes
gh pr review --body "Please fix these issues" --request-changes
```

### Team Workflows
```bash
# Fork workflow
git remote add upstream https://github.com/original/repo.git
git fetch upstream
git merge upstream/main

# Sync fork
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

## Troubleshooting

### Common Issues
```bash
# Undo last commit
git reset --soft HEAD~1       # Keep changes staged
git reset --hard HEAD~1       # Discard changes

# Fix wrong branch commit
git reset --soft HEAD~1
git checkout correct-branch
git cherry-pick HEAD@{1}

# Recover deleted branch
git reflog
git checkout -b recovered-branch commit-hash
```

### Merge Conflicts
```bash
# Abort merge
git merge --abort

# Resolve conflicts manually
# Edit conflicted files
git add resolved-file.txt
git commit -m "Resolve merge conflicts"
```

## GitHub CLI Commands

### Authentication
```bash
# Login to GitHub
gh auth login

# Check authentication
gh auth status

# Logout
gh auth logout
```

### Repository Management
```bash
# Create repository
gh repo create repo-name --public
gh repo create repo-name --private

# Clone repository
gh repo clone username/repo-name

# View repository
gh repo view username/repo-name
```

### Workflow Automation
```bash
# Run workflow
gh workflow run workflow-name.yml

# List workflows
gh workflow list

# View workflow runs
gh run list
```

## Best Practices

### Commit Messages
```bash
# Conventional commits
git commit -m "feat: add new feature"
git commit -m "fix: resolve bug"
git commit -m "docs: update README"
git commit -m "style: format code"
git commit -m "refactor: improve structure"
git commit -m "test: add unit tests"
```

### Branch Naming
```bash
# Feature branches
feature/user-authentication
feature/payment-integration

# Bug fixes
fix/login-error
fix/memory-leak

# Hotfixes
hotfix/security-patch
hotfix/critical-bug
```

### Git Hooks
```bash
# Pre-commit hook example
#!/bin/sh
# Run tests before commit
npm test

# Pre-push hook example
#!/bin/sh
# Run linting before push
npm run lint
```

## Useful Aliases

### Git Aliases
```bash
# Add to ~/.gitconfig
[alias]
    st = status
    co = checkout
    br = branch
    ci = commit
    unstage = reset HEAD --
    last = log -1 HEAD
    visual = !gitk
    lg = log --oneline --graph --decorate
    ll = log --oneline --graph --decorate --all
```

### Shell Aliases
```bash
# Add to ~/.bashrc or ~/.zshrc
alias gs='git status'
alias ga='git add'
alias gc='git commit'
alias gp='git push'
alias gl='git log --oneline'
alias gd='git diff'
alias gco='git checkout'
alias gb='git branch'
```

## Security Tips

### SSH Key Management
```bash
# List SSH keys
ssh-add -l

# Remove SSH key
ssh-add -d ~/.ssh/id_ed25519

# Test SSH connection
ssh -T git@github.com
```

### Token Management
```bash
# Create personal access token
# GitHub.com > Settings > Developer settings > Personal access tokens

# Use token in clone
git clone https://token@github.com/username/repo.git

# Store token securely
git config --global credential.helper store
```

## Performance Tips

### Large Repositories
```bash
# Shallow clone for large repos
git clone --depth 1 https://github.com/large/repo.git

# Sparse checkout
git clone --filter=blob:none --sparse https://github.com/large/repo.git
cd repo
git sparse-checkout init --cone
git sparse-checkout set src/important-folder

# Git LFS for large files
git lfs install
git lfs track "*.psd"
git lfs track "*.zip"
```

### Network Optimization
```bash
# Configure Git for better performance
git config --global core.compression 9
git config --global core.packedGitLimit 512m
git config --global core.packedGitWindowSize 512m
git config --global pack.deltaCacheSize 2047m
git config --global pack.packSizeLimit 512m
git config --global pack.windowMemory 2047m
``` 