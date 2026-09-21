import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category, Prompt } from '../../core/models/prompt';
import { prompts } from '../../core/data/prompts';

@Component({
  selector: 'app-spark',
  imports: [],
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
    const randomIndex = Math.floor(Math.random() * this.categoryPrompts.length);
    this.prompt = this.categoryPrompts[randomIndex];
  }
}

