import { catchError, map, of, Observable, finalize } from "rxjs";
import { Body, Dto } from "../utilities/data";
import { Color } from "../utilities/dto";
import { Constants, Utilities } from "../utilities/tools";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export abstract class Service<D extends Dto> {

    protected url?: string;

    constructor(protected http: HttpClient) { }

    protected abstract saveMessage(d: D, id?: number): string;

    protected pipe<R>(observable: Observable<Body<R>>): Observable<Body<R> | undefined> {
        Utilities.wait(true);
        return observable.pipe(catchError(e => {
            Utilities.toast({ color: e.status === 400 ? Color.WARNING : Color.DANGER, message: e.status === 400 ? e.error.message : Constants.NETWORK_ERROR });
            return of(undefined);
        }), finalize(() => Utilities.wait(false)));
    }

    public exists(dto: D): Observable<boolean | undefined> { return this.pipe((this.http.post(this.url + 'exists', dto) as Observable<Body<boolean>>)).pipe(map(b => b?.response)) }

    public save(dto: D): Observable<D | undefined> {
        return this.pipe((this.http.post(this.url + 'save', dto) as Observable<Body<D>>)).pipe(map(b => {
            if (b && b.code === 0) {
                Utilities.toast({ color: Color.SUCCESS, message: this.saveMessage(b.response, dto.id) });
                return b.response;
            } else return undefined;
        }));
    }
}