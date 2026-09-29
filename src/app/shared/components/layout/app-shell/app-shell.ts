import { Component, inject } from '@angular/core';
import { Router, RouterLinkActive, RouterLink, RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, RouterLinkActive, RouterLinkWithHref, RouterLink],
  templateUrl: './app-shell.html',
  styleUrl: './app-shell.css',
})
export class AppShell {
  auth = inject(AuthService);
  private readonly router = inject(Router);

  isAuthPage() {
    return this.router.url.startsWith('/auth');
  }
}
