import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {

  private http = inject(HttpClient);

  private router = inject(Router);

  private readonly apiUrl = ''; 


  name = '';

  email = '';

  password = '';

  loading = signal(false);

  errorMessage = signal('');

  successMessage = signal('');


  register(): void {

    if (
      !this.name ||
      !this.email ||
      !this.password
    ) {

      this.errorMessage.set(
        'Please fill in all fields.'
      );

      return;
    }


    this.loading.set(true);

    this.errorMessage.set('');

    this.successMessage.set('');


    this.http.post(
      `${this.apiUrl}/api/auth/register`,
      {
        name: this.name,
        email: this.email,
        password: this.password
      }
    )
    .subscribe({

      next: () => {

        this.loading.set(false);

        this.successMessage.set(
          'Account created successfully!'
        );


        setTimeout(() => {

          this.router.navigate([
            '/login'
          ]);

        }, 1000);

      },


      error: (error) => {

        console.error(
          'Registration failed:',
          error
        );

        this.loading.set(false);

        this.errorMessage.set(
          error.error?.message ||
          'Registration failed. Please try again.'
        );

      }

    });

  }

}