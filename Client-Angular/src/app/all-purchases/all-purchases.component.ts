import {Component, OnDestroy, OnInit} from '@angular/core';
import {PurchaseServices} from "../../services/purchase-services";
import {PurchaseCategory, PurchaseModel} from "../../models/purchase.models";
import {Subscription} from "rxjs";
import {CategoryModel} from "../../models/category-models";

import {addIcons} from 'ionicons';
import {arrowDown, arrowUp} from 'ionicons/icons';
import {AlertController} from "@ionic/angular";
import {LanguageServices} from "../../services/language-services";
import {CurrencyPipe, DatePipe} from "@angular/common";

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

  constructor(
    private purchaseServices: PurchaseServices,
    private alertController: AlertController,
    private ls: LanguageServices,
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe) {
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
        }).sort((a, b) => a.category.name.localeCompare(b.category.name))

      this.cats.forEach(c => this.expandedCats.set(c.category.id, false))
    })
  }

  deleteHandler(purchase: PurchaseModel) {
    this.alertController.create({
      header: this.ls.gt('AllPurchases.Delete'),
      message: this.ls.gt('AllPurchases.DeleteMsg') + ' ' + this.datePipe.transform(purchase.date, 'EEEE d MMMM') + ' ' + this.ls.gt('AllPurchases.DeleteMsg2') + ' ' + this.currencyPipe.transform(purchase.priceInEGP, 'EGP'),
      buttons: [{
        text: this.ls.gt('Options.Delete'),
        handler: () => this.purchaseServices.delete(purchase.id)
      },
        this.ls.gt('Options.Cancel')]
    })
      .then(x => x.present())
  }

  trackByCategoryId(index: number, cat: PurchaseCategory) {
    return cat.category.id;
  }

  trackByPurchaseId(index: number, purchase: PurchaseModel) {
    return purchase.id;
  }


  private getPurchasesForCategory(id: string) {
    return this.purchases.filter(x => x.category.id == id)
  }

  ngOnDestroy() {
    this.purchasesSub.unsubscribe()
  }

}
