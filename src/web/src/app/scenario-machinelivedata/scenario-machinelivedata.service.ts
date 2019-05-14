import { Injectable } from "@angular/core";
import { SignalRService } from "../shared/services/signalr.service";
import { Subject } from "rxjs";
import * as moment from "moment";

@Injectable()
export class ScenarioMachineLiveDataService extends SignalRService {
    private hasActiveDataListener = false;
    private data$ = new Subject<MachineLiveDataContainer>();
    private currentGroupName: string;

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
        this.hubConnection.on("streamMachineData", data => this.invokeNewData(data));
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

export enum MessageTypes {
    ItemData = "itd",
    Condition = "cond",
    ConditionRefreshStart = "conds",
    ConditionRefreshEnd = "conde",
    OfflineMessage = "gooffline"
}

export class MachineLiveDataContainer {
    public tmid: string;

    public msgid: string;

    public msgts: moment.Moment | string;

    public msgt: string;

    public msg: string;
}
