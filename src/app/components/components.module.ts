import { ButtonComponent } from "./button/button.component";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { ItemComponent } from "./item/item.component";
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [ButtonComponent, HeaderComponent, ItemComponent],
    exports: [ButtonComponent, HeaderComponent, ItemComponent],
    imports: [CommonModule]
})
export class ComponentModule { }