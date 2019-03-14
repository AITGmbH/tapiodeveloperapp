import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HistoricalDataService, SourceKeysResponse } from './scenario-historicaldata-service';
import { Subscription, MachineOverviewService, AssignedMachine } from '../scenario-machineoverview/scenario-machineoverview-service';

@Component({
  selector: 'app-scenario-historicaldata',
  templateUrl: './scenario-historicaldata.component.html',
  styleUrls: ['./scenario-historicaldata.component.css']
})
export class ScenarioHistoricaldataComponent implements OnInit {
    assignedMachines: Observable<AssignedMachine[]>;
    sourceKeys: Observable<SourceKeysResponse>;
    errorLoading$ = new Subject<boolean>();

    constructor(private historicalDataService: HistoricalDataService) { }

    ngOnInit() {
        this.historicalDataService.getMachines().subscribe(machines => {
            this.assignedMachines = of(machines);

        }, error => {
            console.error('could not load machines', error);
            this.errorLoading$.next(true);
        });
    }
    
    selectedMachineChanged(machine: AssignedMachine) {
        console.log(machine);
        this.sourceKeys = null;
        this.historicalDataService.getSourceKeys(machine.tmid).subscribe(
            sourceKeys => {
                this.sourceKeys = of(sourceKeys);
            },
            error => {
                console.error('could not load sourceKeys', error);
                this.errorLoading$.next(true);
            }
        );
    }
}
