import { environment } from "src/environments/environment";
import { Constants } from "../utilities/tools";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Service } from "./service";
import { Skill } from "../utilities/data";

@Injectable({ providedIn: "root" })
export class SkillService extends Service<Skill> {

    protected override url?= environment.url + "skills/";

    constructor(protected override http: HttpClient) { super(http) }

    public override save(skill: Skill): Observable<Skill | undefined> { return super.save(skill) }
    protected saveMessage(skill: Skill, id?: number): string { return Constants.skillModified(skill, id ? 'actualizada' : 'creada') }

}