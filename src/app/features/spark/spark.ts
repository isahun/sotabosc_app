import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Category, Prompt } from '../../core/models/prompt';
import { prompts } from '../../core/data/prompts';

@Component({
  selector: 'app-spark',
  imports: [RouterLink],
  templateUrl: './spark.html',
  styleUrl: './spark.css',
})
export class Spark {
  private route = inject(ActivatedRoute);

  prompt?: Prompt;
  categoryPrompts: Prompt[] = [];

  ngOnInit() {
    const category = this.route.snapshot.queryParamMap.get('category') as Category;

    this.categoryPrompts = prompts.filter((prompt) => prompt.categories.includes(category));

    this.getRandomPrompt();
  }
  getRandomPrompt() {
    if (this.categoryPrompts.length <= 1) {
      this.prompt = this.categoryPrompts[0];
      return;
    }
    const availablePrompts = this.categoryPrompts.filter((prompt) => prompt.id !== this.prompt?.id);

    const randomIndex = Math.floor(Math.random() * availablePrompts.length);
    this.prompt = availablePrompts[randomIndex];
  }
}
