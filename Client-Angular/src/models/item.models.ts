import {CategoryModel} from "./category-models";

export interface ItemModel {
  id: number,
  name: string,
  category?: CategoryModel
}
