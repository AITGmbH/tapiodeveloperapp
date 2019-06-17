import { Component, OnInit } from "@angular/core";
import { MachineCommandsService, CommandItemRead, commandType } from "./scenario-machinecommands.service";

@Component({
    selector: "app-scenario-machinecommands",
    templateUrl: "./scenario-machinecommands.component.html"
})
export class MachineCommandsComponent implements OnInit {
    constructor(private machineCommandsService: MachineCommandsService) {}

    ngOnInit() {}

    public execute() {
        const commandItem = { id: "123", serverId: "456", tmid: "798" } as CommandItemRead;
        const observable = this.machineCommandsService.readItem(commandItem);
        observable.subscribe(result => {
            console.log(result);
        });
    }
}
