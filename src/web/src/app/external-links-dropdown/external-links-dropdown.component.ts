import { Component } from "@angular/core";
import { NavigationService } from "../shared/services/navigation.service";

/***
 * Displays the developer links in a dropdown menu.
 */
@Component({
    selector: "[app-external-links-dropdown]",
    templateUrl: "./external-links-dropdown.component.html"
})
export class ExternalLinksDropdownComponent {
    constructor(private readonly navigationService: NavigationService) {}

    public selectEntry() {
        this.navigationService.toggleMenu();
    }
}
