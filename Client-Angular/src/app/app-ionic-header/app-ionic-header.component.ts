import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-app-ionic-header',
  templateUrl: './app-ionic-header.component.html',
  styleUrls: ['./app-ionic-header.component.scss'],
})
export class AppIonicHeaderComponent implements OnInit {

  @Input({required: true}) title!: string
  @Input() titleSlot: string = 'start'
  @Input() buttonsSlot: string = 'start'
  @Input({transform: (value: string) => value === '' || 'true'}) hasBackButton: boolean = false
  @Input({transform: (value: string) => value === '' || 'true'}) hasMenuButton: boolean = false

  constructor() {
  }

  ngOnInit() {
  }

}
