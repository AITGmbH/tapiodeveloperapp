import { Component, OnInit, ViewChild, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { PerfectScrollbarComponent } from "ngx-perfect-scrollbar";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
    title = "developerapp";
    public showScrollToTopBtn = false;

    constructor(private readonly router: Router, public zone: NgZone) {
        this.router.events.subscribe(segments => {
            this.scrollToTop();
        });
    }
    @ViewChild("mainContentScrollbar")
    public mainContent: PerfectScrollbarComponent;

    ngOnInit(): void {
        // Get all "navbar-burger" elements
        const navbarBurgers = Array.prototype.slice.call(document.querySelectorAll(".navbar-burger"), 0);

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

    public scrollToTop(): void {
        if (this.mainContent && this.mainContent.directiveRef) {
            this.mainContent.directiveRef.scrollToTop();
        }
    }

    // use ngZone because Event is out of Zone https://stackoverflow.com/a/41724333
    public onScrollYReachStart(): void {
        this.zone.run(()=> this.showScrollToTopBtn = false)
    }

    public onScrollDown(): void {
        
        this.zone.run(()=> this.showScrollToTopBtn = true)
    }
}
