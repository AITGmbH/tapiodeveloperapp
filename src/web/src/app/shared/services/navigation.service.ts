import { Injectable } from "@angular/core";

@Injectable()
export class NavigationService {
    constructor() {}

    public toggleMenu() {
        const navbarBurgers = document.querySelectorAll(".navbar-burger");
        if (navbarBurgers.length > 0) {
            navbarBurgers.forEach((burgerEl: any) => {
                const target = burgerEl.dataset.target;
                const $target = document.getElementById(target);
                burgerEl.classList.toggle("is-active");
                $target.classList.toggle("is-active");
            });
        }
    }
}
