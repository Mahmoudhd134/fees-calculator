import {Injectable} from "@angular/core";
import {PlaceModel} from "../models/place.models";

@Injectable({providedIn: 'root'})
export class PlaceServices {
  getAll(): PlaceModel[] {
    return []
  }

  add(name: string) {

  }

  remove(id: number) {

  }

  edit(place: PlaceModel) {

  }
}
