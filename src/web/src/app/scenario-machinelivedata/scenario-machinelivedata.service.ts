import { Injectable } from "@angular/core";
import { SignalRService } from "../shared/services/signalr.service";

@Injectable()
export class ScenarioMachineLiveDataService extends SignalRService {
    public async joinGroup(machineId: string): Promise<void> {
        return this.hubConnection.send("JoinGroup", machineId);
    }

    public async leaveGroup(machineId: string): Promise<void> {
        return this.hubConnection.send("LeaveGroup", machineId);
    }

    public addDataListener() {
        this.hubConnection.on("transferdata", data => {
            console.log(data);
        });
    }
}
