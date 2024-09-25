import {Component, OnDestroy, OnInit} from '@angular/core';
import {PurchaseServices} from "../../services/purchase-services";
import {Subscription} from "rxjs";
import {ChartData} from "chart.js";
import {DatePipe} from "@angular/common";
import {LanguageServices} from "../../services/language-services";
import {Theme} from "../../services/theme-services";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit, OnDestroy {
  private monthsSub = new Subscription()

  months: number[] = []
  years: number[] = []
  selectYear = 0

  monthsName: string[] = [];

  lineChartData: ChartData = {datasets: []};

  lineChartOptions = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: this.ls.gt('Statistics.MonthsAxis')
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: this.ls.gt('Statistics.MoneyAxis')
        }
      }
    }
  };

  public lineChartType = 'line';

  constructor(
    private purchaseServices: PurchaseServices,
    private datePipe: DatePipe,
    private ls: LanguageServices
  ) {
  }

  ngOnInit() {
    this.years = this.purchaseServices.getAvailableYears()
    if (this.years.length > 0) {
      this.selectYear = this.years[0]
      this.setMonthsPurchasesForYear(this.selectYear)
    }

    this.monthsName = Array.from(Array(12).keys())
      .map(x => this.datePipe.transform(new Date(new Date().setMonth(x)), 'MMMM') ?? 'aaa')

  }

  setMonthsPurchasesForYear(year: number) {
    this.monthsSub.unsubscribe()
    this.monthsSub = this.purchaseServices.getStatistics(year).subscribe(d => {
      this.months = d
      this.lineChartData = {
        datasets: [
          {data: d, label: this.ls.gt('Statistics.ChartLineName')}
        ]
      }
    })
  }


  ngOnDestroy() {
    this.monthsSub.unsubscribe()
  }

  protected readonly LightMode = Theme;
}
