import { Component, OnInit } from '@angular/core';
import { MachineStateService, AssignedMachine } from './scenario-machinestate-service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scenario-machinestate',
  templateUrl: './scenario-machinestate.component.html',
  styleUrls: ['./scenario-machinestate.component.css']
})
export class ScenarioMachinestateComponent implements OnInit {
    machines$: Observable<AssignedMachine[]>;

    constructor(private machineStateService: MachineStateService, private readonly router: Router) { }

    ngOnInit() {
        this.machines$ = this.machineStateService.getMachines();
    }

    selectedMachineChanged(machineId: string) {
      this.router.navigate(['scenario-machinestate', machineId])
    }

}
