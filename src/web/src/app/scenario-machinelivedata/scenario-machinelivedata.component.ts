import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ScenarioMachineLiveDataService } from "./scenario-machinelivedata.service";

@Component({
    selector: "app-scenario-machinelivedata",
    templateUrl: "./scenario-machinelivedata.component.html",
    styleUrls: ["./scenario-machinelivedata.component.css"]
})
export class ScenarioMachineLiveDataComponent implements OnInit {
    private selectedMachine: string;

    constructor(private liveDataService: ScenarioMachineLiveDataService, private http: HttpClient) {}

    public async ngOnInit() {
        await this.liveDataService.startConnectionAsync("/hubs/machinelivedata");
    }

    public async selectedMachineChanged(machineId: string) {
        if (machineId != null && machineId !== "") {
            if (this.selectedMachine != null) {
                await this.liveDataService.leaveGroup(this.selectedMachine);
            }
            this.selectedMachine = machineId;
            await this.liveDataService.joinGroup(this.selectedMachine);
            this.liveDataService.addDataListener();
            this.startRequest();
        }
    }

    private startRequest() {
        this.http.get(`/api/machinelivedata/${this.selectedMachine}`).subscribe(res => console.log(res));
    }
}
