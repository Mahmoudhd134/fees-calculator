import {Injectable} from "@angular/core";
import {DataStoreServices} from "./data-store-services.service";
import {BehaviorSubject, filter, map, reduce} from "rxjs";
import {CategorizeMonthStatistics, PurchaseCategory, PurchaseModel} from "../models/purchase.models";
import {PlaceModel} from "../models/place.models";
import {CategoryModel} from "../models/category-models";
import {v4 as uuidv4} from 'uuid'
import {patchFetchToLoadInMemoryAssets} from "@angular-devkit/build-angular/src/utils/server-rendering/fetch-patch";

@Injectable({providedIn: 'root'})
export class PurchaseServices {
  private purchasesSubject = new BehaviorSubject([] as PurchaseModel[])

  constructor(private dataStore: DataStoreServices) {
    this.purchasesSubject.next(dataStore.purchases)
  }

  getAll() {
    return this.purchasesSubject.asObservable()
  }

  add(place: PlaceModel, category: CategoryModel, price: number) {
    const purchase: PurchaseModel = {
      id: uuidv4(),
      category,
      place,
      priceInEGP: price,
      date: new Date(Date.now())
    }
    this.dataStore.purchases = [purchase, ...this.dataStore.purchases]
    this.purchasesSubject.next([purchase, ...this.purchasesSubject.value])
  }

  delete(id: string) {
    this.dataStore.purchases = this.dataStore.purchases.filter(x => x.id != id)
    this.purchasesSubject.next(this.purchasesSubject.value.filter(x => x.id != id))
  }

  getAvailableYears() {
    const set = this.purchasesSubject.value
      .map(x => x.date.getFullYear())
      .reduce((set, x) => set.add(x), new Set<number>())

    return [...set].sort((a, b) => b - a)
  }

  getStatistics(year: number) {
    return this.purchasesSubject.pipe(
      map((x: PurchaseModel[]) => x.filter(p => p.date.getFullYear() == year)),
      map(x => {
        const months: number[] = []
        Array.from(Array(12).keys())
          .forEach(x => months[x] = 0)
        x.forEach(p => months[p.date.getMonth()] += p.priceInEGP)
        return months
      })
    )
  }

  getCategorizeStatistics(ids: string[], year: number) {
    return this.purchasesSubject.pipe(
      map((x: PurchaseModel[]) => x.filter(p =>
        p.date.getFullYear() == year &&
        ids.some(id => p.category.id === id))),
      map(x => {
        const categoriesMap: Map<string, { cat: CategoryModel, price: number }[]> = new Map()
        x.forEach(p => {
          let categoryMonths = categoriesMap.get(p.category.id)
          if (categoryMonths) {
            categoryMonths[p.date.getMonth()].price += p.priceInEGP
            return
          }

          const months = Array.from(Array(12).keys())
            .map(x => ({
              cat: p.category,
              price: 0
            }));

          months[p.date.getMonth()].price = p.priceInEGP

          categoriesMap.set(p.category.id, months)
        })

        return [...categoriesMap].map(x => x[1].map(m => ({
          category: m.cat,
          price: m.price
        }) as CategorizeMonthStatistics))
      })
    )
  }
}
