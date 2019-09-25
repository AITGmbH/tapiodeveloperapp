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

    constructor(private router: Router) {}

    ngOnInit(): void {
        this.router.events.subscribe(evt => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            // this.scrollToTop();
        });
        this.createNavbarBurgerToggle();
    }

    // @HostListener("window:scroll", ["$event"]) // for window scroll events
    // onScroll(event) {
    //     const mainDiv = document.getElementById("scrollableContainer");
    //     if (mainDiv.scrollTop > 0) {
    //         this.showScrollToTopBtn = true;
    //     } else {
    //         this.showScrollToTopBtn = false;
    //     }
    // }

    public scrollbarOptions = { axis: "y", theme: "minimal-dark" };

    private scrollToTop() {
        // const mainDiv = document.getElementById('scrollableContainer');
        // //mainDiv.scrollTop = 0;
        // let scrollToTop = window.setInterval(() => {
        //     var pos = mainDiv.scrollTop;
        //     if (pos > 0) {
        //         mainDiv.scrollTo(0, pos - 20); // how far to scroll on each step
        //     } else {
        //         window.clearInterval(scrollToTop);
        //         this.showScrollToTopBtn = false;
        //     }
        // }, 16);
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
