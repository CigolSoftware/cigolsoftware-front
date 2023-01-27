import { CommonModule } from "@angular/common";
import { ComponentModule } from "src/app/components/components.module";
import { EditableItemComponent } from "src/app/components/editableItem/editable-item.component";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { ProjectPage } from "./project.page";
import { ProjectRoutingModule } from "./project.routing";
import { RouterModule } from "@angular/router";
import { ProjectUniqueValidator } from "src/app/validators/project.unique.validator";
import { ValidatorModule } from "src/app/validators/validator.module";

@NgModule({
    declarations: [
        EditableItemComponent,
        ProjectPage,
        ProjectUniqueValidator
    ],
    exports: [
        EditableItemComponent,
        ProjectPage,
        ProjectUniqueValidator
    ],
    imports: [
        CommonModule,
        ComponentModule,
        FormsModule,
        ProjectRoutingModule,
        RouterModule,
        ValidatorModule
    ]
})
export class ProjectModule { }