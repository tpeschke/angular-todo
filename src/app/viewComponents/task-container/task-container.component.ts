import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.css']
})
export class TaskContainerComponent implements OnInit {

  constructor() { }

  @Input() task: any;
  @Input() taskEdit: string | boolean;
  @Input() addTask: Function;
  @Input() deleteTask: Function;
  @Input() toggleTaskEdit: Function;
  @Input() updateOrder: Function;

  ngOnInit() {
  }

}
