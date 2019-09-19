import { Component, OnInit, Input } from "@angular/core";
import { MachineCommandsService, CommandItem, CommandResponse } from "../scenario-machinecommands.service";
import { Observable } from "rxjs/internal/Observable";
import { of } from "rxjs";
import { tap } from "rxjs/internal/operators/tap";
import { catchError } from "rxjs/internal/operators/catchError";
@Component({
    selector: "app-machine-command-container",
    templateUrl: "./machine-command-container.component.html",
    styleUrls: ["./machine-command-container.component.scss"]
})
export class MachineCommandContainerComponent implements OnInit {
    public commandResponse$: Observable<CommandResponse> = of({} as any);
    public loading = false;
    @Input() command: CommandItem;
    constructor(private machineCommandsService: MachineCommandsService) {}

    ngOnInit() {}
    public executeCommand() {
        this.loading = true;
        this.commandResponse$ = this.machineCommandsService.executeCommandAsync(this.command).pipe(
            tap(val => (this.loading = false)),
            catchError(err => {
                this.loading = false;
                return of(err);
            })
        );
    }
}
