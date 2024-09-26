import {Component, inject, OnInit} from '@angular/core';
import {ThemeServices} from "../services/theme-services";
import {LanguageServices} from "../services/language-services";
import {CategoryServices} from "../services/category-services";
import {PlaceServices} from "../services/place-services";
import {PurchaseServices} from "../services/purchase-services";
import {Platform} from "@ionic/angular";
import {App} from "@capacitor/app";
import {Directory, Filesystem} from "@capacitor/filesystem";
import {environment} from "./environment";

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
  private platform = inject(Platform)

  constructor() {
    this.initializeApp();
  }


  async ngOnInit() {
    this.darkModeService.initDarkMode()
    this.langServices.initialize()
    try {
      const doseCreate = localStorage.getItem("created") ?? 'false'
      if (doseCreate == 'false') {
        localStorage.setItem('created', 'true')
        await Filesystem.mkdir({
          path: environment.BASE_DIR + '/data',
          directory: Directory.Documents,
          recursive: true
        })
      }
    } catch {
    }
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      // Add listener for back button
      await App.addListener('backButton', async ({canGoBack}) => {
        if (canGoBack) {
          // If there is history, navigate back
          window.history.back();
        } else {
          // Otherwise, prevent exiting the app
          await this.confirmExitApp();
        }
      });
    });
  }

  async confirmExitApp() {
    // You can show a confirmation alert before exiting the app
    const shouldExit = confirm('Do you really want to exit the app?');
    if (shouldExit) {
      await App.exitApp();
    }
  }
}
