import { filter } from "rxjs";
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Icon, Toast } from './utilities/dto';
import { Utilities } from './utilities/tools';
import { NavigationEnd, Router } from "@angular/router";

@Component({ selector: 'app-root', templateUrl: './app.page.html' })
export class AppPage {

  @ViewChild("close") private close?: ElementRef;
  @ViewChild("loading") private loading?: ElementRef;
  @ViewChild("toast") private toast?: ElementRef;

  public menu: { active?: boolean, icon: Icon, link: string, name: string }[] = [
    { icon: Icon.SKIING, link: '/skills', name: 'Habilidades' },
    { icon: Icon.PROJECT_DIAGRAM, link: '/projects', name: 'Proyectos' }
  ]
  public toastMessage?: Toast;

  constructor(private router: Router) {
    Utilities.TOAST.subscribe(t => {
      this.toastMessage = t;
      this.toast?.nativeElement.click();
    });
    Utilities.WAIT.subscribe(w => (w ? this.loading : this.close)?.nativeElement.click());
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: any) => {
      this.menu.forEach(m => {
        if (e.url.includes(m.link)) m.active = true;
        else m.active = false;
      })
      if (document.getElementById('navbarVerticalCollapse')?.getAttribute('class')?.includes('show')) Utilities.menu();
    });
  }

}
