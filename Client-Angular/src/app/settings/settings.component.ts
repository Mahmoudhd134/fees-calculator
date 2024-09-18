import {Component} from '@angular/core';
import {ThemeServices, Theme} from "../../services/theme-services";
import { SelectCustomEvent} from "@ionic/angular";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  currentMode = this.darkModeService.currentMode()

  constructor(private darkModeService: ThemeServices) {
  }

  toggleChange(event: SelectCustomEvent<Theme>) {
    this.darkModeService.toggleDarkPalette(event.detail.value);
  }

  protected readonly LightMode = Theme;
}
