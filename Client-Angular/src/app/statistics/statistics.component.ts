import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {

  isOverallOpened = false
  isCategorizedOpened = false

  constructor() {
  }

  ngOnInit() {
  }

}
