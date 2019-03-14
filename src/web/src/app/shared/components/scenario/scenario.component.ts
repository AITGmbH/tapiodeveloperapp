import { Component, Input, OnInit, Output } from "@angular/core";
import { ScenarioDocumentationService } from "./scenario-documentation-service";
import { VERSION } from "src/environments/version";

/**
 * Represents an absctract scenario. Scenario using this will automatically get the look & feel and behavior they want.
 */
@Component({
    selector: "app-scenario",
    templateUrl: "./scenario.component.html",
    styleUrls: ["./scenario.component.css"]
})
export class ScenarioComponent implements OnInit {
    private gitHubRepoUrl =
        "https://github.com/AITGmbH/tapiodeveloperapp/tree/";

    /**
     * The title of the actual scenario.
     */
    @Input()
    public title: string;

    /**
     * The id of the actual scenario.
     */
    @Input()
    public id: string;

    /**
     * The backend github URL of the actual scenario.
     */
    public backendUrl: string;

    /**
     * The frontend github URL of the actual scenario.
     */
    public frontendUrl: string;

    /**
     * The tapio documentation URL of the actual scenario.
     */
    public tapioDocumentationUrl: string;

    /**
     * Specifies whether there is a backend URL of the actual scenario.
     */
    public hasBackendUrl: boolean;

    version: string;

    constructor(
        private scenarioDocumentationService: ScenarioDocumentationService
    ) {
        this.version = VERSION.hash;
    }

    ngOnInit(): void {
        this.scenarioDocumentationService
            .getUrls(this.id)
            .subscribe(docPaths => {
                if (docPaths.backend) {
                    this.hasBackendUrl = true;
                    this.backendUrl =
                        this.gitHubRepoUrl +
                        this.version +
                        "/" +
                        docPaths.backend;
                }

                if (docPaths.frontend) {
                    this.frontendUrl =
                        this.gitHubRepoUrl +
                        this.version +
                        "/" +
                        docPaths.frontend;
                }

                if (docPaths.tapio) {
                    this.tapioDocumentationUrl = docPaths.tapio;
                }
            });
    }
}
