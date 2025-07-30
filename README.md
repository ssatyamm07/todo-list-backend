📦 Todo List Backend – Team Contribution Guide
## 🧑‍🤝‍🧑 Team Members

| Name       | Role                     |
|------------|--------------------------|
| Satyam     | Backend                  |
| Nishwanth  | Backend Developer        |
| Vidya      | DataBase(Postgres)       |

---

## ⚙️ Project Setup

### 1. Clone the Repository (Only Once)
```bash
git clone https://github.com/<your-username>/todo-list-backend.git
cd todo-list-backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Ask the team lead for the `.env` file. Example structure:
```ini
DATABASE_URL=your_neon_db_url
JWT_SECRET=your_jwt_secret
PORT=5000
```

---

## 🌿 Branching Strategy

| Branch       | Purpose                                   |
|--------------|-------------------------------------------|
| `main`       | Stable production code                   |
| `dev`        | Active development, merged from features |
| `feature/*`  | New features (e.g., `feature/user-auth`) |
| `bugfix/*`   | Bug fixes (e.g., `bugfix/login-error`)   |
| `hotfix/*`   | Urgent production fixes                  |

---

## 🛠️ Git Workflow for Team

### Pull the latest `dev` branch:
```bash
git checkout dev
git pull origin dev
```

### Create a feature branch:
```bash
git checkout -b feature/your-task-name
```

### Work on your task, then stage and commit:
```bash
git add .
git commit -m "Add: API for user login"
```

### Push your branch to GitHub:
```bash
git push origin feature/your-task-name
```

### Open a Pull Request (PR):
1. Go to GitHub → Pull Requests → New PR.
2. Set **Base branch**: `dev`, **Compare**: `feature/your-task-name`.
3. Add a description of the changes.

### Review & Merge:
- Another team member reviews the PR.
- Once approved, merge the PR into `dev`.

---

## 🧩 Branch Naming Convention

| Type       | Format Example           |
|------------|---------------------------|
| Feature    | `feature/task-crud`       |
| Bug Fix    | `bugfix/login-validation` |
| Hot Fix    | `hotfix/deploy-error`     |