import { Component } from "@angular/core";
import { NavigationService } from "../shared/services/navigation.service";

/***
 * Displays the developer links in a dropdown menu.
 */
@Component({
    selector: "[app-external-links-dropdown]",
    templateUrl: "./external-links-dropdown.component.html",
    styleUrls: ["./external-links-dropdown.component.scss"]
})
export class ExternalLinksDropdownComponent {
    constructor(private readonly navigationService: NavigationService) {}

    public selectEntry() {
        this.navigationService.toggleMenu();
    }
}
