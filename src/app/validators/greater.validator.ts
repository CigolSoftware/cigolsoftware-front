import { forwardRef, Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { Constants } from "../utilities/tools";

@Directive({
    providers: [{ multi: true, provide: NG_VALIDATORS, useExisting: forwardRef(() => GreaterValidator) }],
    selector: "[greater]"
})
export class GreaterValidator implements Validator {
    @Input() public greater = [{ mayor: '', minor: '', minorName: '' }]

    public validate(control: AbstractControl): ValidationErrors | null {
        this.greater.forEach(g => {
            let mayor = control.get(g.mayor);
            if (mayor?.value <= control.get(g.minor)?.value) mayor?.setErrors({ greater: Constants.GREATER.replace('{0}', g.minorName) });
        })
        return null;
    }
}