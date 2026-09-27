import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Category, Prompt } from '../../core/models/prompt';
import { prompts } from '../../core/data/prompts';
import { tagLabels, categoryLabels } from '../../core/utils/tag-labels';

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
  tagLabels = tagLabels;
  categoryLabels = categoryLabels;
  selectedTag?: string;

  availableTags = Object.keys(tagLabels);

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
    let promptPool = this.categoryPrompts.length > 0 ? this.categoryPrompts : prompts;

    if(this.selectedTag) {
      promptPool = promptPool.filter((prompt) => prompt.tags.includes(this.selectedTag!));
    }

    if (promptPool.length === 0) {
      this.prompt = undefined;
      return;
    }

    if (promptPool.length === 1) {
      this.prompt = promptPool[0];
      return;
    }

    const availablePrompts = promptPool.filter(
      (prompt) => prompt.id !== this.prompt?.id,
    );

    const randomIndex = Math.floor(Math.random() * availablePrompts.length);
    this.prompt = availablePrompts[randomIndex];
  }

  selectTag(tag: string) {
    this.selectedTag = this.selectedTag === tag ? undefined : tag;
    this.getRandomPrompt();
  }

  clearTag() {
    this.selectedTag = undefined;
    this.getRandomPrompt();
  }
}
