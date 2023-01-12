import { Color, Icon } from "src/app/utilities/dto";
import { Component, Input } from "@angular/core";

@Component({ selector: 'app-button', templateUrl: './button.component.html' })
export class ButtonComponent {

    @Input()
    public properties?: ButtonProperties;
}

export interface ButtonProperties { color: Color; icon: Icon; }