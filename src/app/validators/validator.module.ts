import { CommonModule } from "@angular/common";
import { CompleteValidator } from "./complete.validator";
import { NgModule } from '@angular/core';

@NgModule({ declarations: [CompleteValidator], exports: [CompleteValidator], imports: [CommonModule] })
export class ValidatorModule { }