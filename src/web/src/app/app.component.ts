import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
    title = "developerapp";
    constructor(private router: Router) {
        this.router.events.subscribe(segments => {
            if (this.mainContent) {
                this.mainContent.nativeElement.scrollTop = 0;
                this.mainContent.nativeElement.scrollLeft = 0;
            }
        });
    }
    @ViewChild("mainContent")
    public mainContent: ElementRef;

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
}
