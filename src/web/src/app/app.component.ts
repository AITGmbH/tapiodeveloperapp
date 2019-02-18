import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'developerapp';
  isHamburgerMenuActive = false;

  toogleHamburgerMenu() {
    this.isHamburgerMenuActive = !this.isHamburgerMenuActive;
  }
}
