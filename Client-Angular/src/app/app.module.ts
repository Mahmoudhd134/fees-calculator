import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {BrowserModule} from "@angular/platform-browser";
import {provideRouter, RouterModule, RouterOutlet} from "@angular/router";
import {routes} from "./app.routes";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {IonRouterLink, IonRouterLinkWithHref, provideIonicAngular} from "@ionic/angular/standalone";
import {IonicModule} from "@ionic/angular";
import {AppHomeComponent} from "./app-home/app-home.component";
import {AppIonicHeaderComponent} from "./app-ionic-header/app-ionic-header.component";
import {SettingsComponent} from "./settings/settings.component";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [AppComponent, AppHomeComponent, AppIonicHeaderComponent, SettingsComponent],
  imports: [
    BrowserModule,
    RouterModule,
    IonicModule,
    IonRouterLink,
    IonRouterLinkWithHref,
    FormsModule,
  ],
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideIonicAngular()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
