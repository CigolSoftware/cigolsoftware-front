import { SkillPage } from "./skill.page";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
      { component: SkillPage, path: 'skills/list' },
      { path: '', pathMatch: 'full', redirectTo: '/skills/list' }
    ])],
    exports: [RouterModule]
  })
export class SkillRoutingModule { }
