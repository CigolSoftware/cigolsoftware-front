import { ButtonProperties } from "../button/button.component";
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({ selector: 'app-item', templateUrl: './item.component.html' })
export class ItemComponent {

    @Input()
    public button?: ButtonProperties;
    
    @Input()
    public errorButton?: ButtonProperties;

    @Input()
    public errorMessage?: any;

    @Output()
    public emitter: EventEmitter<void> = new EventEmitter();

}