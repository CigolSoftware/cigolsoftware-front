import { forwardRef, Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { Constants } from "../utilities/tools";

@Directive({
    providers: [{ multi: true, provide: NG_VALIDATORS, useExisting: forwardRef(() => PositiveValidator) }],
    selector: "[positive]"
})
export class PositiveValidator implements Validator {
    public validate(control: AbstractControl): ValidationErrors | null {
        return control.value && control.value >= 0 ? null : { positive: Constants.POSITIVE }
    }
}