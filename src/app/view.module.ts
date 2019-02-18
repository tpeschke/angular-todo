import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { ViewComponent } from './viewComponents/view/view.component';
import { GoalsContainerComponent } from './viewComponents/goals-container/goals-container.component';

@NgModule({
  declarations: [
    ViewComponent,
    GoalsContainerComponent
  ],
  imports: [
    CommonModule,
    DragDropModule
  ],
  exports: [
    ViewComponent,
    GoalsContainerComponent
  ]
})
export class ViewModule { }
