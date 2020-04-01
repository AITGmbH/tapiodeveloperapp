import { Component, OnInit } from "@angular/core";
import { MachineCommandsService, CommandItem } from "./scenario-machinecommands.service";
import { Observable } from "rxjs";

@Component({
    selector: "app-scenario-machinecommands",
    templateUrl: "./scenario-machinecommands.component.html"
})
export class MachineCommandsComponent implements OnInit {
    public commands$: Observable<CommandItem[]>;
    constructor(private readonly machineCommandsService: MachineCommandsService) {}
    ngOnInit() {
        this.commands$ = this.machineCommandsService.getCommandsAsync();
    }
}
