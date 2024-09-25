import {Injectable} from "@angular/core";
import {PlaceModel} from "../models/place.models";
import {DataStoreServices} from "./data-store-services.service";
import {BehaviorSubject} from "rxjs";
import {v4 as uuidv4} from 'uuid'

@Injectable({providedIn: 'root'})
export class PlaceServices {

  placesSubject = new BehaviorSubject([] as PlaceModel[])

  constructor(private dataStore: DataStoreServices) {
    this.dataStore.getPlaces()
      .then(x => this.placesSubject.next(x))
  }

  getAll() {
    return this.placesSubject.asObservable()
  }

  add(name: string) {
    const place: PlaceModel = {
      id: uuidv4(),
      name
    }
    this.dataStore.places = [...this.placesSubject.value, place]
    this.placesSubject.next([...this.placesSubject.value, place])
  }

  remove(id: string) {
    this.dataStore.places = this.placesSubject.value.filter(x => x.id != id)
    this.placesSubject.next(this.placesSubject.value.filter(x => x.id != id))
  }

  edit(place: PlaceModel) {
    this.dataStore.places = this.placesSubject.value.map(x => x.id == place.id ? place : x)
    this.placesSubject.next(this.placesSubject.value.map(x => x.id == place.id ? place : x))
  }
}
