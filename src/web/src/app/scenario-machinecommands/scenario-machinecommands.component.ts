import { Component, OnInit } from "@angular/core";
import { MachineCommandsService, CommandItem } from "./scenario-machinecommands.service";
import { Observable } from "rxjs";

@Component({
    selector: "app-scenario-machinecommands",
    templateUrl: "./scenario-machinecommands.component.html",
    styleUrls: ["./scenario-machinecommands.component.css"]
})
export class MachineCommandsComponent implements OnInit {
    public commands$: Observable<CommandItem[]>;
    constructor(private machineCommandsService: MachineCommandsService) {}
    ngOnInit() {
        this.commands$ = this.machineCommandsService.getCommandsAsync();
    }

    public execute() {
        // const commandItem = { id: "123", serverId: "456", tmid: "798" } as CommandItemRead;
        // const observable = this.machineCommandsService.readItem(commandItem);
        // observable.subscribe(result => {
        //     console.log(result);
        // });
    }
}
