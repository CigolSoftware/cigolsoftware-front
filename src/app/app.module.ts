import { AppPage } from './app.page';
import { AppRoutingModule } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonComponent } from './components/button/button.component';
import { CommonModule } from '@angular/common';
import { CompleteValidator } from './validators/complete.validator';
import { EditableItemComponent } from './components/editableItem/editable-item.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ItemComponent } from './components/item/item.component';
import { NgModule, isDevMode } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { UniqueProjectValidator } from './validators/unique.validator';

@NgModule({
  bootstrap: [AppPage],
  declarations: [
    AppPage,
    ButtonComponent,
    CompleteValidator,
    EditableItemComponent,
    ItemComponent,
    UniqueProjectValidator
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: !isDevMode(), registrationStrategy: 'registerWhenStable:30000' })
  ]
})
export class AppModule { }
