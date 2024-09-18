import {Routes} from '@angular/router';
import {AppHomeComponent} from "./app-home/app-home.component";
import {SettingsComponent} from "./settings/settings.component";
import {PlacesComponent} from "./places/places.component";

export const routes: Routes = [
  {path: '', component: AppHomeComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'places', component: PlacesComponent},
];
