import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';

import * as moment from 'moment';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DateRangeComponent implements OnInit {

  @Output() public change: EventEmitter<{ dateStart: Date, dateEnd: Date }> = new EventEmitter<{ dateStart: Date, dateEnd: Date }>();


  public get dateStart(): Date {
    return this.dateTimeRange[0];
  }

  public get dateEnd(): Date {
    return this.dateTimeRange[1];
  }

  public dateTimeRange: Date[] = [
    moment().subtract(30, 'days').toDate(),
    moment().toDate()
  ];

  public dateTimeChanged() {

    if (!this.dateStart) {
      return;
    }
    if (!this.dateEnd) {
      return;
    }
    this.change.emit({ dateStart: this.dateStart, dateEnd: this.dateEnd });
  }
  ngOnInit(): void {

  }

}
