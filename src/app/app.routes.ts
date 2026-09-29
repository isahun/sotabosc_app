import { Routes } from '@angular/router';
import { AppShell } from './shared/components/layout/app-shell/app-shell';
import { Home } from './features/home/home';
import { Spark } from './features/spark/spark';
import { Write } from './features/write/write';
import { Notebook } from './features/notebook/notebook';
import { NotebookDetail } from './features/notebook-detail/notebook-detail';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: AppShell,
    children: [
      {
        path: 'auth/login',
        component: Login,
      },
      {
        path: 'auth/register',
        component: Register,
      },
      {
        path: '',
        component: Home,
      },
      {
        path: 'spark',
        component: Spark,
      },
      {
        path: 'write',
        component: Write,
      },
      {
        path: 'notebook',
        component: Notebook,
      },
      {
        path: 'notebook/:id',
        component: NotebookDetail,
      },
    ],
  },
];
