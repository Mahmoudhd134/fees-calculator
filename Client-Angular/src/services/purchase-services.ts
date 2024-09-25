import {Injectable} from "@angular/core";
import {DataStoreServices} from "./data-store-services.service";
import {BehaviorSubject, filter, map} from "rxjs";
import {PurchaseCategory, PurchaseModel} from "../models/purchase.models";
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
}
