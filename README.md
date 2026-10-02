# 🤖 AI Quiz Generator

An AI-powered full-stack quiz generation platform built with **Angular 21, Python FastAPI, OpenRouter AI, and PostgreSQL**.

The application allows users to generate customized quizzes using AI, take interactive quizzes, view detailed results and explanations, and track their quiz performance through a personalized dashboard and quiz history.

The project also includes **JWT authentication, password hashing, Docker containerization, and Docker Compose orchestration**.

---

## 🌐 Live Demo

> 🚧 Deployment coming soon.

---

## 📸 Screenshots

### 🏠 Home

_Add screenshot here_

![Home](screenshots/home.png)

### 🔐 Login

_Add screenshot here_

![Login](screenshots/login.png)

### 📊 Dashboard

_Add screenshot here_

![Dashboard](screenshots/dashboard.png)

### 🤖 Quiz Generator

_Add screenshot here_

![Quiz Generator](screenshots/quiz-generator.png)

### 📝 Quiz

_Add screenshot here_

![Quiz](screenshots/quiz.png)

### 🏆 Result

_Add screenshot here_

![Result](screenshots/result.png)

### 📚 Quiz History

_Add screenshot here_

![Quiz History](screenshots/history.png)

---

# ✨ Features

## 🔐 User Authentication

The application provides secure user authentication using JWT.

- User registration
- User login
- JWT access tokens
- bcrypt password hashing
- Protected Angular routes
- Protected FastAPI endpoints
- Authentication interceptor
- Guest route protection
- User-specific data

---

## 🤖 AI Quiz Generation

Users can generate quizzes dynamically using AI.

Users can select:

- Topic
- Difficulty
- Number of questions
- Question type

The backend sends the request to an AI model through OpenRouter and returns structured quiz data.

Example:

```text
Topic: Python
Difficulty: Easy
Questions: 5
Question Type: Multiple Choice
```

The AI generates:

- Questions
- Answer options
- Correct answers
- Explanations

---

## 📝 Interactive Quiz

Users can take the generated quiz through an interactive interface.

Features include:

- Multiple-choice questions
- Answer selection
- Question navigation
- Automatic score calculation
- Correct/incorrect answer detection
- Quiz completion
- Result calculation

---

## 🏆 Detailed Results

After completing a quiz, users receive a detailed result page.

The result includes:

- Total questions
- Correct answers
- Wrong answers
- Score
- Percentage
- User's selected answer
- Correct answer
- Explanation for each question

This allows users to understand not only their score but also **why an answer was correct or incorrect**.

---

## 📊 Dashboard

Authenticated users have access to a personalized dashboard.

The dashboard provides:

- Total quizzes taken
- Average score
- Best score
- Recent quiz activity
- Quick actions
- Navigation to quiz generation and history

Example:

```text
Quizzes Taken     10
Average Score     65%
Best Score        100%
```

---

## 📚 Quiz History

Users can view their previous quiz attempts.

Each quiz record contains information such as:

- Topic
- Difficulty
- Question count
- Score
- Percentage
- Date
- User

Quiz history is associated with the authenticated user.

---

# 🏗️ Application Architecture

```text
                         ┌──────────────────────┐
                         │      User Browser    │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │     Angular 21       │
                         │      Frontend        │
                         └──────────┬───────────┘
                                    │
                              HTTP / REST
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │      FastAPI         │
                         │       Backend        │
                         └───────┬───────┬──────┘
                                 │       │
                       ┌─────────┘       └─────────┐
                       ▼                           ▼
             ┌──────────────────┐       ┌──────────────────┐
             │   OpenRouter AI  │       │   PostgreSQL 18  │
             │  Quiz Generation │       │     Database     │
             └──────────────────┘       └──────────────────┘
```

---

# 🔄 Application Flow

## Quiz Generation Flow

```text
User
  │
  ▼
Angular Quiz Form
  │
  ▼
FastAPI API
  │
  ▼
OpenRouter AI
  │
  ▼
Generated Quiz JSON
  │
  ▼
FastAPI
  │
  ▼
Angular
  │
  ▼
Interactive Quiz
```

---

## Authentication Flow

```text
User
  │
  ▼
Angular Login
  │
  ▼
FastAPI
  │
  ▼
PostgreSQL
  │
  ▼
Password Verification
  │
  ▼
JWT Token
  │
  ▼
Angular localStorage
  │
  ▼
HTTP Interceptor
  │
  ▼
Protected API Requests
```

---

## Quiz History Flow

```text
Quiz Completed
      │
      ▼
Calculate Score
      │
      ▼
Authenticated API Request
      │
      ▼
FastAPI
      │
      ▼
PostgreSQL
      │
      ▼
User-specific Quiz Record
      │
      ▼
Dashboard / History
```

---

# 🛠️ Tech Stack

## Frontend

| Technology | Purpose |
|---|---|
| Angular 21 | Frontend framework |
| TypeScript | Application development |
| SCSS | Styling |
| Angular Router | Application routing |
| Angular Signals | Reactive state |
| HttpClient | API communication |
| Route Guards | Authentication protection |
| HTTP Interceptors | JWT authorization |
| SSR / SSG | Angular application build |

---

## Backend

| Technology | Purpose |
|---|---|
| Python | Backend programming |
| FastAPI | REST API framework |
| SQLAlchemy | ORM |
| Pydantic | Request/response validation |
| Uvicorn | ASGI server |
| python-jose | JWT handling |
| bcrypt | Password hashing |
| python-dotenv | Environment configuration |

---

## AI

| Technology | Purpose |
|---|---|
| OpenRouter | AI API gateway |
| OpenRouter Free Router | AI model routing |

---

## Database

| Technology | Purpose |
|---|---|
| PostgreSQL 18 | Relational database |
| SQLAlchemy | Database ORM |
| psycopg | PostgreSQL driver |

---

## DevOps

| Technology | Purpose |
|---|---|
| Docker | Containerization |
| Docker Compose | Multi-container orchestration |
| Nginx | Frontend static file serving |
| Git | Version control |
| GitHub | Source code hosting |

---

# 📁 Project Structure

```text
ai-quiz-generator/
│
├── backend/
│   │
│   ├── services/
│   │   ├── auth_service.py
│   │   └── auth_dependency.py
│   │
│   ├── database.py
│   ├── models.py
│   ├── main.py
│   ├── requirements.txt
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── .env.example
│   └── .env.docker
│
├── frontend/
│   │
│   ├── src/
│   │   ├── app/
│   │   │   │
│   │   │   ├── pages/
│   │   │   │   ├── home/
│   │   │   │   ├── login/
│   │   │   │   ├── register/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── quiz/
│   │   │   │   ├── result/
│   │   │   │   └── history/
│   │   │   │
│   │   │   ├── services/
│   │   │   ├── guards/
│   │   │   ├── interceptors/
│   │   │   └── app.config.ts
│   │   │
│   │   ├── styles.scss
│   │   └── index.html
│   │
│   ├── package.json
│   ├── angular.json
│   ├── Dockerfile
│   └── .dockerignore
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

# 🔌 API Endpoints

## Authentication

### Register

```http
POST /api/auth/register
```

Example request:

```json
{
  "name": "Aden",
  "email": "user@example.com",
  "password": "password"
}
```

---

### Login

```http
POST /api/auth/login
```

Example request:

```json
{
  "email": "user@example.com",
  "password": "password"
}
```

Example response:

```json
{
  "message": "Login successful",
  "access_token": "JWT_TOKEN",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "name": "Aden",
    "email": "user@example.com"
  }
}
```

---

# 🤖 Quiz APIs

## Generate Quiz

```http
POST /api/quiz/generate
```

Example request:

```json
{
  "topic": "Python",
  "difficulty": "Easy",
  "question_count": 5,
  "question_type": "Multiple Choice"
}
```

---

## Save Quiz

```http
POST /api/quiz/save
```

Requires authentication.

Example:

```json
{
  "topic": "Python",
  "difficulty": "Easy",
  "question_count": 5,
  "score": 4
}
```

---

## Quiz History

```http
GET /api/quiz/history
```

Requires authentication.

Returns quiz attempts associated with the authenticated user.

---

## Dashboard Statistics

```http
GET /api/quiz/dashboard-stats
```

Requires authentication.

Example:

```json
{
  "quizzes_taken": 10,
  "average_score": 65,
  "best_score": 100
}
```

---

# 🗄️ Database

The application uses PostgreSQL.

Main tables:

```text
users
quizzes
```

## Users

```text
users
├── id
├── name
├── email
├── password_hash
└── created_at
```

## Quizzes

```text
quizzes
├── id
├── user_id
├── topic
├── difficulty
├── question_count
├── score
├── percentage
└── created_at
```

The relationship is:

```text
User
 │
 │ 1
 │
 │
 │ *
 ▼
Quizzes
```

A user can have multiple quiz attempts.

---

# 🔐 Security

The project implements several security practices.

### Password Hashing

Passwords are never stored directly.

They are hashed using bcrypt:

```text
Plain Password
      │
      ▼
    bcrypt
      │
      ▼
Password Hash
      │
      ▼
 PostgreSQL
```

---

### JWT Authentication

After successful login, the backend generates a JWT access token.

The Angular application stores the token and sends it with protected requests.

```http
Authorization: Bearer <token>
```

---

### Angular Route Guards

Protected pages require authentication.

Examples:

```text
/dashboard
/quiz
/result
/history
```

Unauthenticated users are redirected to:

```text
/login
```

---

### HTTP Interceptor

The Angular HTTP interceptor automatically attaches the JWT token to authenticated API requests.

```text
Angular Request
      │
      ▼
Auth Interceptor
      │
      ▼
Add Authorization Header
      │
      ▼
FastAPI
```

---

### Environment Variables

Secrets such as:

- OpenRouter API key
- JWT secret

are stored in environment files and excluded from Git.

Sensitive environment files are intentionally ignored by `.gitignore`.

---

# ⚙️ Environment Configuration

Create:

```text
backend/.env
```

Example:

```env
OPENROUTER_API_KEY=your-openrouter-api-key

DATABASE_URL=postgresql://postgres:postgres@localhost:5433/ai_quiz_db

JWT_SECRET_KEY=your-long-random-secret-key
```

For Docker, the backend uses:

```text
backend/.env.docker
```

Docker uses the PostgreSQL service name:

```env
DATABASE_URL=postgresql://postgres:postgres@ai-quiz-postgres:5432/ai_quiz_db
```

> Never commit real API keys, JWT secrets, database passwords, or `.env` files to GitHub.

---

# 💻 Local Development

## Prerequisites

Install:

- Node.js
- npm
- Angular CLI
- Python
- PostgreSQL
- Git
- OpenRouter API key

Optional:

- Docker Desktop

---

# 🚀 Backend Setup

Navigate to the backend:

```powershell
cd backend
```

Create a virtual environment:

```powershell
python -m venv venv
```

Activate it:

```powershell
venv\Scripts\activate
```

Install dependencies:

```powershell
pip install -r requirements.txt
```

Create:

```text
backend/.env
```

Configure the environment variables.

Start FastAPI:

```powershell
uvicorn main:app --reload --port 8001
```

Backend:

```text
http://localhost:8001
```

Swagger API documentation:

```text
http://localhost:8001/docs
```

---

# 🎨 Frontend Setup

Open a second terminal.

Navigate to:

```powershell
cd frontend
```

Install dependencies:

```powershell
npm install
```

Start Angular:

```powershell
ng serve
```

Open:

```text
http://localhost:4200
```

---

# 🐳 Docker Setup

The project supports running the complete application with Docker Compose.

The application contains three containers:

```text
┌─────────────────────────────┐
│ Angular + Nginx             │
│ localhost:4200              │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ FastAPI                     │
│ localhost:8001              │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ PostgreSQL 18               │
│ localhost:5433              │
└─────────────────────────────┘
```

---

## Start the Application

From the project root:

```powershell
docker compose up --build -d
```

Check the containers:

```powershell
docker compose ps
```

Expected services:

```text
ai-quiz-frontend
ai-quiz-backend
ai-quiz-postgres
```

---

## Access the Application

Frontend:

```text
http://localhost:4200
```

Backend:

```text
http://localhost:8001
```

Swagger:

```text
http://localhost:8001/docs
```

---

## Stop Containers

```powershell
docker compose down
```

---

## Stop Containers and Remove Volumes

⚠️ This removes the PostgreSQL Docker volume and therefore database data.

```powershell
docker compose down -v
```

Use this only when you intentionally want to remove the database volume.

---

# 🐳 Docker Architecture

```text
                Docker Compose
                     │
        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            ▼
   Frontend      Backend      PostgreSQL
   Nginx         FastAPI       PostgreSQL 18
      │             │              │
      │             │              │
   Port 4200     Port 8001      Port 5433
```

---

# 🧪 API Testing

FastAPI provides interactive Swagger documentation.

Open:

```text
http://localhost:8001/docs
```

From Swagger you can test:

```text
POST /api/auth/register
POST /api/auth/login
POST /api/quiz/generate
POST /api/quiz/save
GET  /api/quiz/history
GET  /api/quiz/dashboard-stats
```

Authentication can be tested using the JWT token returned from login.

---

# 🔄 Development Workflow

A typical development workflow for this project is:

```text
1. Start PostgreSQL
       ↓
2. Start FastAPI
       ↓
3. Start Angular
       ↓
4. Login/Register
       ↓
5. Generate Quiz
       ↓
6. Take Quiz
       ↓
7. View Result
       ↓
8. Save Quiz
       ↓
9. View Dashboard
       ↓
10. View Quiz History
```

---

# 📦 Docker Images

The project contains separate Docker images for the frontend and backend.

### Backend

```text
ai-quiz-backend
```

### Frontend

```text
ai-quiz-frontend
```

PostgreSQL uses the official:

```text
postgres:18
```

Docker Compose orchestrates all three services.

---

# 🧠 AI Integration

The application integrates AI through OpenRouter.

The backend sends structured quiz-generation requests to the AI provider.

The expected response contains:

```json
{
  "topic": "Python",
  "difficulty": "Easy",
  "questions": [
    {
      "question": "What is Python?",
      "options": [
        "A programming language",
        "A database",
        "An operating system",
        "A browser"
      ],
      "correct_answer": "A programming language",
      "explanation": "Python is a high-level programming language."
    }
  ]
}
```

This structured response is then consumed by the Angular application.

---

# 📈 Application Data Flow

```text
                    USER
                      │
                      ▼
              Angular Interface
                      │
                      ▼
                FastAPI REST API
                      │
          ┌───────────┴───────────┐
          │                       │
          ▼                       ▼
     OpenRouter AI           PostgreSQL
          │                       │
          │                       │
          └───────────┬───────────┘
                      │
                      ▼
                Angular UI
                      │
                      ▼
             Quiz / Result /
          Dashboard / History
```

---

# 🧩 Key Technical Concepts Demonstrated

This project demonstrates practical experience with:

### Angular

- Components
- Services
- Signals
- Routing
- Route Guards
- HTTP Interceptors
- HttpClient
- Reactive UI
- SSR-safe browser APIs
- Responsive UI
- TypeScript

### Python

- FastAPI
- REST APIs
- Pydantic models
- SQLAlchemy
- Dependency injection
- Authentication
- JWT
- Password hashing
- Environment configuration

### Database

- PostgreSQL
- SQL
- Foreign keys
- Relationships
- CRUD operations
- Database queries
- ORM with SQLAlchemy

### AI

- LLM API integration
- Prompt-based quiz generation
- Structured AI responses
- AI-powered application workflow

### DevOps

- Docker
- Dockerfiles
- Docker Compose
- Multi-container architecture
- Nginx
- Environment configuration

### Git

- Git repository management
- Branches
- Commits
- Remote repositories
- GitHub

---

# 🧪 Example User Journey

```text
1. User opens the application
          ↓
2. User creates an account
          ↓
3. User logs in
          ↓
4. User opens Quiz Generator
          ↓
5. User selects:
      Topic → Python
      Difficulty → Easy
      Questions → 5
          ↓
6. Angular sends request to FastAPI
          ↓
7. FastAPI requests quiz from AI
          ↓
8. AI returns generated questions
          ↓
9. User takes the quiz
          ↓
10. Application calculates score
          ↓
11. User views detailed results
          ↓
12. Quiz attempt is saved
          ↓
13. User can view it in Quiz History
          ↓
14. Dashboard statistics are updated
```

---

# 📌 Current Project Status

| Feature | Status |
|---|---|
| Angular frontend | ✅ Complete |
| FastAPI backend | ✅ Complete |
| AI quiz generation | ✅ Complete |
| PostgreSQL integration | ✅ Complete |
| User registration | ✅ Complete |
| User login | ✅ Complete |
| JWT authentication | ✅ Complete |
| Password hashing | ✅ Complete |
| Route guards | ✅ Complete |
| HTTP interceptor | ✅ Complete |
| Interactive quiz | ✅ Complete |
| Quiz result | ✅ Complete |
| Question explanations | ✅ Complete |
| Quiz history | ✅ Complete |
| Dashboard | ✅ Complete |
| Docker backend | ✅ Complete |
| Docker frontend | ✅ Complete |
| Docker PostgreSQL | ✅ Complete |
| Docker Compose | ✅ Complete |
| GitHub repository | ✅ Complete |
| Production deployment | 🚧 Planned |
| CI/CD | 🚧 Planned |
| Automated tests | 🚧 Planned |

---

# 🚧 Future Improvements

Potential future improvements include:

- Production deployment
- CI/CD pipeline
- Automated unit tests
- Integration testing
- Refresh token authentication
- Password reset
- Email verification
- User profile management
- Admin dashboard
- Quiz categories
- Difficulty analytics
- Performance charts
- Leaderboards
- More AI model providers
- Question bank
- Timed quizzes
- Quiz sharing
- Export quiz results
- Production Nginx reverse proxy
- Cloud database
- Monitoring and logging

---

# 🎯 Why This Project?

The goal of this project is to demonstrate how a modern full-stack AI application can be designed and implemented using multiple technologies.

The project combines:

```text
Frontend Development
        +
Backend Development
        +
AI Integration
        +
Database
        +
Authentication
        +
Docker
        +
GitHub
```

This provides practical experience across the complete application development lifecycle.

---

# 📚 Learning Outcomes

Through this project, the following areas are demonstrated:

- Building a modern Angular application
- Developing REST APIs with FastAPI
- Integrating AI APIs into applications
- Designing PostgreSQL database schemas
- Implementing JWT authentication
- Secure password storage
- Connecting frontend and backend applications
- Managing authenticated API requests
- Containerizing applications with Docker
- Running multi-container applications with Docker Compose
- Managing source code with Git
- Publishing projects on GitHub

---

# 🚀 Future Deployment

The planned production architecture is:

```text
                    Internet
                       │
                       ▼
                ┌─────────────┐
                │   Nginx /   │
                │   Reverse   │
                │    Proxy    │
                └──────┬──────┘
                       │
          ┌────────────┴────────────┐
          │                         │
          ▼                         ▼
     Angular App               FastAPI API
                                    │
                       ┌────────────┴────────────┐
                       │                         │
                       ▼                         ▼
                  PostgreSQL                OpenRouter
                   Database                    AI
```

Production deployment will be added in a future iteration.

---

# 📄 License

This project is currently available for portfolio and educational purposes.

A formal open-source license can be added in the future if required.

---

# 👨‍💻 Author

## Aden Raj

**Frontend / Full Stack Developer**

Specializing in:

- Angular
- React
- TypeScript
- JavaScript
- Python
- FastAPI
- AI / GenAI
- REST APIs
- PostgreSQL
- Docker

---

## ⭐ GitHub

If you find this project interesting, consider giving the repository a ⭐.

**Repository:**

https://github.com/Aden-Raj/ai-quiz-generator

---

# 📬 Contact

For professional opportunities, collaborations, or technical discussions, feel free to connect through GitHub or LinkedIn.

---

## ⭐ Built with Angular + FastAPI + AI

```text
Angular 21
     +
FastAPI
     +
OpenRouter AI
     +
PostgreSQL
     +
Docker
     =
AI Quiz Generator 🚀
```