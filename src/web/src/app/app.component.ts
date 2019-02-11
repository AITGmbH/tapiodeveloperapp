import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'developerapp';

  toogleHamburgerMenu(event?: MouseEvent) {
    const target = event.target as HTMLElement;
    const realTarget = target.closest('.hamburger') as HTMLElement;
    realTarget.classList.toggle('is-active');
    document.getElementById('navigation').classList.toggle('is-active');
  }
}
