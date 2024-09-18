import {Injectable} from "@angular/core";
import {ItemModel} from "../models/item.models";

@Injectable({providedIn: 'root'})
export class ItemServices {
  getAll(categoryId?: number): ItemModel[] {
    return []
  }

  add(name: string, categoryId: number) {

  }

  remove(id: number) {

  }

  edit(item: ItemModel) {

  }
}
