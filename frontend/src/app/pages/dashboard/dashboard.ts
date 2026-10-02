import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import {
  ApiService,
  DashboardStats,
  QuizHistory
} from '../../services/api.service';

import { AuthService } from '../../services/auth.service';
import {
  isPlatformBrowser
} from '@angular/common';

import {
  PLATFORM_ID
} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {

  private apiService = inject(ApiService);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  authService = inject(AuthService);

  stats = signal<DashboardStats | null>(null);
  recentQuizzes = signal<QuizHistory[]>([]);

  loading = signal(true);

  errorMessage = signal('');

  ngOnInit(): void {

  if (isPlatformBrowser(this.platformId)) {

    this.loadDashboardStats();
    this.loadRecentQuizzes();

  }

}

  loadDashboardStats(): void {

    this.loading.set(true);
    this.errorMessage.set('');

    this.apiService.getDashboardStats().subscribe({

      next: (response) => {

        console.log(
          'Dashboard stats:',
          response
        );

        this.stats.set(response);

        this.loading.set(false);

      },

      error: (error) => {

        console.error(
          'Failed to load dashboard stats:',
          error
        );

        this.errorMessage.set(
          'Failed to load dashboard statistics.'
        );

        this.loading.set(false);

      }

    });

  }

  loadRecentQuizzes(): void {

  this.apiService.getQuizHistory().subscribe({

    next: (response) => {

      console.log(
        'Recent quizzes:',
        response
      );

      this.recentQuizzes.set(
        response.slice(0, 3)
      );

    },

    error: (error) => {

      console.error(
        'Failed to load recent quizzes:',
        error
      );

    }

  });

}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
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

}