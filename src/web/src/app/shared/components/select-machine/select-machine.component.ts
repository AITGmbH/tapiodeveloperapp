import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Observable, of } from "rxjs";
import { AssignedMachine } from "../../models/assigned-machine.model";
import { HistoricalDataService } from 'src/app/scenario-historicaldata/scenario-historicaldata.service';

@Component({
  selector: "app-select-machine",
  templateUrl: "select-machine.component.html",
  styleUrls: ["./select-machine.component.css"]
})

export class SelectMachineComponent implements OnInit {
    public assignedMachines: Observable<AssignedMachine[]>;

  @Output() public change: EventEmitter<string> = new EventEmitter<string>();

  constructor(private historicalDataService: HistoricalDataService) {
   }

  ngOnInit() {
    this.historicalDataService.getMachines().subscribe(
        machines => {
            this.assignedMachines = of(machines);
        },
        error => {
            console.error("could not load machines", error);
        }
    );
  }

  public selectedMachineChanged(machine: AssignedMachine) {
      if (!machine) {
          return;
      }
      if (!machine.tmid) {
          return;
      }
      this.change.emit(machine.tmid);
  }
}
