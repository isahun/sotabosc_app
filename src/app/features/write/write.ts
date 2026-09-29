import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { prompts } from '../../core/data/prompts';
import { Prompt } from '../../core/models/prompt';
import { FormsModule } from '@angular/forms';
import { Entry } from '../../core/models/entry';
import { EntryService } from '../../core/services/entry.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-write',
  imports: [FormsModule, RouterLink],
  templateUrl: './write.html',
  styleUrl: './write.css',
})
export class Write {
  private route = inject(ActivatedRoute);
  private entryService = inject(EntryService);
  private router = inject(Router);
  location = inject(Location);
  private cdr = inject(ChangeDetectorRef);

  prompt?: Prompt;
  title = '';
  content = '';
  errorMessage = '';

  entry?: Entry;
  isEditing = false;
  cancelRoute: string | (string | number)[] = '/notebook';

  async ngOnInit() {
    const promptId = this.route.snapshot.queryParamMap.get('promptId');
    const entryId = this.route.snapshot.queryParamMap.get('entryId');

    if (entryId) {
      this.entry = await this.entryService.getEntryById(Number(entryId));

      this.title = this.entry?.title ?? '';
      this.content = this.entry?.content ?? '';
      this.prompt = this.entry?.prompt;
      this.isEditing = true;
      this.cancelRoute = ['/notebook', this.entry!.id];

      this.cdr.detectChanges();
    }

    if (promptId) {
      this.prompt = prompts.find((prompt) => prompt.id === Number(promptId));
    }
  }

  async saveEntry() {
    if (!this.content.trim()) {
      this.errorMessage = 'Escriu alguna cosa abans de guardar.';
      return;
    }

    const entry: Entry = {
      id: Date.now(),
      title: this.title,
      content: this.content,
      prompt: this.prompt,
      createdAt: new Date().toISOString(),
      lastUpdate: null,
    };

    const savedEntry = await this.entryService.saveEntry(entry);

    if (!savedEntry) {
      this.errorMessage = "No s'ha pogut guardar l'entrada.";
      return;
    }

    this.router.navigate(['notebook', savedEntry.id]);
  }

  updateEntry(entryToUpdate: Entry) {
    if (!this.content.trim()) {
      this.errorMessage = 'Escriu alguna cosa abans de guardar.';
      return;
    }

    const updatedEntry: Entry = {
      id: entryToUpdate.id,
      title: this.title,
      content: this.content,
      prompt: entryToUpdate.prompt,
      createdAt: entryToUpdate.createdAt,
      lastUpdate: new Date().toISOString(),
    };

    this.entryService.updateEntry(updatedEntry);

    this.router.navigate(['notebook', updatedEntry.id]);
  }
}
