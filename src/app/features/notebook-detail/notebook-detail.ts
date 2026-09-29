import { Component, inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
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
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  entry?: Entry;

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.entry = await this.entryService.getEntryById(Number(id));

      this.cdr.detectChanges();
    }
  }

  deleteEntry(entryToDelete: Entry) {
    const isConfirmed = confirm("Segur que vols eliminar l'entrada?");

    if (isConfirmed) {
      this.entryService.deleteEntry(entryToDelete);
      this.router.navigate(['/notebook']);
    }
  }
}
