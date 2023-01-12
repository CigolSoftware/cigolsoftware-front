import { ButtonProperties } from './components/button/button.component';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Color, Icon, Toast } from './utilities/dto';
import { Constants, Utilities } from './utilities/tools';
import { NgForm, NgModel } from '@angular/forms';
import { Platform } from "@angular/cdk/platform";
import { ProjectService } from './services/project.service';

@Component({ selector: 'app-root', templateUrl: './app.page.html' })
export class AppPage {

  @ViewChild("close")
  private close: ElementRef | undefined;

  @ViewChild("loading")
  private loading: ElementRef | undefined;

  @ViewChild("toast")
  private toast: ElementRef | undefined;

  @ViewChild("iname")
  set iname(name: ElementRef) { if (name) name.nativeElement.focus() }

  public buttonCheck: ButtonProperties = { color: Color.SUCCESS, icon: Icon.CHECK };
  public buttonDownload: ButtonProperties = { color: Color.PRIMARY, icon: Icon.DOWNLOAD };
  public buttonExclamation: ButtonProperties = { color: Color.DANGER, icon: Icon.EXCLAMATION };
  public buttonPlus: ButtonProperties = { color: Color.SUCCESS, icon: Icon.PLUS };

  public default: any;
  public form = false;
  public ios = false;
  public installer = false;
  public toastMessage?: Toast;
  public submited = false;

  constructor(private platform: Platform, private service: ProjectService) {
    Utilities.TOAST.subscribe(t => {
      this.toastMessage = t;
      this.toast?.nativeElement.click();
    });
    Utilities.WAIT.subscribe(w => (w ? this.loading : this.close)?.nativeElement.click());
    if (this.platform.IOS && !(window.navigator as any)['standalone']) this.ios = true;
  }

  public activeForm() {
    this.form = true;
    this.submited = false;
  }

  public create(project: NgForm) {
    this.submited = true;
    if (project.valid) {
      this.service.save(project.value.name).subscribe(b => {
        if (b && b.code === 0) {
          Utilities.toast({ color: Color.SUCCESS, message: Constants.proyectSaved(b.response) });
          this.form = false;
        } else if (b && b.code === 1) Utilities.toast({ color: Color.WARNING, message: Constants.PROJECT_EXIST });
      })
    }
  }

  public hasError(model: NgModel) {
    if (this.submited && model.errors && model.errors['complete']) return Constants.EMPTY_NAME;
    else if (model.errors && model.errors['uniqueProject']) return model.errors['uniqueProject'];
    else return null;
  }

  public install() {
    this.default.prompt();
    this.default.userChoice.then((c: any) => { if (c.outcome === 'accepted') this.installer = false });
  }

  @HostListener('window:beforeinstallprompt', ['$event'])
  public preventDefault(e: any) {
    e.preventDefault();
    this.default = e;
    this.installer = true;
  }

}
