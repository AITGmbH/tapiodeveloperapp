import { Component, OnInit } from '@angular/core';
import { MachineStateService, AssignedMachine } from './scenario-machinestate-service';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-scenario-machinestate',
  templateUrl: './scenario-machinestate.component.html'
})
export class ScenarioMachinestateComponent implements OnInit {
    machines$: Observable<AssignedMachine[]>;
    initialMachineId: string;

    constructor(private machineStateService: MachineStateService, 
      private readonly router: Router, 
      private readonly route: ActivatedRoute) { }

    ngOnInit() {
        this.machines$ = this.machineStateService.getMachines();

        this.initialMachineId = this.route.snapshot.params.tmid;
    }

    selectedMachineChanged(machineId: string) {
      this.router.navigate(['scenario-machinestate', machineId])
    }
}
