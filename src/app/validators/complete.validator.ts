import { forwardRef, Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

@Directive({
    providers: [{ multi: true, provide: NG_VALIDATORS, useExisting: forwardRef(() => CompleteValidator) }],
    selector: "[complete]"
})
export class CompleteValidator implements Validator {
    public validate(control: AbstractControl): ValidationErrors | null {
        return control.value && control.value.trim().length > 0 ? null : { complete: true }
    }
}