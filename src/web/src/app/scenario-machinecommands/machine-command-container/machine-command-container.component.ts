import { Component, OnInit, Input } from "@angular/core";
import { MachineCommandsService, CommandItem, CommandResponse } from "../scenario-machinecommands.service";
import { Observable } from "rxjs/internal/Observable";
import { of, Subject } from "rxjs";
import { tap } from "rxjs/internal/operators/tap";
import { catchError } from "rxjs/internal/operators/catchError";
@Component({
    selector: "app-machine-command-container",
    templateUrl: "./machine-command-container.component.html",
    styleUrls: ["./machine-command-container.component.scss"]
})
export class MachineCommandContainerComponent implements OnInit {
    public commandResponse$: Observable<CommandResponse> = of({} as CommandResponse);
    public loading$ = new Subject<boolean>();
    @Input() command: CommandItem;
    constructor(private machineCommandsService: MachineCommandsService) {}

    ngOnInit() {
        this.loading$.next(false);
    }

    public executeCommand() {
        this.loading$.next(true);
        this.commandResponse$ = this.machineCommandsService.executeCommandAsync(this.command).pipe(
            tap(val => this.loading$.next(false)),
            catchError(err => {
                this.loading$.next(false);
                return of(err);
            })
        );
    }
}
