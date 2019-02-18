import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ViewModule } from './viewComponents/view.module'
import { HttpFacadeModule } from './httpFacade/http-facade.module'

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ViewModule,
    HttpFacadeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
