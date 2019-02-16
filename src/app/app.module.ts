import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ViewComponent } from './view/view.component';
import { AppRoutingModule } from './app-routing.module';
import { BoardsContainerComponent } from './boards-container/boards-container.component';
import { GoalsContainerComponent } from './goals-container/goals-container.component';
import { TasksContainerComponent } from './tasks-container/tasks-container.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ViewComponent,
    BoardsContainerComponent,
    GoalsContainerComponent,
    TasksContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
