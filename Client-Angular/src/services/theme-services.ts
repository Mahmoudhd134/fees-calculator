import {Injectable} from "@angular/core";

export enum Theme {
  Light,
  Dark,
  System
}

@Injectable({providedIn: 'root'})
export class ThemeServices {
  private LocalStorageKey = 'theme'
  private isDark = true

  toggleDarkPalette(mode: Theme) {
    switch (mode) {
      case Theme.Dark:
      case Theme.Light:
        this.isDark = mode == Theme.Dark
        break
      case Theme.System:
        this.isDark = this.isSystemLightModeDark()
        break
    }
    document.documentElement.classList.toggle('ion-palette-dark', this.isDark);
    localStorage.setItem(this.LocalStorageKey, mode.toString())
  }

  initDarkMode() {
    this.toggleDarkPalette(this.currentTheme())
  }

  currentTheme(): Theme {
    const localSettings = localStorage.getItem(this.LocalStorageKey)
    return localSettings == null ? Theme.System : Number(localSettings)
  }


  private isSystemLightModeDark() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    return prefersDark.matches
  }
}
