import { Injectable } from '@angular/core';
import { Entry } from '../models/entry';

@Injectable({
  providedIn: 'root',
})
export class EntryService {
  private readonly storageKey = 'sotabosc-entries';

  saveEntry(entry: Entry): void {
    const entries = this.getEntries();

    entries.push(entry);

    localStorage.setItem(this.storageKey, JSON.stringify(entries));
  }

  getEntries(): Entry[] {
    const storedEntries = localStorage.getItem(this.storageKey);

    if(!storedEntries) {
      return [];
    }

    return JSON.parse(storedEntries);
  }
}
