import { Component, Input, OnInit, Output } from '@angular/core';
import { ScenarioService } from './scenario-documentation-service';
import { VERSION } from 'src/environments/version';

@Component({
  selector: 'app-scenario',
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.css']
})
export class ScenarioComponent implements OnInit {

    private gitHubRepoUrl = 'https://github.com/AITGmbH/tapiodeveloperapp/tree/';

    @Input()
    public title: string;

    @Input()
    public id: string;

    public backendUrl: string;

    public frontendUrl: string;

    public hasBackendUrl: boolean;

    public hasFrontendUrl: boolean;

    version: string;

    constructor(private scenarioService: ScenarioService) {
        this.version = VERSION.version;
    }

    ngOnInit(): void {
        this.scenarioService.getUrls(this.id).subscribe(docPaths => {
            if (docPaths.backend) {
                this.backendUrl = this.gitHubRepoUrl + this.version + '/' + docPaths.backend;
                this.hasBackendUrl = true;
            }

            if (docPaths.frontend) {
                this.frontendUrl = this.gitHubRepoUrl + this.version + '/' + docPaths.frontend;
                this.hasFrontendUrl = true;
            }
        });
    }
}
