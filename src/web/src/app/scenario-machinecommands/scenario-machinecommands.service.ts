import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export enum commandType {
    write = "itemWrite",
    read = "itemRead",
    method = "method"
}

@Injectable()
export class MachineCommandsService {
    constructor(private httpClient: HttpClient) {}

    public executeCommandAsync(commandItem: CommandItem): Observable<CommandResponse> {
        return this.httpClient.post<CommandResponse>(`/api/machineCommands/${commandItem.commandType}`, commandItem);
    }

    public getCommandsAsync(): Observable<CommandItem[]> {
        return this.httpClient.get<CommandItem[]>("/api/machineCommands/commands");
    }
}

export enum CommandResponseStatus {
    Successfull = 200,
    Failed = 400,
    DeviceBusy = 429,
    Error = 500
}

export class CommandItem {
    public id: string;
    public tmid: string;
    public serverId: string;
    public commandType: commandType;
    public inArguments: any;
}

export class CommandResponse {
    public CloudConnectorId: string;
    public Status: CommandResponseStatus;
    public StatusDescrption: string;
    public Response: any;
}

export enum CommandValueType {
    Int32 = "Int32",
    UInt32 = "UInt32",
    Boolean = "Boolean",
    String = "String",
    Byte = "byte[]",
    Double = "Double",
    Float = "Float"
}

export class MachineCommandArgument {
    constructor(name: string, valueType: CommandValueType, value: any) {
        this.name = name;
        this.valueType = valueType;
        this.value = value;
    }
    name: string;
    valueType: CommandValueType;
    value: any;
}
