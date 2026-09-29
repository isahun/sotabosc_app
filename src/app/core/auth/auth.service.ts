import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from '@supabase/supabase-js';
import { SupabaseService } from '../supabase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly supabase = inject(SupabaseService).client;
  private readonly router = inject(Router);

  private _session = signal<Session | null>(null);
  private _role = signal<'user' | 'admin' | null>(null);

  readonly user = computed(() => this._session()?.user ?? null);
  readonly isLoggedIn = computed(() => !!this._session());
  readonly isAdmin = computed(() => this._role() === 'admin');

  private _resolveReady!: () => void;

  readonly ready = new Promise<void>(
    (resolve) => (this._resolveReady = resolve),
  );

  constructor() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session.set(data.session);

      if (data.session) {
        this.loadRole(data.session.user.id);
      }

      this._resolveReady();
    });

    this.supabase.auth.onAuthStateChange((_, session) => {
      this._session.set(session);

      if (session) {
        this.loadRole(session.user.id);
      } else {
        this._role.set(null);
      }
    });
  }

  private async loadRole(userId: string) {
    const { data } = await this.supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single<{ role: 'user' | 'admin' }>();

    this._role.set(data?.role ?? 'user');
  }

  async register(email: string, password: string) {
    return this.supabase.auth.signUp({
      email,
      password,
    });
  }

  async login(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({
      email,
      password,
    });
  }

  async logout() {
    await this.supabase.auth.signOut();
    this.router.navigate(['/']);
  }
}
