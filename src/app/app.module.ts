import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxPageScrollModule } from 'ngx-page-scroll';

import { AppComponent } from './app.component';
import { AppNavComponent } from './nav.component';
import { AppContactComponent } from './contact.component';

@NgModule({
  declarations: [
    AppComponent,
    AppNavComponent,
    AppContactComponent
  ],
  imports: [
    BrowserModule,
    NgxPageScrollModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
