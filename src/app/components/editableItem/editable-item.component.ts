import { ButtonProperties } from "../button/button.component";
import { Color, Icon } from "src/app/utilities/dto";
import { Component, Input, ElementRef, ViewChild, Output, EventEmitter } from "@angular/core";
import { Constants, Utilities } from "src/app/utilities/tools";
import { NgForm, NgModel } from "@angular/forms";
import { ProjectService } from "src/app/services/project.service";

@Component({ selector: 'app-editable-item', templateUrl: './editable-item.component.html' })
export class EditableItemComponent {

    @Input() public button?: ButtonProperties;
    @Input() public form = false;
    @Input() public initials?: string;
    @Input() public placeholder?: string;
    @Input() public value?: string;
    @Input() public id?: number;
    @Output() public emitter: EventEmitter<void> = new EventEmitter();
    @ViewChild("ivalue") set iValue(value: ElementRef) { if (value) value.nativeElement.focus() }

    public check: ButtonProperties = { color: Color.SUCCESS, icon: Icon.CHECK };
    public submited = false;

    constructor(private service: ProjectService) { }

    public activeForm() {
        this.form = true;
        this.submited = false;
    }

    public hasError(model: NgModel) {
        if (this.submited && model.errors && model.errors['complete']) return Constants.EMPTY_NAME;
        else if (model.errors && model.errors['uniqueProject']) return model.errors['uniqueProject'];
        else return null;
    }

    public submit(item: NgForm) {
        this.submited = true;
        if (item.valid) {
            if (item.dirty) this.service.save({ id: this.id, ...item.value }).subscribe(b => {
                if (b) {
                    this.emitter.emit();
                    this.value = undefined;
                }
            });
            this.form = false;
        }
    }
}