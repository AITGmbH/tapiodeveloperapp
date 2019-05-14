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
import {
    AnimationPlayer,
    AnimationBuilder,
    AnimationMetadata,
    style,
    state,
    transition,
    animate
} from "@angular/animations";
import { isEqual } from "lodash";

@Directive({
    selector: "[live-data-update]"
})
export class LiveDataUpdateDirective implements DoCheck {
    @Input() liveDataValue = {};
    private differ: KeyValueDiffer<any, any>;
    private animationPlayer: AnimationPlayer;

    constructor(
        private differs: KeyValueDiffers,
        private host: ElementRef,
        private animationBuilder: AnimationBuilder
    ) {
        this.differ = this.differs.find(this.liveDataValue).create();
        this.setupPlayer();
    }

    public ngDoCheck() {
        const changes = this.differ.diff({ value: this.liveDataValue });

        if (changes) {
            let invokeAnimation = false;
            changes.forEachAddedItem((record: KeyValueChangeRecord<any, any>) => {
                invokeAnimation = true;
            });
            changes.forEachChangedItem((record: KeyValueChangeRecord<any, any>) => {
                if (!isEqual(record.currentValue, record.previousValue)) {
                    invokeAnimation = true;
                }
            });

            if (invokeAnimation) {
                this.animationPlayer.play();
            }
        }
    }

    private setupPlayer(): void {
        if (this.animationPlayer) {
            this.animationPlayer.destroy();
        }
        const factory = this.animationBuilder.build(this.getAnimationMetadata());
        this.animationPlayer = factory.create(this.host.nativeElement);
    }

    private getAnimationMetadata(): AnimationMetadata[] {
        return [
            style({
                backgroundColor: "yellow"
            }),
            animate(
                "1000ms ease-in",
                style({
                    backgroundColor: "inherit"
                })
            )
        ];
    }
}
