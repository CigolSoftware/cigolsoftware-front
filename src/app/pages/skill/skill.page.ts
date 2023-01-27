import { Component } from '@angular/core';
import { Form } from 'src/app/utilities/tools';
import { Skill } from 'src/app/utilities/data';

@Component({ selector: 'app-skill', templateUrl: './skill.page.html' })
export class SkillPage extends Form {
    public skill: Skill = { easy: 0, hard: 0, normal: 0, name: "" };
}
