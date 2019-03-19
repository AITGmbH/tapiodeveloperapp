import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.css']
})
export class DateRangeComponent implements OnInit {

    @Input()
    public dateTimeFrom: Date;

    @Input()
    public dateTimeTo: Date;
  
    ngOnInit(): void {

  }

}

    //ngOnInit(): void {
    //    this.scenarioDocumentationService
    //        .getUrls(this.id)
    //        .subscribe(docPaths => {
    //            if (docPaths.backend) {
    //                this.hasBackendUrl = true;
    //                this.backendUrl =
    //                    this.gitHubRepoUrl +
    //                    this.version +
    //                    "/" +
    //                    docPaths.backend;
    //            }

    //            if (docPaths.frontend) {
    //                this.frontendUrl =
    //                    this.gitHubRepoUrl +
    //                    this.version +
    //                    "/" +
    //                    docPaths.frontend;
    //            }

    //            if (docPaths.tapio) {
    //                this.tapioDocumentationUrl = docPaths.tapio;
    //            }
    //        });
    //}
