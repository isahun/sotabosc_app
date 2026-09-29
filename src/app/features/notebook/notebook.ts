import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { Entry } from '../../core/models/entry';
import { EntryService } from '../../core/services/entry.service';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-notebook',
  imports: [RouterLink, DatePipe],
  templateUrl: './notebook.html',
  styleUrl: './notebook.css',
})
export class Notebook {
  private entryService = inject(EntryService);
  showWritingOptions = false;
  private cdr = inject(ChangeDetectorRef);

  entries: Entry[] = [];

  async ngOnInit() {
    this.entries = (await this.entryService.getEntries()).sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime(),
    );

    this.cdr.detectChanges();
  }

  deleteEntry(entryToDelete: Entry) {
    const isConfirmed = confirm("Segur que vols eliminar l'entrada?");

    if (isConfirmed) {
      this.entryService.deleteEntry(entryToDelete);

      const updatedEntries = this.entries.filter(
        (entry) => entry.id !== entryToDelete.id,
      );

      this.entries = updatedEntries;
    }
  }
}
