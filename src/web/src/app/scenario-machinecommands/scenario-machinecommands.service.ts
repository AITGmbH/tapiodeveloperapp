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

    public readItem(commandItem: CommandItemRead): Observable<CommandResponse> {
        commandItem.commandType = commandType.read;
        return this.httpClient.post<CommandResponse>("/api/machineCommands/read", commandItem);
    }
}

export enum CommandResponseStatus {
    Successfull = 200,
    Failed = 400,
    DeviceBusy = 429,
    Error = 500
}

export class CommandItemRead {
    public id: string;
    public tmid: string;
    public serverId: string;
    public commandType: commandType;
}

export class CommandResponse {
    public CloudConnectorId: string;
    public Status: CommandResponseStatus;
    public StatusDescrption: string;
    public Response: any;
}
