import { Component, inject } from '@angular/core';
import { Entry } from '../../core/models/entry';
import { EntryService } from '../../core/services/entry.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-notebook',
  imports: [RouterLink],
  templateUrl: './notebook.html',
  styleUrl: './notebook.css',
})
export class Notebook {
  private entryService = inject(EntryService);

  entries: Entry[] = [];

  ngOnInit() {
    this.entries = this.entryService.getEntries();
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
