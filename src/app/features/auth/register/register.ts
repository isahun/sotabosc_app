import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  email = '';
  password = '';
  passwordConfirmation = '';
  errorMessage = '';

  async register() {
    this.errorMessage = '';

    if (this.password !== this.passwordConfirmation) {
      this.errorMessage = 'Les contrasenyes no coincideixen.';
      return;
    }

    const { error } = await this.auth.register(
      this.email,
      this.password,
    );

    if (error) {
      this.errorMessage = error.message;
      return;
    }

    this.router.navigate(['/']);
  }
}
