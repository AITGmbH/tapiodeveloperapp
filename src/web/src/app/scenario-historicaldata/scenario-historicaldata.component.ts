import { Component, OnInit } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import {
    HistoricalDataService,
    SourceKeysResponse
} from "./scenario-historicaldata-service";
import {
    Subscription,
    MachineOverviewService,
    AssignedMachine
} from "../scenario-machineoverview/scenario-machineoverview-service";

@Component({
    selector: "app-scenario-historicaldata",
    templateUrl: "./scenario-historicaldata.component.html",
    styleUrls: ["./scenario-historicaldata.component.css"]
})
export class ScenarioHistoricaldataComponent implements OnInit {
    assignedMachines: Observable<AssignedMachine[]>;
    sourceKeys: Observable<SourceKeysResponse[]>;
    error$ = new Subject<boolean>();
    loading$ = new Subject<boolean>();
    loadingMachines$ = new Subject<boolean>();

    rows = [
        { name: "Austin", gender: "Male", company: "Swimlane" },
        { name: "Dany", gender: "Male", company: "KFC" },
        { name: "Molly", gender: "Female", company: "Burger King" }
    ];
    columns = [{ prop: "name" }, { name: "Gender" }, { name: "Company" }];

    constructor(private historicalDataService: HistoricalDataService) {
        this.error$.next(false);
        this.loading$.next(false);
        this.loadingMachines$.next(false);
    }

    ngOnInit() {
        this.loadingMachines$.next(true);
        this.historicalDataService.getMachines().subscribe(
            machines => {
                this.assignedMachines = of(machines);
                this.loadingMachines$.next(false);
            },
            error => {
                console.error("could not load machines", error);
                this.loadingMachines$.next(false);
                this.error$.next(true);
            }
        );
    }

    selectedMachineChanged(machine: AssignedMachine) {
        console.log(machine);
        this.loading$.next(true);
        this.error$.next(false);
        this.sourceKeys = null;
        this.historicalDataService.getSourceKeys(machine.tmid).subscribe(
            sourceKeys => {
                this.sourceKeys = of(sourceKeys);
                this.loading$.next(false);
            },
            error => {
                console.error("could not load sourceKeys", error);
                this.loading$.next(false);
                this.error$.next(true);
            }
        );
    }
}
