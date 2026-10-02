import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

import {
  AuthService
} from '../../services/auth.service';


@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  private authService = inject(AuthService);

  private router = inject(Router);


  email = '';

  password = '';

  loading = signal(false);

  errorMessage = signal('');


  login(): void {

    if (!this.email || !this.password) {

      this.errorMessage.set(
        'Please enter your email and password.'
      );

      return;
    }


    this.loading.set(true);

    this.errorMessage.set('');


    this.authService.login({
      email: this.email,
      password: this.password
    })
    .subscribe({

      next: () => {

        this.loading.set(false);

        this.router.navigate(['/dashboard']);

      },

      error: (error) => {

        console.error(
          'Login failed:',
          error
        );

        this.loading.set(false);

        this.errorMessage.set(
          error.error?.message ||
          'Invalid email or password.'
        );

      }

    });

  }
}