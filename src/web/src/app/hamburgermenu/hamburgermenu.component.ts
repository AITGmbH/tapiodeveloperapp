import { Component, OnInit } from '@angular/core';

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
