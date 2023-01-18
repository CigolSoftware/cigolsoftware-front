import { ButtonProperties } from "../button/button.component";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Color, Icon } from "src/app/utilities/dto";

@Component({ selector: 'app-item', templateUrl: './item.component.html' })
export class ItemComponent {

    @Input() public button?: ButtonProperties;
    @Input() public initials?: string;
    @Input() public message?: any;
    @Output() public emitter: EventEmitter<void> = new EventEmitter();

    public error?: ButtonProperties = { color: Color.DANGER, icon: Icon.EXCLAMATION };
}