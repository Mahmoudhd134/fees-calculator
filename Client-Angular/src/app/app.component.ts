import {Component, inject, OnInit} from '@angular/core';
import {ThemeServices} from "../services/theme-services";
import {TranslateService} from "@ngx-translate/core";
import {LanguageServices} from "../services/language-services";
import {CategoryServices} from "../services/category-services";
import {PlaceServices} from "../services/place-services";
import {PurchaseServices} from "../services/purchase-services";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private darkModeService = inject(ThemeServices)
  private langServices = inject(LanguageServices)
  // injecting them to load them
  private categoryServices = inject(CategoryServices)
  private placeServices = inject(PlaceServices)
  private purchaseServices = inject(PurchaseServices)


  ngOnInit() {
    this.darkModeService.initDarkMode()
    this.langServices.initialize()
  }
}
