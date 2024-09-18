import {CategoryModel} from "./category-models";

export interface ItemModel {
  id: string,
  name: string,
  category?: CategoryModel
}
