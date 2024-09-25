import {Injectable} from "@angular/core";
import {CategoryModel} from "../models/category-models";
import {DataStoreServices} from "./data-store-services.service";
import {BehaviorSubject} from "rxjs";
import {PlaceModel} from "../models/place.models";
import {v4 as uuidv4} from "uuid";

@Injectable({providedIn: 'root'})
export class CategoryServices {
  categoriesSubject = new BehaviorSubject([] as CategoryModel[])

  constructor(private dataStore: DataStoreServices) {
    dataStore.getCategories()
      .then(x => this.categoriesSubject.next(x))
  }

  getAll() {
    return this.categoriesSubject.asObservable()
  }

  add(name: string) {
    const category: CategoryModel = {
      id: uuidv4(),
      name
    }
    this.dataStore.categories = [...this.categoriesSubject.value, category]
    this.categoriesSubject.next([...this.categoriesSubject.value, category])
  }

  remove(id: string) {
    this.dataStore.categories = this.categoriesSubject.value.filter(x => x.id != id)
    this.categoriesSubject.next(this.categoriesSubject.value.filter(x => x.id != id))
  }

  edit(category: CategoryModel) {
    this.dataStore.categories = this.categoriesSubject.value.map(x => x.id == category.id ? category : x)
    this.categoriesSubject.next(this.categoriesSubject.value.map(x => x.id == category.id ? category : x))
  }
}
