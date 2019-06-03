import { Component, OnInit } from "@angular/core";
import { LocalStorageService } from "src/app/shared/services/local-storage.service";

@Component({
  selector: "app-userdata-logout",
  template: `
    <app-scenario title="Logout" id="logout-scenario">
      <div *ngIf="loggedOut; else redirectScreen">You have been logged out.</div>
      <ng-template #redirectScreen>
        <div>
          You are getting redirected to the logout...
        </div>
      </ng-template>
    </app-scenario>
  `
})
export class LogoutComponent implements OnInit {
  public loggedOut: boolean = false;
  constructor(private readonly localStorageService: LocalStorageService) {}

  ngOnInit() {
    const token: string = this.localStorageService.get<string>("OAuthToken");
    if (token) {
      this.logout();
    } else {
      this.loggedOut = true;
    }
  }

  logout() {
    const redirectUri = window.location.origin;
    const encodedRedirectUri = encodeURIComponent(redirectUri);
    // should be handled inside notfoundcomponent, if post_logout_redirect_uri works.
    this.localStorageService.remove("OAuthToken");

    window.location.href = `https://login.microsoftonline.com/tapiousers.onmicrosoft.com/oauth2/v2.0/logout?post_logout_redirect_uri=${encodedRedirectUri}`;
  }
}
