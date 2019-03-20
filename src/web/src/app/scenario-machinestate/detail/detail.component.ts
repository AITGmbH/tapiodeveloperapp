import { Component, OnInit, ViewChild } from '@angular/core';
import { MachineStateService, ItemData, Condition } from '../scenario-machinestate-service';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
    id$: Observable<string>;
    itemData$: Observable<ItemData[]>;
    conditions$: Observable<Condition[]>;
    isLoading = true;
    hasError: boolean;
    @ViewChild('itemData') itemData: DatatableComponent;
    @ViewChild('conditions') conditions: DatatableComponent;

    constructor(private machineStateService: MachineStateService, private route: ActivatedRoute) { }

    ngOnInit() {
        const defaultMessage = 'No data to display';

        this.route.params.subscribe(params => {
            this.isLoading = true;
            this.id$ = of(params.tmid as string);
        });

        this.id$.subscribe(id => {
            this.machineStateService.getLastKnownStateFromMachine(id).subscribe(lastKnownState => {
                this.itemData$ = of(lastKnownState.itds);
                this.conditions$ = of(lastKnownState.conds);
                this.itemData.messages.emptyMessage = defaultMessage;
                this.conditions.messages.emptyMessage = defaultMessage;
                this.isLoading = false;
            }, _ => {
                this.isLoading = false;
                this.hasError = true;
                this.itemData.messages.emptyMessage = '';
                this.conditions.messages.emptyMessage = '';
            });
        });
    }
}
