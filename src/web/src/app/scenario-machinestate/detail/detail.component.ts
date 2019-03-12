import { Component, OnInit } from '@angular/core';
import { MachineStateService, ItemData } from '../scenario-machinestate-service';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
    id$: Observable<string>;
    itemData$: Observable<ItemData[]>;

    constructor(private machineStateService: MachineStateService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id$ = of(params.tmid as string);
        });

        this.id$.subscribe(id => {
            this.itemData$ = this.machineStateService.getMachineState(id).pipe(map(states => {
                 return [].concat(...states.itds);
            }));
        });
    }
}
