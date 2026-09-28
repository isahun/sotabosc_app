import { Component, inject } from '@angular/core';
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

  entries: Entry[] = [];

  ngOnInit() {
    this.entries = this.entryService.getEntries()
    .sort(
      (a, b) =>
        new Date (b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }

  deleteEntry(entryToDelete: Entry) {
    const isConfirmed = confirm("Segur que vols eliminar l'entrada?");

    if (isConfirmed) {
      this.entryService.deleteEntry(entryToDelete);

      const updatedEntries = this.entries.filter((entry) => entry.id !== entryToDelete.id);

      this.entries = updatedEntries;
    }
  }
}
