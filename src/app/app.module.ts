import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ViewComponent } from './view/view.component';
import { AppRoutingModule } from './app-routing.module';
import { GoalsContainerComponent } from './goals-container/goals-container.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ViewComponent,
    GoalsContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
