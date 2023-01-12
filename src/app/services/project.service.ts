import { catchError, map, of, Observable, finalize } from "rxjs";
import { environment } from "src/environments/environment";
import { Body, Project } from "../utilities/data";
import { Color } from "../utilities/dto";
import { Constants, Utilities } from "../utilities/tools";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ProjectService {

    constructor(private http: HttpClient) { }

    private pipe<R>(observable: Observable<Body<R>>): Observable<Body<R> | undefined> {
        Utilities.wait(true);
        return observable.pipe(catchError(e => {
            Utilities.toast({ color: Color.DANGER, message: e.status === 400 ? e.error.message : Constants.NETWORK_ERROR });
            return of(undefined);
        }), finalize(() => Utilities.wait(false)));
    }

    public exists(name: string): Observable<boolean | undefined> {
        return this.pipe((this.http.post(environment.url + '/projects/exists', { name: name }) as Observable<Body<boolean>>)).pipe(map(b => b?.response));
    }

    public save(name: string): Observable<Body<Project> | undefined> {
        return this.pipe((this.http.post(environment.url + '/projects/save', { name: name }) as Observable<Body<Project>>));
    }

}