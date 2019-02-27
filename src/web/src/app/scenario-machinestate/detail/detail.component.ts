import { Component, OnInit } from '@angular/core';
import { MachineStateService } from '../scenario-machinestate-service';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
    id$: Observable<string>;
    machineStates$: Observable<any[]>;

    constructor(private machineStateService: MachineStateService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id$ = of(params.tmid as string);
        });

        this.id$.subscribe(id => {
            this.machineStates$ = this.machineStateService.getMachineState(id);
        });
    }
}
