import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { HistoricalDataService } from '../../services/historical-data.service';
import { Subject, Observable, of } from 'rxjs';
import { AssignedMachine } from '../../models/assigned-machine.model';

@Component({
  selector: "app-select-machine",
  templateUrl: "select-machine.component.html",
  styleUrls: ["./select-machine.component.css"]
})

export class SelectMachineComponent implements OnInit {
    private assignedMachines: Observable<AssignedMachine[]>;

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
      if(!machine) {
          return;
      }
      if(!machine.tmid) {
          return;
      }
      this.change.emit(machine.tmid);
  }

}
