import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SignalRService } from "../shared/services/signalr.service";
import { Subject } from "rxjs";
import { MachineLiveDataContainer } from "./scenario-machinelivedata.models";

@Injectable()
export class MachineLiveDataService extends SignalRService {
    private hasActiveDataListener = false;
    private data$ = new Subject<MachineLiveDataContainer>();
    private currentGroupName: string;

    constructor(private readonly http: HttpClient) {
        super();
    }

    public async joinGroupAsync(machineId: string): Promise<void> {
        if (this.currentGroupName) {
            if (this.currentGroupName === machineId) {
                return;
            }
            await this.leaveGroupAsync(this.currentGroupName);
        }
        await this.hubConnection.send("joinGroup", machineId);
        this.currentGroupName = machineId;
    }

    public async leaveGroupAsync(machineId: string): Promise<void> {
        return this.hubConnection.send("leaveGroup", machineId);
    }

    public addDataListener(): Subject<MachineLiveDataContainer> {
        if (this.hasActiveDataListener) {
            this.removeDataListener();
        }
        if (this.data$.isStopped) {
            this.data$ = new Subject<MachineLiveDataContainer>();
        }
        this.hubConnection.on("streamMachineData", data =>
            this.invokeNewData(Object.assign(new MachineLiveDataContainer(), data))
        );
        this.hasActiveDataListener = true;
        return this.data$;
    }

    public removeDataListener(): void {
        this.hubConnection.off("streamMachineData");
        this.hasActiveDataListener = false;
    }

    private invokeNewData(data: MachineLiveDataContainer): void {
        this.data$.next(data);
    }
}
