import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { prompts } from '../../core/data/prompts';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private router = inject(Router);

  surpriseMe() {
    const randomIndex = Math.floor(
      Math.random() * prompts.length,
    );

    const prompt = prompts[randomIndex];

    this.router.navigate(['spark'], {
      queryParams: {
        promptId: prompt.id,
      },
    });
  }

}
