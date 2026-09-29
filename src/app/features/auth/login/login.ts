import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  email = '';
  password = '';
  errorMessage = '';

  async login() {
    this.errorMessage = '';

    const { error } = await this.auth.login(this.email, this.password);

    if (error) {
      this.errorMessage = error.message;
      return;
    }

    this.router.navigate(['/']);
  }
}
