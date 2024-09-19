import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {SettingsComponent} from "./settings/settings.component";
import {PlacesComponent} from "./places/places.component";
import {CategoriesComponent} from "./categories/categories.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'places', component: PlacesComponent},
  {path: 'categories', component: CategoriesComponent},
];
