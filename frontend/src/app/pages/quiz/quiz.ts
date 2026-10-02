import { Component, inject, signal, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import {
  ApiService,
  QuizResponse,
  Question
} from '../../services/api.service';

@Component({
  selector: 'app-quiz',
  imports: [],
  templateUrl: './quiz.html',
  styleUrl: './quiz.scss'
})
export class Quiz {

  quiz = signal<QuizResponse | null>(null);
  private platformId = inject(PLATFORM_ID);

  currentQuestionIndex = signal(0);
  selectedAnswer = signal('');

  score = signal(0);
  quizCompleted = signal(false);

  userAnswers = signal<string[]>([]);
  private apiService = inject(ApiService);

  constructor(private router: Router) {

  if (isPlatformBrowser(this.platformId)) {

    const storedQuiz =
      sessionStorage.getItem('currentQuiz');

    if (storedQuiz) {

      const quizData: QuizResponse =
        JSON.parse(storedQuiz);

      this.quiz.set(quizData);

      this.userAnswers.set(
        new Array(quizData.questions.length).fill('')
      );

    } else {

      // No quiz available
      this.router.navigate(['/']);

    }
  }
}


  selectAnswer(answer: string): void {

    this.selectedAnswer.set(answer);

    const index = this.currentQuestionIndex();

    this.userAnswers.update(answers => {

      const updatedAnswers = [...answers];

      updatedAnswers[index] = answer;

      return updatedAnswers;

    });
  }


  nextQuestion(): void {

  const currentQuiz = this.quiz();

  if (!currentQuiz || !this.selectedAnswer()) {
    return;
  }

  const index = this.currentQuestionIndex();

  const currentQuestion =
    currentQuiz.questions[index];

  const isCorrect =
    this.selectedAnswer() ===
    currentQuestion.correct_answer;

  const updatedScore =
    this.score() + (isCorrect ? 1 : 0);

  this.score.set(updatedScore);

  if (
    index <
    currentQuiz.questions.length - 1
  ) {

    this.currentQuestionIndex.update(
      index => index + 1
    );

    this.selectedAnswer.set(
      this.userAnswers()[index + 1] || ''
    );

    return;
  }


  // ==========================================
  // QUIZ FINISHED
  // ==========================================

  this.quizCompleted.set(true);

  if (isPlatformBrowser(this.platformId)) {

  sessionStorage.setItem(
    'quizScore',
    updatedScore.toString()
  );

  sessionStorage.setItem(
    'quizAnswers',
    JSON.stringify(this.userAnswers())
  );

}


  // ==========================================
  // SAVE TO POSTGRESQL
  // ==========================================

  this.apiService.saveQuiz({

    topic: currentQuiz.topic,

    difficulty: currentQuiz.difficulty,

    question_count:
      currentQuiz.questions.length,

    score: updatedScore

  }).subscribe({

    next: (response) => {

      console.log(
        'Quiz saved to PostgreSQL:',
        response
      );

      this.router.navigate(['/result']);

    },

    error: (error) => {

      console.error(
        'Failed to save quiz:',
        error
      );

      // Don't block the user from seeing results
      this.router.navigate(['/result']);

    }

  });

}


  restartQuiz(): void {

    const currentQuiz = this.quiz();

    if (!currentQuiz) {
      return;
    }

    this.currentQuestionIndex.set(0);
    this.selectedAnswer.set('');
    this.score.set(0);
    this.quizCompleted.set(false);

    this.userAnswers.set(
      new Array(currentQuiz.questions.length).fill('')
    );

  }


  getCurrentQuestion(): Question | null {

    const currentQuiz = this.quiz();

    if (!currentQuiz) {
      return null;
    }

    return currentQuiz.questions[
      this.currentQuestionIndex()
    ];

  }


  getPercentage(): number {

    const currentQuiz = this.quiz();

    if (
      !currentQuiz ||
      currentQuiz.questions.length === 0
    ) {
      return 0;
    }

    return (
      this.score() /
      currentQuiz.questions.length
    ) * 100;

  }


  isSelected(answer: string): boolean {

    return this.selectedAnswer() === answer;

  }

}