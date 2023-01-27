import { Constants } from "../utilities/tools";
import { Directive, Input } from "@angular/core";
import { NG_ASYNC_VALIDATORS } from "@angular/forms";
import { SkillService } from "../services/skill.service";
import { UniqueValidator } from "./unique.validator";

@Directive({
    providers: [{ multi: true, provide: NG_ASYNC_VALIDATORS, useExisting: SkillUniqueValidator }],
    selector: '[skillUnique]'
})
export class SkillUniqueValidator extends UniqueValidator<SkillService> {

    @Input('skillUnique') set uniqueProject(value: number | undefined) { this.id = value };

    protected override exists: string = Constants.EXISTS_SKILL;

    constructor(protected override service: SkillService) { super(service) }
}