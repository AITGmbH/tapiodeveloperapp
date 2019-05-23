import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
    selector: "app-not-found",
    template: ``
})
export class NotFoundComponent implements OnInit {
    private params: Params;
    constructor(route: ActivatedRoute, private readonly router: Router) {
        this.params = route.snapshot.queryParams;
    }

    ngOnInit() {
        // handle authentication token - workaround, because path /scenario-userdata is not allowed in redirect_url in authentication
        if (this.params && this.params.id_token) {
            console.log('got id_token, redirecting to userdata');
            this.router.navigate(["/scenario-userdata"], {
                queryParamsHandling: "preserve"
            });
            // successfully authenticated
        }
    }
}
