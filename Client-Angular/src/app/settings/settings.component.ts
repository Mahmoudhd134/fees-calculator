import {Component} from '@angular/core';
import {ThemeServices, Theme} from "../../services/theme-services";
import {SelectCustomEvent} from "@ionic/angular";
import {Lang, LanguageServices} from "../../services/language-services";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  currentTheme = this.darkModeService.currentTheme()
  currentLang = this.langServices.currentLang;

  constructor(private darkModeService: ThemeServices, private langServices: LanguageServices) {
  }

  toggleTheme(event: SelectCustomEvent<Theme>) {
    this.darkModeService.toggleDarkPalette(event.detail.value);
  }

  toggleLang(event: SelectCustomEvent<Lang>) {
    this.langServices.setLanguage(event.detail.value)
  }

  protected readonly LightMode = Theme;
}
