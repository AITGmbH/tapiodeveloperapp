import { Injectable } from "@angular/core";
import { SignalRService } from "../shared/services/signalr.service";

@Injectable()
export class ScenarioMachineLiveDataService extends SignalRService {
    private hasActiveDataListener = false;

    public async joinGroupAsync(machineId: string): Promise<void> {
        return this.hubConnection.send("joinGroup", machineId);
    }

    public async leaveGroupAsync(machineId: string): Promise<void> {
        return this.hubConnection.send("leaveGroup", machineId);
    }

    public addDataListener(func: (data: string) => void) {
        if (this.hasActiveDataListener) {
            this.removeDataListener(func);
        }
        this.hubConnection.on("streamMachineData", func);
        this.hasActiveDataListener = true;
    }

    public removeDataListener(func: (data) => void) {
        this.hubConnection.off("streamMachineData", func);
        this.hasActiveDataListener = false;
    }
}
