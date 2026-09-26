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
    const promptId = this.route.snapshot.queryParamMap.get('promptId');
    const category = this.route.snapshot.queryParamMap.get('category') as Category;

    if (promptId) {
      this.prompt = prompts.find((prompt) => prompt.id === Number(promptId));
      return;
    }

    this.categoryPrompts = prompts.filter((prompt) => prompt.categories.includes(category));

    this.getRandomPrompt();
  }
  getRandomPrompt() {
    const promptPool = this.categoryPrompts.length > 0 ? this.categoryPrompts : prompts;

    if (promptPool.length <= 1) {
      this.prompt = promptPool[0];
      return;
    }

    const availablePrompts = promptPool.filter((prompt) => prompt.id !== this.prompt?.id);

    const randomIndex = Math.floor(Math.random() * availablePrompts.length);
    this.prompt = availablePrompts[randomIndex];
  }
}
