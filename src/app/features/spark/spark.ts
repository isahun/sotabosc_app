import { ChangeDetectorRef, Component, inject, OnDestroy } from '@angular/core';
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
export class Spark implements OnDestroy {
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  prompt?: Prompt;
  categoryPrompts: Prompt[] = [];
  tagLabels = tagLabels;
  categoryLabels = categoryLabels;
  selectedTag?: string;

  availableTags = Object.keys(tagLabels);

  timerSeconds = 0;
  timerRunning = false;
  timerInterval?: ReturnType<typeof setInterval>;
  timerStarted = false;

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

    if (this.selectedTag) {
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

    const availablePrompts = promptPool.filter((prompt) => prompt.id !== this.prompt?.id);

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

  startTimer() {
    if (!this.prompt?.duration) {
      return;
    }

    if (!this.timerStarted) {
      this.timerSeconds = this.prompt.duration * 60;
      this.timerStarted = true;
    }

    this.timerRunning = true;

    this.timerInterval = setInterval(() => {
      this.timerSeconds--;

      this.cdr.detectChanges();

      if (this.timerSeconds <= 0) {
        clearInterval(this.timerInterval);
        this.timerRunning = false;
        this.timerStarted = false;
      }
    }, 1000);
  }

  pauseTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    this.timerRunning = false;
  }

  resetTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    if (this.prompt?.duration) {
      this.timerSeconds = this.prompt.duration * 60;
      this.timerRunning = false;
      this.timerStarted = false;
    }
  }

  formatTime(): string {
    const minutes = Math.floor(this.timerSeconds / 60);
    const seconds = this.timerSeconds % 60;

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }
}
