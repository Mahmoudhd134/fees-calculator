import {Component, inject, OnInit} from '@angular/core';
import {ThemeServices} from "../services/theme-services";
import {TranslateService} from "@ngx-translate/core";
import {LanguageServices} from "../services/language-services";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private darkModeService = inject(ThemeServices)
  private langServices = inject(LanguageServices)


  ngOnInit() {
    this.darkModeService.initDarkMode()
    this.langServices.initialize()
  }
}
