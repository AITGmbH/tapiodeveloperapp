import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Subscription, MachineOverviewService } from './scenario-machineoverview-service';

@Component({
  selector: 'app-scenario-machineoverview',
  templateUrl: './scenario-machineoverview.component.html',
  styleUrls: ['./scenario-machineoverview.component.css']
})
export class ScenarioMachineoverviewComponent implements OnInit {
    subscriptions$: Observable<Subscription[]>;
    errorLoading$ = new Subject<boolean>();

    constructor(private machineOverviewService: MachineOverviewService) { }

    ngOnInit() {
        this.machineOverviewService.getSubscriptions().subscribe(subscriptions => {
            this.subscriptions$ = of(subscriptions);
        }, error => {
            console.error('could not load machine overview', error);
            this.errorLoading$.next(true);
        });
    }
}
