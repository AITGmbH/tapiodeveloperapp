import { Component, OnInit, OnDestroy } from "@angular/core";
import { ScenarioUserdataService } from "./scenario-userdata.service";
import { Subscription } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import { LocalStorageService } from "../shared/services/local-storage.service";
@Component({
  selector: "app-scenario-userdata",
  templateUrl: "./scenario-userdata.component.html"
})
export class ScenarioUserDataComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }
  private subscription: Subscription;
  public jwtToken: any;
  constructor(
    private readonly userDataService: ScenarioUserdataService,
    private readonly localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    const token: string = this.localStorageService.get<string>("OAuthToken");
    if (token) {
      const helper = new JwtHelperService();
      this.jwtToken = helper.decodeToken(token);
      // successfully authenticated
    } else {
      // trigger authentication.
      const redirectUri = window.location.origin;
      this.subscription = this.userDataService.getClientId().subscribe(clientId => {
        // actual uri
        window.location.href = `https://login.microsoftonline.com/tapiousers.onmicrosoft.com/oauth2/v2.0/authorize?client_id=${clientId}&p=B2C_1A_Tapio_Signin&response_type=id_token&scope=openid&redirect_uri=${redirectUri}&response_mode=query`;
      });
    }
  }
}
