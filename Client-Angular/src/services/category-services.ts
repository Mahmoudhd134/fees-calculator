import {Injectable} from "@angular/core";
import {CategoryModel} from "../models/category-models";

@Injectable({providedIn: 'root'})
export class CategoryServices {

  getAll(): CategoryModel[] {
    return []
  }

  add(name: string) {
  }

  remove(id: number) {

  }

  edit(category: CategoryModel) {

  }
}
