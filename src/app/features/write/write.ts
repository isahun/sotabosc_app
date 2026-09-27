import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  private router = inject(Router);

  prompt?: Prompt;
  title = '';
  content = '';
  entry?: Entry;
  isEditing = false;

  ngOnInit() {
    const promptId = this.route.snapshot.queryParamMap.get('promptId');
    const entryId = this.route.snapshot.queryParamMap.get('entryId');

    if (entryId) {
      const entries = this.entryService.getEntries();

      this.entry = entries.find((entry) => entry.id === Number(entryId));

      this.title = this.entry?.title ?? '';
      this.content = this.entry?.content ?? '';
      this.prompt = this.entry?.prompt;
      this.isEditing = true;
    }

    if (promptId) {
      this.prompt = prompts.find((prompt) => prompt.id === Number(promptId));
    }
  }

  saveEntry() {
    const entry: Entry = {
      id: Date.now(),
      title: this.title,
      content: this.content,
      prompt: this.prompt,
      createdAt: new Date().toISOString(),
      lastUpdate: null,
    };

    this.entryService.saveEntry(entry);
  }

  updateEntry(entryToUpdate: Entry) {

    const updatedEntry: Entry = {
      id: entryToUpdate.id,
      title: this.title,
      content: this.content,
      prompt: entryToUpdate.prompt,
      createdAt: entryToUpdate.createdAt,
      lastUpdate: new Date().toISOString(),
    }

    this.entryService.updateEntry(updatedEntry);

    this.router.navigate(['notebook', updatedEntry.id])

  }
}
