import {
    Directive,
    KeyValueChangeRecord,
    KeyValueDiffer,
    KeyValueDiffers,
    Input,
    ElementRef,
    DoCheck
} from "@angular/core";
import { AnimationPlayer, AnimationBuilder, AnimationMetadata, style, animate } from "@angular/animations";
import { isEqual } from "lodash";

@Directive({
    selector: "[live-data-update]"
})
export class LiveDataUpdateDirective implements DoCheck {
    @Input() liveDataValue = {};
    private readonly differ: KeyValueDiffer<any, any>;
    private animationPlayer: AnimationPlayer;

    constructor(
        private readonly differs: KeyValueDiffers,
        private readonly host: ElementRef,
        private readonly animationBuilder: AnimationBuilder
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
                backgroundColor: "#0092b4"
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
