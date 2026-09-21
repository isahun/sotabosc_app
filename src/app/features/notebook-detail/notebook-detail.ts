import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EntryService } from '../../core/services/entry.service';
import { Entry } from '../../core/models/entry';

@Component({
  selector: 'app-notebook-detail',
  imports: [RouterLink],
  templateUrl: './notebook-detail.html',
  styleUrl: './notebook-detail.css',
})
export class NotebookDetail {
  private route = inject(ActivatedRoute);
  private entryService = inject(EntryService);

  entry?: Entry;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if(id) {
      const entries = this.entryService.getEntries();

      this.entry = entries.find(
        (entry) => entry.id === Number(id),
      );
    }
  }
}
