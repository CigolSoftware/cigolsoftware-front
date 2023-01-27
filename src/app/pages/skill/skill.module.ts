import { CommonModule } from "@angular/common";
import { ComponentModule } from "src/app/components/components.module";
import { FormsModule } from "@angular/forms";
import { GreaterValidator } from "src/app/validators/greater.validator";
import { NgModule } from "@angular/core";
import { PositiveValidator } from "src/app/validators/positive.validator";
import { RouterModule } from "@angular/router";
import { SkillPage } from "./skill.page";
import { SkillRoutingModule } from "./skill.routing";
import { SkillUniqueValidator } from "src/app/validators/skill.unique.validator";
import { ValidatorModule } from "src/app/validators/validator.module";

@NgModule({
    declarations: [
        GreaterValidator,
        SkillPage,
        SkillUniqueValidator,
        PositiveValidator
    ],
    exports: [
        GreaterValidator,
        SkillPage,
        SkillUniqueValidator,
        PositiveValidator
    ],
    imports: [
        CommonModule,
        ComponentModule,
        FormsModule,
        SkillRoutingModule,
        RouterModule,
        ValidatorModule
    ]
})
export class SkillModule { }