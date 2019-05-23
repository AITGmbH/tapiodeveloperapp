import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { ScenarioUserdataService } from "./scenario-userdata.service";
import { Subscription } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
@Component({
    selector: "app-scenario-userdata",
    templateUrl: "./scenario-userdata.component.html"
})
export class ScenarioUserDataComponent implements OnInit, OnDestroy {
    ngOnDestroy(): void {
        this.subscription && this.subscription.unsubscribe();
    }
    private subscription: Subscription;
    private params: Params;
    public jwtToken: any;
    constructor(private readonly route: ActivatedRoute, private readonly userDataService: ScenarioUserdataService) {
        this.params = route.snapshot.queryParams;
    }

    ngOnInit() {
        if (this.params && this.params.id_token) {
            const helper = new JwtHelperService();
            this.jwtToken = helper.decodeToken(this.params.id_token);
            // successfully authenticated
        } else {
            // trigger authentication.
            this.subscription = this.userDataService.getClientId().subscribe(clientId => {
                // authenticate
                const redirect_uri = window.location.origin;

                // actual uri
                window.location.href = `https://login.microsoftonline.com/tapiousers.onmicrosoft.com/oauth2/v2.0/authorize?client_id=${clientId}&p=B2C_1A_Tapio_Signin&response_type=id_token&scope=openid&redirect_uri=${redirect_uri}&response_mode=query`;
            });
        }
    }
}
