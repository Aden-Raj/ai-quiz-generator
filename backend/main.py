from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import get_db


from models import (
    Quiz,
    QuizRequest,
    QuizResponse,
    QuizSaveRequest,
    RegisterRequest,
    LoginRequest,
    User,
    DashboardStatsResponse
)
from services.auth_dependency import get_current_user_id
from services.ai_service import generate_quiz
from services.auth_service import (
    hash_password,
    verify_password,
    create_access_token
)


app = FastAPI(
    title="AI Quiz Generator API",
    description="Backend API for the AI Quiz Generator",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:4200",
        "http://127.0.0.1:4200"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "AI Quiz Generator API is running"}


@app.get("/api/health")
def health_check():
    return {"status": "healthy"}


@app.post("/api/quiz/generate", response_model=QuizResponse)
def generate_quiz_endpoint(request: QuizRequest):
    return generate_quiz(request)

@app.post("/api/quiz/save")
def save_quiz(
    request: QuizSaveRequest,
    db: Session = Depends(get_db),
    current_user_id: int = Depends(get_current_user_id)
):

    percentage = (
        request.score / request.question_count
    ) * 100

    quiz = Quiz(
        user_id=current_user_id,
        topic=request.topic,
        difficulty=request.difficulty,
        question_count=request.question_count,
        score=request.score,
        percentage=percentage
    )

    db.add(quiz)
    db.commit()
    db.refresh(quiz)

    return {
        "message": "Quiz saved successfully",
        "quiz_id": quiz.id
    }

@app.get("/api/quiz/history")
def get_quiz_history(
    db: Session = Depends(get_db),
    current_user_id: int = Depends(get_current_user_id)
):

    quizzes = (
        db.query(Quiz)
        .filter(Quiz.user_id == current_user_id)
        .order_by(Quiz.created_at.desc())
        .all()
    )

    return [
        {
            "id": quiz.id,
            "topic": quiz.topic,
            "difficulty": quiz.difficulty,
            "question_count": quiz.question_count,
            "score": quiz.score,
            "percentage": quiz.percentage,
            "created_at": quiz.created_at
        }
        for quiz in quizzes
    ]

@app.post("/api/auth/register")
def register_user(
    request: RegisterRequest,
    db: Session = Depends(get_db)
):

    # Check if email already exists

    existing_user = (
        db.query(User)
        .filter(User.email == request.email)
        .first()
    )

    if existing_user:

        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered"
    )


    # Hash password

    password_hash = hash_password(
        request.password
    )


    # Create user

    user = User(
        name=request.name,
        email=request.email,
        password_hash=password_hash
    )


    db.add(user)

    db.commit()

    db.refresh(user)


    return {
        "message": "User registered successfully",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
    }

@app.post("/api/auth/login")
def login_user(
    request: LoginRequest,
    db: Session = Depends(get_db)
):

    # Find user by email

    user = (
        db.query(User)
        .filter(User.email == request.email)
        .first()
    )

    if not user:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
    )

    # Verify password

    password_valid = verify_password(
        request.password,
        user.password_hash
    )

    if not password_valid:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
    )


    # Create JWT token

    access_token = create_access_token({
        "sub": str(user.id),
        "email": user.email
    })


    return {
        "message": "Login successful",

        "access_token": access_token,

        "token_type": "bearer",

        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
    }

@app.get(
    "/api/dashboard/stats",
    response_model=DashboardStatsResponse
)
def get_dashboard_stats(
    db: Session = Depends(get_db),
    current_user_id: int = Depends(get_current_user_id)
):
    quizzes = (
        db.query(Quiz)
        .filter(
            Quiz.user_id == current_user_id
        )
        .all()
    )

    quizzes_taken = len(quizzes)

    if quizzes_taken == 0:
        return DashboardStatsResponse(
            quizzes_taken=0,
            average_score=0,
            best_score=0
        )

    average_score = (
        sum(
            quiz.percentage
            for quiz in quizzes
        )
        / quizzes_taken
    )

    best_score = max(
        quiz.percentage
        for quiz in quizzes
    )

    return DashboardStatsResponse(
        quizzes_taken=quizzes_taken,
        average_score=round(
            average_score,
            1
        ),
        best_score=round(
            best_score,
            1
        )
    )