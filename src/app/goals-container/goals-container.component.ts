import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-goals-container',
  templateUrl: './goals-container.component.html',
  styleUrls: ['./goals-container.component.css']
})
export class GoalsContainerComponent implements OnInit {

  constructor() { }

  @Input() goal: [] 

  ngOnInit() {
  }

}
