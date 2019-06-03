import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { LocalStorageService } from "../services/local-storage.service";

@Component({
    selector: "app-not-found",
    template: ``
})
export class NotFoundComponent implements OnInit {
    private params: Params;
    constructor(route: ActivatedRoute, private readonly router: Router, private readonly localStorageService: LocalStorageService) {
        this.params = route.snapshot.queryParams;
    }

    ngOnInit() {
        // handle authentication token - workaround, because path /scenario-userdata is not allowed in redirect_url in authentication
        if (this.params && this.params.id_token) {
            this.localStorageService.set<string>("OAuthToken", this.params.id_token);
            this.router.navigate(["/scenario-userdata"]);
            // successfully authenticated
        }
        // todo: handle logout param
    }
}
