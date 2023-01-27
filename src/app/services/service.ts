import { catchError, map, of, Observable, finalize } from "rxjs";
import { Body } from "../utilities/data";
import { Color } from "../utilities/dto";
import { Constants, Utilities } from "../utilities/tools";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class Service<D> {

    protected url?: string;

    constructor(protected http: HttpClient) { }

    protected pipe<R>(observable: Observable<Body<R>>): Observable<Body<R> | undefined> {
        Utilities.wait(true);
        return observable.pipe(catchError(e => {
            Utilities.toast({ color: e.status === 400 ? Color.WARNING : Color.DANGER, message: e.status === 400 ? e.error.message : Constants.NETWORK_ERROR });
            return of(undefined);
        }), finalize(() => Utilities.wait(false)));
    }

    public exists(dto: D): Observable<boolean | undefined> { return this.pipe((this.http.post(this.url + 'exists', dto) as Observable<Body<boolean>>)).pipe(map(b => b?.response)) }

}