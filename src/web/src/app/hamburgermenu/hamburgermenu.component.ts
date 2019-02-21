import { Component } from '@angular/core';

/***
 * Displays the developer links in a hamburger menu.
 */
@Component({
  selector: 'app-hamburgermenu',
  templateUrl: './hamburgermenu.component.html',
  styleUrls: ['./hamburgermenu.component.css']
})
export class HamburgermenuComponent {
  isHamburgerMenuActive = false;

  constructor() { }

  toogleHamburgerMenu() {
    this.isHamburgerMenuActive = !this.isHamburgerMenuActive;
  }
}
