import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppRoutingModule } from '../app-routing.module';
import { TaskHTTPService } from './task-http.service';
import { GoalHTTPService } from './goal-http.service'

import { ViewComponent } from './view/view.component';
import { GoalsContainerComponent } from './goals-container/goals-container.component';
import { TaskContainerComponent } from './task-container/task-container.component';

@NgModule({
  declarations: [
    ViewComponent,
    GoalsContainerComponent,
    TaskContainerComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    AppRoutingModule
  ],
  providers: [
    TaskHTTPService,
    GoalHTTPService
  ],
  exports: [
    ViewComponent,
    GoalsContainerComponent,
    TaskContainerComponent
  ]
})
export class ViewModule { }
