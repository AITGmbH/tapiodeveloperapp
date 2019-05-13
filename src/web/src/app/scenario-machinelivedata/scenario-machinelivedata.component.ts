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
        // if (machineId != null && machineId !== "") {
        this.selectedMachine = machineId;
        this.liveDataService.addDataListener(this.onStreamData);
        this.startRequest();
        // }
    }

    public onStreamData(data: string) {
        console.log(data);
    }

    private startRequest() {
        this.http.get(`/api/machinelivedata`).subscribe(res => console.log(res));
    }
}
