import { AppPage } from './app.page';
import { AppRoutingModule } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, isDevMode } from '@angular/core';
import { ProjectModule } from './pages/project/project.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SkillModule } from './pages/skill/skill.module';

@NgModule({
  bootstrap: [AppPage],
  declarations: [AppPage],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ProjectModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: !isDevMode(), registrationStrategy: 'registerWhenStable:30000' }),
    SkillModule
  ]
})
export class AppModule { }
