import { Routes } from '@angular/router';
import { guestGuard } from './services/guest-guard';
import { Home } from './pages/home/home';
import { Quiz } from './pages/quiz/quiz';
import { Result } from './pages/result/result';
import { History } from './pages/history/history';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Dashboard } from './pages/dashboard/dashboard';

import { authGuard } from './services/auth-guard';


export const routes: Routes = [

  // Public routes

  {
    path: '',
    component: Home,
    title: 'AI Quiz Generator'
  },

  {
    path: 'login',
    component: Login,
    title: 'Login',
    canActivate: [guestGuard]
  },

  {
    path: 'register',
    component: Register,
    title: 'Create Account',
    canActivate: [guestGuard]
  },

  {
  path: 'dashboard',
  component: Dashboard,
  title: 'Dashboard',
  canActivate: [authGuard]
},


  // Protected routes

  {
    path: 'quiz',
    component: Quiz,
    title: 'Take Quiz',
    canActivate: [authGuard]
  },

  {
    path: 'result',
    component: Result,
    title: 'Quiz Result',
    canActivate: [authGuard]
  },

  {
    path: 'history',
    component: History,
    title: 'Quiz History',
    canActivate: [authGuard]
  },


  // Fallback

  {
    path: '**',
    redirectTo: ''
  }

];