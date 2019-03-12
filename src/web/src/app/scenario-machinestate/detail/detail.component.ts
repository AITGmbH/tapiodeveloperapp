import { Component, OnInit } from '@angular/core';
import { MachineStateService, ItemData, Condition, LastKnownState } from '../scenario-machinestate-service';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
    id$: Observable<string>;
    itemData$: Observable<ItemData[]>;
    conditions$: Observable<Condition[]>;

    constructor(private machineStateService: MachineStateService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id$ = of(params.tmid as string);
        });

        this.id$.subscribe(id => {
            this.machineStateService.getLastKnownStateFromMachine(id).subscribe(lastKnownState => {
                this.itemData$ = of(lastKnownState.itds);
                this.conditions$ = of(lastKnownState.conds);
            });
        });
    }
}
