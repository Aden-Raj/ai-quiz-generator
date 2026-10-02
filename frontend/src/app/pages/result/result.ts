import { Component, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Question {
  question: string;
  options: string[];
  correct_answer: string;
  explanation: string;
}

interface QuizResponse {
  topic: string;
  difficulty: string;
  questions: Question[];
}

@Component({
  selector: 'app-result',
  imports: [RouterLink],
  templateUrl: './result.html',
  styleUrl: './result.scss'
})
export class Result {

  private platformId = inject(PLATFORM_ID);

  quiz = signal<QuizResponse | null>(null);
  score = signal(0);
  totalQuestions = signal(0);
  percentage = signal(0);
  correctAnswers = signal(0);
  wrongAnswers = signal(0);
  userAnswers = signal<string[]>([]);

  constructor() {

    if (isPlatformBrowser(this.platformId)) {

      const storedQuiz = sessionStorage.getItem('currentQuiz');
      const storedScore = sessionStorage.getItem('quizScore');
      const storedAnswers = sessionStorage.getItem('quizAnswers');

      if (storedQuiz) {

        const quizData: QuizResponse =
          JSON.parse(storedQuiz);

        this.quiz.set(quizData);

        this.totalQuestions.set(
          quizData.questions.length
        );
      }

      if (storedScore) {

        this.score.set(
          Number(storedScore)
        );
      }

      if (storedAnswers) {

        const answers: string[] =
          JSON.parse(storedAnswers);

        this.userAnswers.set(answers);
      }

      this.calculateResult();
    }
  }

  private calculateResult(): void {

    const quizData = this.quiz();

    if (!quizData) {
      return;
    }

    const questions = quizData.questions;
    const answers = this.userAnswers();

    let correct = 0;

    questions.forEach((question, index) => {

      if (
        answers[index] === question.correct_answer
      ) {
        correct++;
      }

    });

    const total = questions.length;

    this.correctAnswers.set(correct);
    this.wrongAnswers.set(total - correct);

    if (total > 0) {

      this.percentage.set(
        Math.round((correct / total) * 100)
      );

    }
  }

  getUserAnswer(index: number): string {
  return this.userAnswers()[index] || 'Not answered';
}

isCorrect(index: number): boolean {
  const quizData = this.quiz();

  if (!quizData) {
    return false;
  }

  return (
    this.userAnswers()[index] ===
    quizData.questions[index].correct_answer
  );
}
}