import { Component, inject, signal, PLATFORM_ID } from '@angular/core';

import {
  ApiService,
  QuizHistory
} from '../../services/api.service';
import { DecimalPipe, isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-history',
  imports: [DecimalPipe],
  templateUrl: './history.html',
  styleUrl: './history.scss'
})
export class History {

  private apiService = inject(ApiService);
  private platformId = inject(PLATFORM_ID);

  history = signal<QuizHistory[]>([]);

  loading = signal(true);

  errorMessage = signal('');


  ngOnInit(): void {

  if (isPlatformBrowser(this.platformId)) {
    this.loadHistory();
  }

}


  loadHistory(): void {

    this.loading.set(true);

    this.errorMessage.set('');

    this.apiService.getQuizHistory().subscribe({

      next: (response) => {

        this.history.set(response);

        this.loading.set(false);

      },

      error: (error) => {

        console.error(
          'Failed to load quiz history:',
          error
        );

        this.errorMessage.set(
          'Failed to load quiz history.'
        );

        this.loading.set(false);

      }

    });

  }


  getDate(date: string): string {

    return new Date(date).toLocaleDateString(
      'en-IN',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }
    );

  }


  getScoreText(quiz: QuizHistory): string {

    return `${quiz.score}/${quiz.question_count}`;

  }

}