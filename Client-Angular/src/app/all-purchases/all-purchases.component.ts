import {Component, OnDestroy, OnInit} from '@angular/core';
import {PurchaseServices} from "../../services/purchase-services";
import {PurchaseCategory, PurchaseModel} from "../../models/purchase.models";
import {Subscription} from "rxjs";
import {CategoryModel} from "../../models/category-models";

import {addIcons} from 'ionicons';
import {arrowDown, arrowUp} from 'ionicons/icons';

@Component({
  selector: 'app-all-purchases',
  templateUrl: './all-purchases.component.html',
  styleUrls: ['./all-purchases.component.scss'],
})
export class AllPurchasesComponent implements OnInit, OnDestroy {
  private purchasesSub = new Subscription()

  purchases: PurchaseModel[] = []
  cats: PurchaseCategory[] = []
  expandedCats: Map<string, boolean> = new Map<string, boolean>()

  constructor(private purchaseServices: PurchaseServices) {
    addIcons({arrowDown, arrowUp})
  }

  ngOnInit() {
    this.purchasesSub = this.purchaseServices.getAll().subscribe(data => {
      this.purchases = data
      const allCats = data.map(x => x.category)
      this.cats = [...new Set(allCats.map(x => x.id))]
        .map(id => allCats.find(x => x.id == id)!)
        .map(x => {
          const purchases = this.getPurchasesForCategory(x.id)
          return {
            category: x,
            purchases,
            totalPrice: purchases.reduce((p, c) => p + c.priceInEGP, 0)
          }
        })

      this.cats.forEach(c => this.expandedCats.set(c.category.id, false))
    })
  }

  private getPurchasesForCategory(id: string) {
    return this.purchases.filter(x => x.category.id == id)
  }

  ngOnDestroy() {
    this.purchasesSub.unsubscribe()
  }

}
