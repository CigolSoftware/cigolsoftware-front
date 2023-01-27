import { ButtonProperties } from 'src/app/components/button/button.component';
import { Color, Icon } from 'src/app/utilities/dto';
import { Component, } from '@angular/core';
import { Project } from 'src/app/utilities/data';
import { ProjectService } from 'src/app/services/project.service';

@Component({ selector: 'app-project', templateUrl: './project.page.html' })
export class ProjectPage {

  private page = 0;

  public id?: number;
  public plus: ButtonProperties = { color: Color.SUCCESS, icon: Icon.PLUS };
  public projects: Project[] = [];
  public total: number = 0;
  public value?: string;

  constructor(private service: ProjectService) { this.filter() }

  public filter(size?: number) {
    this.id = undefined;
    this.service.filter({ page: size ? 0 : this.page, size: size, value: this.value }).subscribe(p => {
      if (p) {
        if (size || this.page === 0) this.projects = p.projects;
        else p.projects.forEach(p => { if (!this.projects.find(r => p.id === r.id)) this.projects.push(p) });
        if (p.total !== this.projects.length && !size) this.page++;
        this.total = p.total;
      }
    })
  }

  public search(value?: string) {
    this.page = 0;
    this.value = value;
    this.filter();
  }

  public initials(name: string) { return name.split(' ').map(s => s[0]).reduce((a, b) => a + b).substring(0, 2) }
}
