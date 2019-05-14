import {
    Directive,
    KeyValueChangeRecord,
    KeyValueDiffer,
    KeyValueDiffers,
    Input,
    ElementRef,
    DoCheck,
    Renderer2
} from "@angular/core";

@Directive({
    selector: "[live-data-update]"
})
export class LiveDataUpdateDirective implements DoCheck {
    @Input() liveDataValue = {};
    private differ: KeyValueDiffer<any, any>;

    constructor(private differs: KeyValueDiffers, private host: ElementRef, private renderer: Renderer2) {
        this.differ = this.differs.find(this.liveDataValue).create();
    }

    public ngDoCheck() {
        const changes = this.differ.diff(this.liveDataValue);
        this.renderer.removeClass(this.host.nativeElement, "updated");

        if (changes) {
            changes.forEachChangedItem((record: KeyValueChangeRecord<any, any>) => {
                this.renderer.addClass(this.host.nativeElement, "updated");
                console.log("forEachChangedItem - ", record.key, record.currentValue);
            });
        }
    }
}
