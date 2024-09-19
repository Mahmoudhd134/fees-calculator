import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryServices} from "../../services/category-services";
import {PlaceServices} from "../../services/place-services";
import {map, Subscription, take} from "rxjs";
import {CategoryModel} from "../../models/category-models";
import {PlaceModel} from "../../models/place.models";
import {PurchaseServices} from "../../services/purchase-services";
import {PurchaseModel} from "../../models/purchase.models";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

  private catsSub = new Subscription()
  private placesSub = new Subscription()
  private purchasesSub = new Subscription()

  categories: CategoryModel[] = []
  places: PlaceModel[] = []

  selectedCategory: CategoryModel | undefined
  selectedPlace: PlaceModel | undefined
  selectedPrice: number = 0

  lastPurchases: PurchaseModel[] = []

  constructor(private catServices: CategoryServices,
              private placeServices: PlaceServices,
              private purchaseServices: PurchaseServices) {
  }

  ngOnInit() {
    this.catsSub = this.catServices.getAll().subscribe(data => {
      this.categories = data
    })

    this.placesSub = this.placeServices.getAll().subscribe(data => {
      this.places = data
    })

    this.purchasesSub = this.purchaseServices.getAll().pipe(
      map(data => data.filter(x => x.date.getDay() == new Date().getDay())),
      map(data => data.slice(0, 5))
    )
      .subscribe(data => {
        this.lastPurchases = data
      })
  }

  savePurchase() {
    console.log({category: this.selectedCategory, place: this.selectedPlace, price: this.selectedPrice})
    if (!this.selectedCategory)
      return
    if (!this.selectedPlace)
      return
    if (this.selectedPrice === 0)
      return

    this.purchaseServices.add(this.selectedPlace, this.selectedCategory, this.selectedPrice)

    this.selectedCategory = undefined
    this.selectedPlace = undefined
    this.selectedPrice = 0
  }

  ngOnDestroy() {
    this.catsSub.unsubscribe()
    this.placesSub.unsubscribe()
    this.purchasesSub.unsubscribe()
  }

  protected readonly JSON = JSON;
}
