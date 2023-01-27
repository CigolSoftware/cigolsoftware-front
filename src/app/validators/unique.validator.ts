import { map, Observable } from "rxjs";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Constants } from "../utilities/tools";
import { Service } from "../services/service";

export class UniqueValidator<S extends Service<any>> implements AsyncValidator {

    protected id?: number;
    protected exists: string = 'Mensaje sin asignar';

    constructor(protected service: S) { }

    public validate(control: AbstractControl): Observable<ValidationErrors | null> {
        return this.service.exists({ id: this.id, name: control.value }).pipe(map(r => {
            if (r === undefined) return { unique: Constants.NETWORK_ERROR };
            return r ? { unique: this.exists } : null;
        }));
    }
}