import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-goals-container',
  templateUrl: './goals-container.component.html',
  styleUrls: ['./goals-container.component.css']
})
export class GoalsContainerComponent implements OnInit {

  constructor( ) { }

  @Input() item: any;
  @Input() goalEdit: string | boolean;
  @Input() taskEdit: string | boolean;
  @Input() deleteGoal: Function;
  @Input() addTask: Function;
  @Input() deleteTask: Function;
  @Input() toggleGoalEdit: Function;
  @Input() changeName: Function

  ngOnInit() {

  }

}
