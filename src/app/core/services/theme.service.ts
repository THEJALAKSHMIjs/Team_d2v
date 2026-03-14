import { Injectable, signal, computed } from '@angular/core';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'dana-residency-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly themeSignal = signal<Theme>(this.getStoredTheme());

  theme = computed(() => this.themeSignal());
  isDark = computed(() => this.themeSignal() === 'dark');

  constructor() {
    this.applyTheme(this.themeSignal());
  }

  private getStoredTheme(): Theme {
    if (typeof document === 'undefined' || !window.localStorage) return 'light';
    const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    return stored === 'dark' || stored === 'light' ? stored : 'light';
  }

  private applyTheme(theme: Theme): void {
    if (typeof document === 'undefined') return;
    const html = document.documentElement;
    html.classList.remove('theme-light', 'theme-dark');
    html.classList.add(`theme-${theme}`);
  }

  setTheme(theme: Theme): void {
    this.themeSignal.set(theme);
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {}
    this.applyTheme(theme);
  }

  toggle(): void {
    const next = this.themeSignal() === 'light' ? 'dark' : 'light';
    this.setTheme(next);
  }
}
