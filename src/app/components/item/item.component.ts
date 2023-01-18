import { ButtonProperties } from "../button/button.component";
import { Color, Icon } from "src/app/utilities/dto";
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({ selector: 'app-item', templateUrl: './item.component.html' })
export class ItemComponent {

    @Input() public primaryButton?: ButtonProperties;
    @Input() public secondaryButton?: ButtonProperties;

    @Input() public initials?: string;
    @Input() public message?: any;
    
    @Output() public primaryEmitter: EventEmitter<void> = new EventEmitter();
    @Output() public secondaryEmitter: EventEmitter<void> = new EventEmitter();

    public error?: ButtonProperties = { color: Color.DANGER, icon: Icon.EXCLAMATION };
}