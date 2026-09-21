import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { prompts } from '../../core/data/prompts';
import { Prompt } from '../../core/models/prompt';
import { FormsModule } from '@angular/forms';
import { Entry } from '../../core/models/entry';
import { EntryService } from '../../core/services/entry.service';

@Component({
  selector: 'app-write',
  imports: [FormsModule],
  templateUrl: './write.html',
  styleUrl: './write.css',
})
export class Write {
  private route = inject(ActivatedRoute);
  private entryService = inject(EntryService);

  prompt?: Prompt;
  title = '';
  content = '';

  ngOnInit() {
    const promptId = this.route.snapshot.queryParamMap.get('promptId');

    if(promptId) {
      this.prompt = prompts.find(
        (prompt) => prompt.id === Number(promptId),
      );
    }
  }

  saveEntry() {
    const entry: Entry = {
      id: Date.now(),
      title: this.title,
      content: this.content,
      prompt: this.prompt,
      createdAt: new Date().toISOString(),
    }

    this.entryService.saveEntry(entry);
  }
}
