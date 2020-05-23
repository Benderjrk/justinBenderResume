import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxPageScrollModule } from 'ngx-page-scroll';

import { AppComponent } from './app.component';
import { AppNavComponent } from './nav.component';
import { AppContactComponent } from './contact.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    AppNavComponent,
    AppContactComponent
  ],
  imports: [
    BrowserModule,
    NgxPageScrollModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
