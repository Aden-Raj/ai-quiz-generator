import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface QuizRequest {
  topic: string;
  difficulty: string;
  question_count: number;
  question_type: string;
}

export interface Question {
  question: string;
  options: string[];
  correct_answer: string;
  explanation: string;
}

export interface QuizResponse {
  topic: string;
  difficulty: string;
  questions: Question[];
}

export interface QuizSaveRequest {
  topic: string;
  difficulty: string;
  question_count: number;
  score: number;
}

export interface QuizHistory {
  id: number;
  topic: string;
  difficulty: string;
  question_count: number;
  score: number;
  percentage: number;
  created_at: string;
}

export interface DashboardStats {
  quizzes_taken: number;
  average_score: number;
  best_score: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:8001';

  getHealth() {
    return this.http.get<{ status: string }>(
      `${this.apiUrl}/api/health`
    );
  }

  generateQuiz(request: QuizRequest): Observable<QuizResponse> {
    return this.http.post<QuizResponse>(
      `${this.apiUrl}/api/quiz/generate`,
      request
    );
  }

  saveQuiz(request: QuizSaveRequest) {
  return this.http.post(
    `${this.apiUrl}/api/quiz/save`,
    request
  );
}

getQuizHistory(): Observable<QuizHistory[]> {
  return this.http.get<QuizHistory[]>(
    `${this.apiUrl}/api/quiz/history`
  );
}

getDashboardStats(): Observable<DashboardStats> {
  return this.http.get<DashboardStats>(
    `${this.apiUrl}/api/dashboard/stats`
  );
}
}