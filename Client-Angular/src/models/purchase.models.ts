import {CategoryModel} from "./category-models";
import {PlaceModel} from "./place.models";

export interface PurchaseModel {
  id: string,
  category: CategoryModel,
  place: PlaceModel,
  priceInEGP: number,
  date: Date
}
