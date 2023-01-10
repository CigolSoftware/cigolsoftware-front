import { map, Observable } from "rxjs";
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from "@angular/forms";
import { Directive } from "@angular/core";
import { ProjectService } from "../services/project.service";

@Directive({
    providers: [{ multi: true, provide: NG_ASYNC_VALIDATORS, useExisting: UniqueProjectValidator }],
    selector: '[uniqueProject]'
})
export class UniqueProjectValidator implements AsyncValidator {

    constructor(private service: ProjectService) { }

    public validate(control: AbstractControl): Observable<ValidationErrors | null> {
        return this.service.exists(control.value).pipe(map(r => r ? { uniqueProject: true } : null));
    }
}