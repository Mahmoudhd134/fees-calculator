import {Component, inject, OnInit} from '@angular/core';
import {ThemeServices} from "../services/theme-services";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private darkModeService = inject(ThemeServices)

  ngOnInit() {
    this.darkModeService.initDarkMode()
  }
}
