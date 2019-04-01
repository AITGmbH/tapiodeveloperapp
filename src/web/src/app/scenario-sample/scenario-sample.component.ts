import { Component, OnInit } from "@angular/core";
import { HelloWorldService } from "./scenario-sample.service";

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
        this.helloWorldService.getWelcome().subscribe(welcome => {
            this.Welcome$ = welcome;
        });
    }
}
