import {Component, OnDestroy, OnInit} from '@angular/core';
import {PurchaseServices} from "../../../services/purchase-services";
import {DatePipe} from "@angular/common";
import {LanguageServices} from "../../../services/language-services";
import {Subscription} from "rxjs";
import {ChartData} from "chart.js";
import {getRandomColor} from "../../../utils/generate-random-colore";

@Component({
  selector: 'app-overall-statistics',
  templateUrl: './overall-statistics.component.html',
  styleUrls: ['./overall-statistics.component.scss'],
})
export class OverallStatisticsComponent implements OnInit, OnDestroy {

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
          {
            data: d,
            label: this.ls.gt('Statistics.ChartLineName'),
            backgroundColor: getRandomColor(),
            borderColor: getRandomColor(),
            pointBackgroundColor: getRandomColor(),
            pointBorderColor: '#fff',
            fill: true
          }
        ]
      }
    })
  }

  ngOnDestroy() {
    this.monthsSub.unsubscribe()
  }

}
