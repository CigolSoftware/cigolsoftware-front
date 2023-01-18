import { catchError, map, of, Observable, finalize } from "rxjs";
import { environment } from "src/environments/environment";
import { Body, Project } from "../utilities/data";
import { Color, Filter, Page } from "../utilities/dto";
import { Constants, Utilities } from "../utilities/tools";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ProjectService {

    constructor(private http: HttpClient) { }

    private pipe<R>(observable: Observable<Body<R>>): Observable<Body<R> | undefined> {
        Utilities.wait(true);
        return observable.pipe(catchError(e => {
            Utilities.toast({ color: e.status === 400 ? Color.WARNING : Color.DANGER, message: e.status === 400 ? e.error.message : Constants.NETWORK_ERROR });
            return of(undefined);
        }), finalize(() => Utilities.wait(false)));
    }

    public delete(project: Project): Observable<boolean | undefined> {
        return this.pipe((this.http.delete(environment.url + '/projects/delete/' + project.id) as Observable<Body<boolean>>)).pipe(map(b => {
            if (b && b.code === 0) {
                Utilities.toast({ color: Color.SUCCESS, message: Constants.proyectModified(project, 'eliminado') });
                return true;
            }
            return false;
        }))
    }

    public exists(project: Project): Observable<boolean | undefined> { return this.pipe((this.http.post(environment.url + '/projects/exists', project) as Observable<Body<boolean>>)).pipe(map(b => b?.response)) }
    
    public filter(filter: Filter): Observable<Page | undefined> {
        filter.size = filter.size && filter.size > 0 ? filter.size : undefined;
        return this.pipe((this.http.post(environment.url + '/projects/filter', filter) as Observable<Body<Page>>)).pipe(map(b => b?.response))
    }

    public save(project: Project): Observable<Project | undefined> {
        return this.pipe((this.http.post(environment.url + '/projects/save', project) as Observable<Body<Project>>)).pipe(map(b => {
            if (b && b.code === 0) {
                Utilities.toast({ color: Color.SUCCESS, message: Constants.proyectModified(b.response, project.id ? 'actualizado' : 'creado') });
                return b.response;
            } else return undefined;
        }));
    }

}