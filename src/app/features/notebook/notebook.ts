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
}
