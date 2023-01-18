import { ButtonProperties } from './components/button/button.component';
import { Color, Icon, Toast } from './utilities/dto';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Utilities } from './utilities/tools';
import { Platform } from "@angular/cdk/platform";
import { Project } from './utilities/data';
import { ProjectService } from './services/project.service';

@Component({ selector: 'app-root', templateUrl: './app.page.html' })
export class AppPage {

  @ViewChild("close") private close: ElementRef | undefined;
  @ViewChild("loading") private loading: ElementRef | undefined;
  @ViewChild("toast") private toast: ElementRef | undefined;

  private page = 0;

  public default: any;
  public download: ButtonProperties = { color: Color.PRIMARY, icon: Icon.DOWNLOAD };
  public id?: number;
  public ios = false;
  public installer = false;
  public plus: ButtonProperties = { color: Color.SUCCESS, icon: Icon.PLUS };
  public projects: Project[] = []
  public total: number = 0;
  public toastMessage?: Toast;
  public value?: string;

  @HostListener('window:beforeinstallprompt', ['$event']) public preventDefault(e: any) {
    e.preventDefault();
    this.default = e;
    this.installer = true;
  }

  constructor(private platform: Platform, private service: ProjectService) {
    if (this.platform.IOS && !(window.navigator as any)['standalone']) this.ios = true;
    this.filter()
    Utilities.TOAST.subscribe(t => {
      this.toastMessage = t;
      this.toast?.nativeElement.click();
    });
    Utilities.WAIT.subscribe(w => (w ? this.loading : this.close)?.nativeElement.click());
  }

  public search(value?: string) {
    this.page = 0;
    this.value = value;
    this.filter();
  }

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

  public initials(name: string) { return name.split(' ').map(s => s[0]).reduce((a, b) => a + b).substring(0, 2) }

  public install() {
    this.default.prompt();
    this.default.userChoice.then((c: any) => { if (c.outcome === 'accepted') this.installer = false });
  }

  public searchField(event: any) { this.search(event.target.value) }

}
