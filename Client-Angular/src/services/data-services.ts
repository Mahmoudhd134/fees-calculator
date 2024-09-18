import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {CategoryModel} from "../models/category-models";
import {ItemModel} from "../models/item.models";
import {PlaceModel} from "../models/place.models";

@Injectable({providedIn: 'root'})
export class DataServices {
  CATEGORIES_KEY = 'categories'
  ITEMS_KEY = 'items'
  PLACES_KEY = 'places'

  private categoriesSubject = new BehaviorSubject([] as CategoryModel[])
  private itemsSubject = new BehaviorSubject([] as ItemModel[])
  private placesSubject = new BehaviorSubject([] as PlaceModel[])

  private categoriesLoaded = false
  private itemsLoaded = false
  private placesLoaded = false

  constructor() {
    this.categoriesSubject.subscribe(data => {
      localStorage.setItem(this.CATEGORIES_KEY, JSON.stringify(data))
    })

    this.itemsSubject.subscribe(data => {
      localStorage.setItem(this.ITEMS_KEY, JSON.stringify(data))
    })

    this.placesSubject.subscribe(data => {
      localStorage.setItem(this.PLACES_KEY, JSON.stringify(data))
    })
  }

  loadCategories() {
    const categories = JSON.parse(localStorage.getItem(this.CATEGORIES_KEY) ?? '[]') as CategoryModel[]
    this.categoriesSubject.next(categories)
  }

  loadItems() {
    const items = JSON.parse(localStorage.getItem(this.ITEMS_KEY) ?? '[]') as ItemModel[]
    this.itemsSubject.next(items)
  }

  loadPlaces() {
    const places = JSON.parse(localStorage.getItem(this.PLACES_KEY) ?? '[]') as PlaceModel[]
    this.placesSubject.next(places)
  }

  load() {
    this.loadItems()
    this.loadCategories()
    this.loadPlaces()
  }

  setCategories(categories: CategoryModel[]) {
    this.categoriesSubject.next(categories)
  }

  get categories() {
    if(!this.categoriesLoaded){
      this.categoriesLoaded = true
      this.loadCategories()
    }
    return this.categoriesSubject.value
  }

  setItems(items: ItemModel[]) {
    this.itemsSubject.next(items)
  }

  get items() {
    if(!this.itemsLoaded){
      this.itemsLoaded = true
      this.loadItems()
    }
    return this.itemsSubject.value
  }

  setPlaces(places: PlaceModel[]) {
    this.placesSubject.next(places)
  }

  get places() {
    if(!this.placesLoaded){
      this.placesLoaded = true
      this.loadPlaces()
    }
    return this.placesSubject.value
  }
}
