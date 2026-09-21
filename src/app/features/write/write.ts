import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { prompts } from '../../core/data/prompts';
import { Prompt } from '../../core/models/prompt';

@Component({
  selector: 'app-write',
  imports: [],
  templateUrl: './write.html',
  styleUrl: './write.css',
})
export class Write {
  private route = inject(ActivatedRoute);

  prompt?: Prompt;

  ngOnInit() {
    const promptId = this.route.snapshot.queryParamMap.get('promptId');

    if(promptId) {
      this.prompt = prompts.find(
        (prompt) => prompt.id === Number(promptId),
      );
    }
  }
}
