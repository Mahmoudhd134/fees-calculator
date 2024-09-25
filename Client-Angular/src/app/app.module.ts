import {LOCALE_ID, NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {BrowserModule} from "@angular/platform-browser";
import {provideRouter, RouterModule, RouterOutlet} from "@angular/router";
import {routes} from "./app.routes";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {IonRouterLink, IonRouterLinkWithHref, provideIonicAngular} from "@ionic/angular/standalone";
import {IonicModule} from "@ionic/angular";
import {HomeComponent} from "./home/home.component";
import {AppIonicHeaderComponent} from "./app-ionic-header/app-ionic-header.component";
import {SettingsComponent} from "./settings/settings.component";
import {FormsModule} from "@angular/forms";
import {PlacesComponent} from "./places/places.component";
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {CategoriesComponent} from "./categories/categories.component";
import {CurrencyPipe, DatePipe, registerLocaleData} from '@angular/common';
import localeAr from '@angular/common/locales/ar';
import {LanguageServices} from "../services/language-services";
import {AllPurchasesComponent} from "./all-purchases/all-purchases.component";
import {StatisticsComponent} from "./statistics/statistics.component";
import {provideCharts, withDefaultRegisterables, BaseChartDirective} from 'ng2-charts'
import {CategoryStatisticsComponent} from "./statistics/category-statistics/category-statistics.component";
import {OverallStatisticsComponent} from "./statistics/overall-statistics/overall-statistics.component";

registerLocaleData(localeAr, 'ar')

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppIonicHeaderComponent,
    SettingsComponent,
    PlacesComponent,
    CategoriesComponent,
    AllPurchasesComponent,
    StatisticsComponent,
    OverallStatisticsComponent,
    CategoryStatisticsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    IonicModule,
    IonRouterLink,
    IonRouterLinkWithHref,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BaseChartDirective
  ],
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideIonicAngular(),
    {
      provide: LOCALE_ID,
      useFactory: (langServices: LanguageServices) => {
        return langServices.currentLang;
      },
      deps: [LanguageServices]
    },
    DatePipe,
    CurrencyPipe,
    provideHttpClient(withInterceptorsFromDi()),
    provideCharts(withDefaultRegisterables()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {

}
