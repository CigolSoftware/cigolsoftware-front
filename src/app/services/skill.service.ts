import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Service } from "./service";

@Injectable({ providedIn: "root" })
export class SkillService extends Service<any> {

    protected override url?= environment.url + "skills/";

    constructor(protected override http: HttpClient) { super(http) }

}