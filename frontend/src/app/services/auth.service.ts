import { Injectable, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  access_token: string;
  token_type: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  private platformId = inject(PLATFORM_ID);

  private readonly apiUrl =
    'http://localhost:8001';


  login(
    request: LoginRequest
  ): Observable<LoginResponse> {

    return this.http
      .post<LoginResponse>(
        `${this.apiUrl}/api/auth/login`,
        request
      )
      .pipe(

        tap(response => {

          if (
            isPlatformBrowser(this.platformId)
          ) {

            localStorage.setItem(
              'access_token',
              response.access_token
            );

            localStorage.setItem(
              'user',
              JSON.stringify(response.user)
            );

          }

        })

      );
  }


  getToken(): string | null {

  if (
    !isPlatformBrowser(this.platformId)
  ) {
    return null;
  }

  return localStorage.getItem(
    'access_token'
  );
}


  logout(): void {

    if (
      typeof window === 'undefined'
    ) {
      return;
    }

    window.localStorage.removeItem(
      'access_token'
    );

    window.localStorage.removeItem(
      'user'
    );
  }

  getUser(): {
  id: number;
  name: string;
  email: string;
} | null {

  if (!isPlatformBrowser(this.platformId)) {
    return null;
  }

  const user = localStorage.getItem('user');

  if (!user) {
    return null;
  }

  return JSON.parse(user);
}

  isLoggedIn(): boolean {

    return !!this.getToken();

  }

}