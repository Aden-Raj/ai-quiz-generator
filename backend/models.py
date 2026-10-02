from datetime import datetime

from pydantic import BaseModel, Field

from sqlalchemy import DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from database import Base


# ============================================================
# PYDANTIC MODELS
# ============================================================

class QuizRequest(BaseModel):
    topic: str
    difficulty: str
    question_count: int
    question_type: str


class Question(BaseModel):
    question: str
    options: list[str]
    correct_answer: str
    explanation: str


class QuizResponse(BaseModel):
    topic: str
    difficulty: str
    questions: list[Question]


class QuizSaveRequest(BaseModel):
    topic: str
    difficulty: str
    question_count: int = Field(gt=0)
    score: int = Field(ge=0)


# ============================================================
# AUTH PYDANTIC MODELS
# ============================================================

class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str


class UserResponse(BaseModel):
    id: int
    name: str
    email: str


# ============================================================
# SQLALCHEMY DATABASE MODELS
# ============================================================

class User(Base):

    __tablename__ = "users"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    name: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        index=True,
        nullable=False
    )

    password_hash: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )


class Quiz(Base):

    __tablename__ = "quizzes"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False,
        index=True
    )

    topic: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    difficulty: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )

    question_count: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    score: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    percentage: Mapped[float] = mapped_column(
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

class DashboardStatsResponse(BaseModel):
    quizzes_taken: int
    average_score: float
    best_score: float