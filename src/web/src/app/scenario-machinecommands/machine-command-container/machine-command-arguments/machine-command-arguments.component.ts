import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MachineCommandArgument } from "../../scenario-machinecommands.service";

@Component({
    selector: "app-machine-command-arguments",
    templateUrl: "./machine-command-arguments.component.html",
    styleUrls: ["./machine-command-arguments.component.scss"]
})
export class MachineCommandArgumentsComponent implements OnInit {
    private _args: any;
    public args: MachineCommandArgument[] = [];

    @Input("arguments") public set setMachineCommandArguments(args: any) {
        this.handleArguments(args);
    }
    @Output() argumentsChange = new EventEmitter();
    constructor() {}

    ngOnInit() {}

    public handleArguments(args: any) {
        if (!args) {
            return;
        }
        this._args = args;
        for (const argumentName in args) {
            if (args.hasOwnProperty(argumentName)) {
                const arg = args[argumentName];
                const machineArgument = new MachineCommandArgument(argumentName, arg.valueType, arg.value);
                this.args.push(machineArgument);
            }
        }
    }

    public valueChange(arg: MachineCommandArgument) {
        const value = parseFloat(arg.value);
        this._args[arg.name].value = value;
        const machineCommand = this.args.find(el => el.name === arg.name);
        if (machineCommand) {
            machineCommand.value = value;
        }
        this.argumentsChange.emit(this._args);
    }
}
