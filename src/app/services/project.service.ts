import { catchError, map, of, Observable, finalize } from "rxjs";
import { environment } from "src/environments/environment";
import { Body } from "../utilities/dto";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Utilities } from "../utilities/tools";

@Injectable({ providedIn: "root" })
export class ProjectService {

    constructor(private http: HttpClient) { }

    public exists(name: string): Observable<boolean | null> {
        Utilities.wait(true);
        return (this.http.post(environment.url + '/projects/exists', { name: name }) as Observable<Body<boolean>>).pipe(map(b => b.response), catchError(e => {
            Utilities.toast(e.status === 400 ? e.error.message : 'No logramos conectarnos con el servidor, revisa tu conexión o intentalo más tarde.');
            return of(null);
        }), finalize(() => Utilities.wait(false)));
    }

}