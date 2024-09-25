import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryServices} from "../../../services/category-services";
import {Subscription} from "rxjs";
import {CategoryModel} from "../../../models/category-models";
import {SelectCustomEvent} from "@ionic/angular";
import {PurchaseServices} from "../../../services/purchase-services";
import {CategorizeMonthStatistics} from "../../../models/purchase.models";
import {DatePipe} from "@angular/common";
import {LanguageServices} from "../../../services/language-services";
import {ChartData} from "chart.js";

@Component({
  selector: 'app-category-statistics',
  templateUrl: './category-statistics.component.html',
  styleUrls: ['./category-statistics.component.scss'],
})
export class CategoryStatisticsComponent implements OnInit, OnDestroy {
  private purSub = new Subscription()
  private catSub = new Subscription()
  categories: CategoryModel[] = []
  selectedCategories: string[] = []
  selectedYear: number = 0
  years: number[] = []

  categoriesStatistics: CategorizeMonthStatistics[][] = []
  monthsName: string[] = []

  lineChartData: ChartData = {datasets: []};

  lineChartOptions = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: this.ls.gt('CategoryStatistics.MonthsAxis')
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: this.ls.gt('CategoryStatistics.MoneyAxis')
        }
      }
    }
  };

  constructor(private categoryService: CategoryServices,
              private purchaseService: PurchaseServices,
              private datePipe: DatePipe,
              private ls: LanguageServices) {
  }

  ngOnInit() {
    this.catSub = this.categoryService.getAll().subscribe(data => {
      this.categories = data
    })

    this.years = this.purchaseService.getAvailableYears()
    if (this.years.length > 0) {
      this.selectedYear = this.years[0]
    }
    this.monthsName = Array.from(Array(12).keys())
      .map(x => this.datePipe.transform(new Date(new Date().setMonth(x)), 'MMMM') ?? 'aaa')

  }

  updateChart() {
    this.purSub.unsubscribe()
    this.purSub = this.purchaseService.getCategorizeStatistics(this.selectedCategories, this.selectedYear)
      .subscribe(data => {
        this.categoriesStatistics = data
        console.log(data)
        this.lineChartData = {
          datasets: data.map(cat => ({
            data: cat.map(xx => xx.price),
            label: cat[0].category.name
          }))
        }
      })
  }

  selectAll(select: boolean) {
    if (select) {
      this.selectedCategories = this.categories.map(x => x.id)
    } else {
      this.selectedCategories = [] as string[]
    }
    this.updateChart()
  }

  ngOnDestroy() {
    this.catSub.unsubscribe()
  }

}
