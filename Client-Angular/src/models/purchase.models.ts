import {CategoryModel} from "./category-models";
import {PlaceModel} from "./place.models";

export interface PurchaseModel {
  id: string,
  category: CategoryModel,
  place: PlaceModel,
  priceInEGP: number,
  date: Date
}

export interface PurchaseCategory {
  category: CategoryModel
  purchases: PurchaseModel[]
  totalPrice: number
}

export interface PurchasesMonthStatistics {
  month: Date
  value: number
}

export interface CategorizeMonthStatistics {
  category: CategoryModel,
  price: number
}
