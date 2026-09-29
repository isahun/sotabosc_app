import { Injectable, inject } from '@angular/core';
import { Entry } from '../models/entry';
import { AuthService } from '../auth/auth.service';
import { SupabaseService } from '../supabase.service';
import { prompts } from '../data/prompts';

@Injectable({
  providedIn: 'root',
})
export class EntryService {
  private readonly storageKey = 'sotabosc-entries';

  private readonly auth = inject(AuthService);
  private readonly supabase = inject(SupabaseService).client;

  async saveEntry(entry: Entry): Promise<Entry | undefined> {
    const user = this.auth.user();

    if (!user) {
      const entries = await this.getEntries();

      entries.push(entry);

      localStorage.setItem(this.storageKey, JSON.stringify(entries));
      return;
    }
    const { data, error } = await this.supabase
      .from('entries')
      .insert({
        user_id: user.id,
        title: entry.title,
        content: entry.content,
        prompt_id: entry.prompt?.id ?? null,
        created_at: entry.createdAt,
        last_update: entry.lastUpdate,
      })
      .select()
      .single();

    if (error) {
      console.error("Error guardant l'entrada:", error);
      return;
    }

    return {
      id: data.id,
      title: data.title,
      content: data.content,
      prompt: entry.prompt,
      createdAt: data.created_at,
      lastUpdate: data.last_update,
    };
  }

  async getEntries(): Promise<Entry[]> {
    await this.auth.ready;

    const user = this.auth.user();

    if (!user) {
      const storedEntries = localStorage.getItem(this.storageKey);

      if (!storedEntries) {
        return [];
      }

      return JSON.parse(storedEntries);
    }

    const { data, error } = await this.supabase
      .from('entries')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error carregant les entrades:', error);
      return [];
    }

    return data.map((entry) => ({
      id: Number(entry.id),
      title: entry.title,
      content: entry.content,
      prompt: entry.prompt_id ? prompts.find((prompt) => prompt.id === entry.prompt_id) : undefined,
      createdAt: entry.created_at,
      lastUpdate: entry.last_update,
    }));
  }

  async getEntryById(id: number): Promise<Entry | undefined> {
    await this.auth.ready;

    const user = this.auth.user();

    if (!user) {
      const entries = await this.getEntries();

      return entries.find((entry) => entry.id === id);
    }

    const { data, error } = await this.supabase
      .from('entries')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (error) {
      console.error("Error carregant l'entrada:", error);
      return;
    }

    return {
      id: Number(data.id),
      title: data.title,
      content: data.content,
      prompt: data.prompt_id ? prompts.find((prompt) => prompt.id === data.prompt_id) : undefined,
      createdAt: data.created_at,
      lastUpdate: data.last_update,
    };
  }

  async deleteEntry(entryToDelete: Entry): Promise<void> {
    const user = this.auth.user();

    if (!user) {
      const storedEntries = await this.getEntries();

      const updatedEntries = storedEntries.filter((entry) => entry.id !== entryToDelete.id);

      localStorage.setItem(this.storageKey, JSON.stringify(updatedEntries));
      return;
    }

    const { error } = await this.supabase
      .from('entries')
      .delete()
      .eq('id', entryToDelete.id)
      .eq('user_id', user.id);

    if (error) {
      console.error("Error eliminant l'entrada:", error);
    }
  }

  async updateEntry(entryToUpdate: Entry): Promise<void> {
    const user = this.auth.user();

    if (!user) {
      const storedEntries = await this.getEntries();

      const updatedEntries = storedEntries.map((entry) =>
        entry.id === entryToUpdate.id ? entryToUpdate : entry,
      );

      localStorage.setItem(this.storageKey, JSON.stringify(updatedEntries));
      return;
    }

    const { error } = await this.supabase
      .from('entries')
      .update({
        title: entryToUpdate.title,
        content: entryToUpdate.content,
        last_update: entryToUpdate.lastUpdate,
      })
      .eq('id', entryToUpdate.id)
      .eq('user_id', user.id);

    if (error) {
      console.error("Error actualitzant l'entrada:", error);
    }
  }
}
