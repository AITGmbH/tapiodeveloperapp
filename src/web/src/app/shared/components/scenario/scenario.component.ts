import { Component, Input, OnInit, TemplateRef } from "@angular/core";
import { ScenarioDocumentationService } from "./scenario-documentation-service";
import { VERSION } from "../../../../environments/version";

/**
 * Represents an abstract scenario. Scenario using this will automatically get the look & feel and behavior they want.
 */
@Component({
    selector: "app-scenario",
    templateUrl: "./scenario.component.html",
    styleUrls: ["./scenario.component.scss"]
})
export class ScenarioComponent implements OnInit {
    private readonly gitHubRepoUrl = "https://github.com/AITGmbH/tapiodeveloperapp/tree/";

    /**
     * The title of the actual scenario.
     */
    @Input()
    public scenarioTitle: string | TemplateRef<any>;

    /**
     * The description of the actual scenario.
     */
    @Input()
    public description: string;
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

    constructor(private readonly scenarioDocumentationService: ScenarioDocumentationService) {
        this.version = VERSION.hash;
    }

    ngOnInit(): void {
        this.scenarioDocumentationService
            .getUrls(this.id)
            .subscribe(docPaths => {
                if (docPaths.backend) {
                    this.hasBackendUrl = true;
                    this.backendUrl = `${this.gitHubRepoUrl}${this.version}/${docPaths.backend}`;
                }

                if (docPaths.frontend) {
                    this.frontendUrl = `${this.gitHubRepoUrl}${this.version}/${docPaths.frontend}`;
                }

                if (docPaths.tapio) {
                    this.tapioDocumentationUrl = docPaths.tapio;
                }
            });
    }

    isString(value: string | TemplateRef<any>): value is string {
        return typeof value === "string";
    }

    isTemplateRef(value: string | TemplateRef<any>): value is TemplateRef<any> {
        return typeof value !== "string";
    }
}
