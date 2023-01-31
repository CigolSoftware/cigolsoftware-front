import { Component } from '@angular/core';
import { Form } from 'src/app/utilities/tools';
import { Skill } from 'src/app/utilities/data';
import { SkillService } from 'src/app/services/skill.service';

@Component({ selector: 'app-skill', templateUrl: './skill.page.html' })
export class SkillPage extends Form {
    public skill: Skill = { easy: 0, hard: 0, normal: 0, name: "" };

    constructor(protected override service: SkillService) { super(service) }

    public postSubmit(): void {
        this.skill = { easy: 0, hard: 0, normal: 0, name: '' };
        this.submited = false;
    }
}
