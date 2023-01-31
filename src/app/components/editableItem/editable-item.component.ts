import { ButtonProperties } from "../button/button.component";
import { Color, Icon } from "src/app/utilities/dto";
import { Component, Input, ElementRef, ViewChild, Output, EventEmitter } from "@angular/core";
import { Constants, Form } from "src/app/utilities/tools";
import { NgForm } from "@angular/forms";
import { Project } from "src/app/utilities/data";
import { ProjectService } from "src/app/services/project.service";

@Component({ selector: 'app-editable-item', templateUrl: './editable-item.component.html' })
export class EditableItemComponent extends Form {

    @Input() public button?: ButtonProperties;
    @Input() public form = false;
    @Input() public initials?: string;
    @Input() public placeholder?: string;
    @Input() public value?: string;
    @Input() public project?: Project;
    @Output() public emitter: EventEmitter<void> = new EventEmitter();
    @ViewChild("ivalue") set iValue(value: ElementRef) { if (value) value.nativeElement.focus() }

    public check: ButtonProperties = { color: Color.SUCCESS, icon: Icon.CHECK };
    public delete: ButtonProperties = { color: Color.DANGER, icon: Icon.TRASH };

    constructor(protected override service: ProjectService) { super(service) }

    public override submit(form: NgForm) { super.submit(form, this.project?.id) }

    public activeForm() {
        this.form = true;
        this.submited = false;
    }

    public deleteProject() {
        this.service.delete(this.project || Constants.PROJECT_NULL).subscribe(b => { if (b) this.emitter.emit() });
    }

    public postSubmit(): void {
        this.emitter.emit();
        this.value = undefined;
        this.form = false;
    }

}