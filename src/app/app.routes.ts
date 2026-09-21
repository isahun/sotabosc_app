import { Routes } from '@angular/router';
import { AppShell } from './shared/components/layout/app-shell/app-shell';
import { Home } from './features/home/home';
import { Spark } from './features/spark/spark';

export const routes: Routes = [
  {
    path: '',
    component: AppShell,
    children: [
      {
        path: '',
        component: Home,
      },
      {
        path: 'spark',
        component: Spark,
      }
    ]
  }
];
