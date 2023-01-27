import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot([
    { loadChildren: () => import('src/app/pages/project/project.module').then(m => m.ProjectModule), path: 'projects' },
    { loadChildren: () => import('src/app/pages/skill/skill.module').then(m => m.SkillModule), path: 'skills' },
    { path: '', pathMatch: 'full', redirectTo: '/skills/list' }
  ])]
})
export class AppRoutingModule { }
