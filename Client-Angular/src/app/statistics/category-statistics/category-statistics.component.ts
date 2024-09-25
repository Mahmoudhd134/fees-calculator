import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryServices} from "../../../services/category-services";
import {Subscription} from "rxjs";
import {CategoryModel} from "../../../models/category-models";
import {SelectCustomEvent} from "@ionic/angular";
import {PurchaseServices} from "../../../services/purchase-services";
import {CategorizeMonthStatistics} from "../../../models/purchase.models";
import {DatePipe} from "@angular/common";
import {LanguageServices} from "../../../services/language-services";
import {ChartData, ChartOptions} from "chart.js";

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

  private _categoriesStatistics: CategorizeMonthStatistics[][] = []
  allMonthsName: string[] = []

  lineChartData: ChartData = {datasets: []};

  selectQuarter = 0

  get monthsName() {
    return this.allMonthsName.slice(this.selectQuarter * 3, this.selectQuarter * 3 + 3)
  }


  lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: this.ls.gt('CategoryStatistics.MonthsAxis')
        }
      },
      y: {
        title: {
          display: true,
          text: this.ls.gt('CategoryStatistics.MoneyAxis')
        },
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
    this.allMonthsName = Array.from(Array(12).keys())
      .map(x => this.datePipe.transform(new Date(new Date().setMonth(x)), 'MMMM') ?? 'aaa')

    const currentMonth = new Date().getMonth()
    this.selectQuarter = Math.floor(currentMonth / 3)

  }

  updateChart() {
    this.purSub.unsubscribe()
    this.purSub = this.purchaseService.getCategorizeStatistics(this.selectedCategories, this.selectedYear)
      .subscribe(data => {
        this._categoriesStatistics = data
        this.setLineChart()
      })
  }

  setLineChart(quarter: number = this.selectQuarter) {
    if (quarter !== this.selectQuarter)
      this.selectQuarter = quarter

    this.lineChartData = {
      datasets: this._categoriesStatistics.map(cat => ({
        data: cat.slice(this.selectQuarter * 3, this.selectQuarter * 3 + 3).map(xx => xx.price),
        label: cat[0].category.name
      }))
    }
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
