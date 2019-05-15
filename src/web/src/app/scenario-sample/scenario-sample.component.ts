import { Component, OnInit } from "@angular/core";
import { HelloWorldService } from "./scenario-sample.service";
import { Observable, of } from "rxjs";

/**
 * Represents the official sample scenario.
 */
@Component({
  selector: "app-scenario-sample",
  templateUrl: "./scenario-sample.component.html",
  styleUrls: ["./scenario-sample.component.css"]
})
export class ScenarioSampleComponent implements OnInit {
    public Welcome$: Observable<string>;

    constructor(private readonly helloWorldService: HelloWorldService) { }

    ngOnInit(): void {
        this.Welcome$ = this.helloWorldService.getWelcome();
    }
}
