import { ButtonProperties } from './components/button/button.component';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Platform } from "@angular/cdk/platform";
import { Utilities } from './utilities/tools';

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

  public buttonCheck: ButtonProperties = { color: 'success', icon: 'check' };
  public buttonDownload: ButtonProperties = { color: 'primary', icon: 'download' };
  public buttonExclamation: ButtonProperties = { color: 'danger', icon: 'exclamation' };
  public buttonPlus: ButtonProperties = { color: 'success', icon: 'plus' };
  
  public default: any;
  public form = false;
  public ios = false;
  public installer = false;
  public message = '';
  public submited = false;

  constructor(private platform: Platform) {
    Utilities.TOAST.subscribe(t => {
      this.message = t;
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
    if (project.valid) this.form = false;
  }

  public hasError(model: NgModel) {
    if (this.submited && model.errors && model.errors['complete']) return 'El nombre no puede estar vacío.';
    else if (model.errors && model.errors['uniqueProject']) return 'Ya existe un proyecto con este nombre.';
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
