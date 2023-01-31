import { environment } from "src/environments/environment";
import { map, Observable } from "rxjs";
import { Body, Project } from "../utilities/data";
import { Color, Filter, Page } from "../utilities/dto";
import { Constants, Utilities } from "../utilities/tools";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Service } from "./service";

@Injectable({ providedIn: "root" })
export class ProjectService extends Service<Project> {

    protected override url = environment.url + 'projects/';

    constructor(protected override http: HttpClient) { super(http) }

    public override save(project: Project): Observable<Project | undefined> { return super.save(project) }
    
    public delete(project: Project): Observable<boolean | undefined> {
        return this.pipe((this.http.delete(this.url + 'delete/' + project.id) as Observable<Body<boolean>>)).pipe(map(b => {
            if (b && b.code === 0) {
                Utilities.toast({ color: Color.SUCCESS, message: Constants.proyectModified(project, 'eliminado') });
                return true;
            }
            return false;
        }))
    }

    public filter(filter: Filter): Observable<Page | undefined> {
        filter.size = filter.size && filter.size > 0 ? filter.size : undefined;
        return this.pipe((this.http.post(this.url + 'filter', filter) as Observable<Body<Page>>)).pipe(map(b => b?.response))
    }

    protected saveMessage(project: Project, id?: number): string { return Constants.proyectModified(project, id ? 'actualizado' : 'creado') }
}