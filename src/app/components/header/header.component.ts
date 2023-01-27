import { ButtonProperties } from "../button/button.component";
import { Color, Icon } from "src/app/utilities/dto";
import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from "@angular/core";
import { Platform } from "@angular/cdk/platform";
import { Utilities } from "src/app/utilities/tools";

@Component({ selector: 'app-header', templateUrl: './header.component.html' })
export class HeaderComponent {
    @Input() public title?: string;

    @Output() private emitter = new EventEmitter<string>();

    @ViewChild("menu") private menu?: ElementRef;

    public download: ButtonProperties = { color: Color.PRIMARY, icon: Icon.DOWNLOAD };
    public default: any;
    public installer = false;
    public ios = false;

    @HostListener('window:beforeinstallprompt', ['$event']) public preventDefault(e: any) {
        e.preventDefault();
        this.default = e;
        this.installer = true;
    }

    constructor(private platform: Platform) {
        if (this.platform.IOS && !(window.navigator as any)['standalone']) this.ios = true;
        Utilities.MENU.subscribe(() => this.menu?.nativeElement.click());
    }

    public install() {
        this.default.prompt();
        this.default.userChoice.then((c: any) => { if (c.outcome === 'accepted') this.installer = false });
    }

    public toSearch(event?: any) { this.emitter?.emit(event.target.value) }
}