import { Component, inject, signal, PLATFORM_ID} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink  } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-home',
  imports: [FormsModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  

  private apiService = inject(ApiService);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  authService = inject(AuthService);

  topic = 'Python';
  difficulty = 'Easy';
  questionCount = 5;
  questionType = 'multiple_choice';

  loading = signal(false);
  errorMessage = signal('');

logout(): void {
  this.authService.logout();
  this.router.navigate(['/']);
}

  generateQuiz(): void {

    if (!this.authService.isLoggedIn()) {
    this.router.navigate(['/login']);
    return;
  }

    this.loading.set(true);
    this.errorMessage.set('');

    const request = {
      topic: this.topic,
      difficulty: this.difficulty,
      question_count: this.questionCount,
      question_type: this.questionType
    };

    this.apiService.generateQuiz(request).subscribe({

      next: (response) => {

        console.log('Quiz generated:', response);

        /*
         * Temporarily store the generated quiz.
         * Later we'll replace this with a proper QuizState service.
         */
      if (isPlatformBrowser(this.platformId)) {  
        sessionStorage.setItem(
          'currentQuiz',
          JSON.stringify(response)
        );
      }

        this.loading.set(false);

        this.router.navigate(['/quiz']);
      },

      error: (error) => {

        console.error('Quiz generation failed:', error);

        this.errorMessage.set(
          'Failed to generate quiz. Please try again.'
        );

        this.loading.set(false);
      }

    });
  }
}