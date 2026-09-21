import { Component, inject } from '@angular/core';
import { Entry } from '../../core/models/entry';
import { EntryService } from '../../core/services/entry.service';

@Component({
  selector: 'app-notebook',
  imports: [],
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
