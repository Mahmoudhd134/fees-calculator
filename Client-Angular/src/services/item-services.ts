import {Injectable} from "@angular/core";
import {ItemModel} from "../models/item.models";
import {BehaviorSubject} from "rxjs";
import {DataStoreServices} from "./data-store-services.service";
import {CategoryModel} from "../models/category-models";
import {v4 as uuidv4} from "uuid";

@Injectable({providedIn: 'root'})
export class ItemServices {
  private itemsSubject = new BehaviorSubject([] as ItemModel[])

  constructor(private dataStore: DataStoreServices) {
    this.itemsSubject.next(this.dataStore.items)
  }

  getAll(categoryId?: number) {
    return this.itemsSubject.asObservable()
  }

  add(name: string, category: CategoryModel) {
    const item: ItemModel = {
      id: uuidv4(),
      name,
      category
    }
    this.dataStore.setItems([...this.dataStore.items, item])
    this.itemsSubject.next([...this.itemsSubject.value, item])
  }

  remove(id: string) {
    this.dataStore.setItems(this.dataStore.items.filter(x => x.id != id))
    this.itemsSubject.next(this.itemsSubject.value.filter(x => x.id != id))
  }

  edit(item: ItemModel) {
    this.dataStore.setItems(this.dataStore.items.map(x => x.id == item.id ? item : x))
    this.itemsSubject.next(this.itemsSubject.value.map(x => x.id == item.id ? item : x))
  }
}
