import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {CategoryModel} from "../models/category-models";
import {PurchaseModel} from "../models/purchase.models";
import {PlaceModel} from "../models/place.models";

@Injectable({providedIn: 'root'})
export class DataStoreServices {
  private CATEGORIES_KEY = 'categories'
  private PURCHASES_KEY = 'purchases'
  private PLACES_KEY = 'places'

  private categoriesSubject = new BehaviorSubject([] as CategoryModel[])
  private purchasesSubject = new BehaviorSubject([] as PurchaseModel[])
  private placesSubject = new BehaviorSubject([] as PlaceModel[])

  private categoriesLoaded = false
  private purchasesLoaded = false
  private placesLoaded = false

  constructor() {
    this.categoriesSubject.subscribe(data => {
      if (this.categoriesLoaded)
        localStorage.setItem(this.CATEGORIES_KEY, JSON.stringify(data))
    })

    this.purchasesSubject.subscribe(data => {
      if (this.purchasesLoaded)
        localStorage.setItem(this.PURCHASES_KEY, JSON.stringify(data))
    })

    this.placesSubject.subscribe(data => {
      if (this.placesLoaded)
        localStorage.setItem(this.PLACES_KEY, JSON.stringify(data))
    })
  }

  loadCategories() {
    const categories = JSON.parse(localStorage.getItem(this.CATEGORIES_KEY) ?? '[]') as CategoryModel[]
    this.categoriesSubject.next(categories)
  }

  loadPurchases() {
    const purchases = JSON.parse(localStorage.getItem(this.PURCHASES_KEY) ?? '[]') as PurchaseModel[]
    this.purchasesSubject.next(purchases)
  }

  loadPlaces() {
    const places = JSON.parse(localStorage.getItem(this.PLACES_KEY) ?? '[]') as PlaceModel[]
    this.placesSubject.next(places)
  }

  load() {
    this.loadPurchases()
    this.loadCategories()
    this.loadPlaces()
  }

  set categories(categories: CategoryModel[]) {
    this.categoriesSubject.next(categories)
  }

  get categories() {
    if (!this.categoriesLoaded) {
      this.categoriesLoaded = true
      this.loadCategories()
    }
    return this.categoriesSubject.value
  }

  set purchases(purchases: PurchaseModel[]) {
    this.purchasesSubject.next(purchases)
  }

  get purchases() {
    if (!this.placesLoaded) {
      this.purchasesLoaded = true
      this.loadPurchases()
    }
    return this.purchasesSubject.value
  }

  set places(places: PlaceModel[]) {
    this.placesSubject.next(places)
  }

  get places() {
    if (!this.placesLoaded) {
      this.placesLoaded = true
      this.loadPlaces()
    }
    return this.placesSubject.value
  }
}
