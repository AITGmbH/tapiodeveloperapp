import { Component, OnInit, HostListener } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
    public title = "developerapp";
    public showScrollToTopBtn = false;

    constructor(private readonly router: Router) {}

    ngOnInit(): void {
        this.router.events.subscribe(evt => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            this.scrollToTop();
        });
        this.createNavbarBurgerToggle();
    }

    @HostListener("window:scroll", ["$event"]) // for window scroll events
    onScroll(event) {
        if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
            this.showScrollToTopBtn = true;
        } else if (
            (this.showScrollToTopBtn && window.pageYOffset) ||
            document.documentElement.scrollTop ||
            document.body.scrollTop < 10
        ) {
            this.showScrollToTopBtn = false;
        }
    }

    private scrollToTop() {
        (function scroll() {
            const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
                window.requestAnimationFrame(scroll);
                window.scrollTo(0, currentScroll - currentScroll / 4);
            }
        })();
    }

    private createNavbarBurgerToggle() {
        // Get all "navbar-burger" elements
        const navbarBurgers = document.querySelectorAll(".navbar-burger");
        // const navbarBurgers = Array.prototype.slice.call(document.querySelectorAll(".navbar-burger"), 0);
        // Check if there are any navbar burgers
        if (navbarBurgers.length > 0) {
            // Add a click event on each of them
            navbarBurgers.forEach((el: any) => {
                el.addEventListener("click", () => {
                    // Get the target from the "data-target" attribute
                    const target = el.dataset.target;
                    const $target = document.getElementById(target);
                    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                    el.classList.toggle("is-active");
                    $target.classList.toggle("is-active");
                });
            });
        }
    }
}
