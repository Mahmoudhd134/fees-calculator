import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {CategoryModel} from "../models/category-models";
import {PurchaseModel} from "../models/purchase.models";
import {PlaceModel} from "../models/place.models";
import {Directory, Encoding, Filesystem} from "@capacitor/filesystem";
import {environment} from "../app/environment";

@Injectable({providedIn: 'root'})
export class DataStoreServices {
  private CATEGORIES_KEY = 'data/categories.json'
  private PURCHASES_KEY = 'data/purchases.json'
  private PLACES_KEY = 'data/places.json'

  private categoriesSubject = new BehaviorSubject([] as CategoryModel[])
  private purchasesSubject = new BehaviorSubject([] as PurchaseModel[])
  private placesSubject = new BehaviorSubject([] as PlaceModel[])

  private categoriesLoaded = false
  private purchasesLoaded = false
  private placesLoaded = false

  constructor() {
    this.categoriesSubject.subscribe(async (data) => {
      if (this.categoriesLoaded) {
        // localStorage.setItem(this.CATEGORIES_KEY, JSON.stringify(data))
        await this.saveToFile(this.CATEGORIES_KEY, data)
      }
    })

    this.purchasesSubject.subscribe(async (data) => {
      if (this.purchasesLoaded) {
        // localStorage.setItem(this.PURCHASES_KEY, JSON.stringify(data))
        await this.saveToFile(this.PURCHASES_KEY, data)
      }
    })

    this.placesSubject.subscribe(async (data) => {
      if (this.placesLoaded) {
        // localStorage.setItem(this.PLACES_KEY, JSON.stringify(data))
        await this.saveToFile(this.PLACES_KEY, data)
      }
    })
  }

  async loadCategories() {
    // const categories = JSON.parse(localStorage.getItem(this.CATEGORIES_KEY) ?? '[]') as CategoryModel[]
    try {
      const categories = await this.loadFromFile(this.CATEGORIES_KEY) as CategoryModel[]
      this.categoriesSubject.next(categories)
    } catch (e) {
      console.log(e)
    }
  }

  async loadPurchases() {
    // const purchases = JSON.parse(localStorage.getItem(this.PURCHASES_KEY) ?? '[]') as PurchaseModel[]
    const purchases = await this.loadFromFile(this.PURCHASES_KEY) as PurchaseModel[]
    this.purchasesSubject.next(purchases.map(p => ({...p, date: new Date(p.date)})))
  }

  async loadPlaces() {
    // const places = JSON.parse(localStorage.getItem(this.PLACES_KEY) ?? '[]') as PlaceModel[]
    const places = await this.loadFromFile(this.PLACES_KEY) as PlaceModel[]
    this.placesSubject.next(places)
  }

  async load() {
    await this.loadPurchases()
    await this.loadCategories()
    await this.loadPlaces()
  }

  set categories(categories: CategoryModel[]) {
    this.categoriesSubject.next(categories)
  }

  async getCategories() {
    if (!this.categoriesLoaded) {
      this.categoriesLoaded = true
      await this.loadCategories()
    }
    return this.categoriesSubject.value
  }

  set purchases(purchases: PurchaseModel[]) {
    this.purchasesSubject.next(purchases)
  }

  async getPurchases() {
    if (!this.purchasesLoaded) {
      this.purchasesLoaded = true
      await this.loadPurchases()
    }
    return this.purchasesSubject.value
  }

  set places(places: PlaceModel[]) {
    this.placesSubject.next(places)
  }

  async getPlaces() {
    if (!this.placesLoaded) {
      this.placesLoaded = true
      await this.loadPlaces()
    }
    return this.placesSubject.value
  }

  private async saveToFile(fileName: string, data: any) {
    await Filesystem.writeFile({
      path: environment.BASE_DIR + '/' + fileName,
      data: JSON.stringify(data),
      directory: Directory.Documents,
      encoding: Encoding.UTF8
    });
  }

  private async loadFromFile<T>(fileName: string): Promise<T> {
    try {
      const result = await Filesystem.readFile({
        path: environment.BASE_DIR + '/' + fileName,
        directory: Directory.Documents,
        encoding: Encoding.UTF8
      });
      return JSON.parse(result.data as string) as T;
    } catch (error) {
      await this.saveToFile(fileName, '')
      console.error(`Error loading ${fileName}`, error);
      return [] as T;
    }
  }
}
