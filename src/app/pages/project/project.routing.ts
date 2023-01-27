import { ProjectPage } from "./project.page";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
      { component: ProjectPage, path: 'projects/list' },
      { path: '', pathMatch: 'full', redirectTo: '/projects/list' }
    ])],
    exports: [RouterModule]
  })
export class ProjectRoutingModule { }
