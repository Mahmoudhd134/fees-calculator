import {Component, OnDestroy, OnInit} from '@angular/core';
import {PurchaseServices} from "../../services/purchase-services";
import {PurchaseModel} from "../../models/purchase.models";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit, OnDestroy {
  private monthsSub = new Subscription()

  // months: number[] = []

  public monthlyPurchases: number[] = [100, 200, 300, 250, 150, 400, 500, 320, 290, 310, 400, 480];

  // Labels for months
  public months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Chart data structure
  public lineChartData = [{
    data: this.monthlyPurchases,  // Bind your purchases data
    label: 'Purchases',
    borderColor: '#42A5F5',
    fill: false
  }];

  // Chart options
  public lineChartOptions = {
    responsive: true,   // Makes chart responsive to screen size
    scales: {
      y: {
        beginAtZero: true   // Y-axis starts at 0
      }
    }
  };

  // Chart type
  public lineChartType = 'line';



  constructor(
    private purchaseServices: PurchaseServices
  ) {
  }

  ngOnInit() {
    this.monthsSub = this.purchaseServices.getStatistics(2024).subscribe(data => {
      // this.months = data
    })
  }

  ngOnDestroy() {
    this.monthsSub.unsubscribe()
  }

}
