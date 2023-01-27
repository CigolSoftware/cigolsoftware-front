import { Constants } from "../utilities/tools";
import { Directive, Input } from "@angular/core";
import { NG_ASYNC_VALIDATORS } from "@angular/forms";
import { ProjectService } from "../services/project.service";
import { UniqueValidator } from "./unique.validator";

@Directive({
    providers: [{ multi: true, provide: NG_ASYNC_VALIDATORS, useExisting: ProjectUniqueValidator }],
    selector: '[projectUnique]'
})
export class ProjectUniqueValidator extends UniqueValidator<ProjectService> {

    @Input('projectUnique') set uniqueProject(value: number | undefined) { this.id = value };

    protected override exists: string = Constants.EXISTS_PROJECT;

    constructor(protected override service: ProjectService) { super(service) }

}