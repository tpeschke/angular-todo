import { Component, OnInit, Input } from '@angular/core';
import { HttpcallsService } from '../httpcalls.service';

@Component({
  selector: 'app-goals-container',
  templateUrl: './goals-container.component.html',
  styleUrls: ['./goals-container.component.css']
})
export class GoalsContainerComponent implements OnInit {

  constructor(
    private httpService: HttpcallsService
  ) { }

  @Input() item: any;
  @Input() goalEdit: string | boolean;
  @Input() taskEdit: string | boolean;
  @Input() deleteGoal: Function;
  @Input() addTask: Function;
  @Input() deleteTask: Function;
  @Input() toggleGoalEdit: Function;
  @Input() toggleTaskEdit: Function;
  @Input() updateOrder: Function;

  public userDropdown = false;
  public statusDropdown = false;
  public mates = [];
  public newTask: any = {};
  public id: number = 0;

  ngOnInit() {
    this.httpService.getTeamMates()
      .subscribe(mates => {
        this.mates = mates
      })
  }

  captureId(id) {
    this.id = id
  }

  changeOrder(e) {
    this.updateOrder({ id: this.id, newIndex: e.currentIndex, oldIndex: e.previousIndex, update: true})
  }

  toggleUserDropdown() {
    this.userDropdown = !this.userDropdown
  }

  toggleStatusDropdown() {
    this.statusDropdown = !this.statusDropdown
  }

  changeUser(assignedUser) {
    this.newTask = Object.assign({}, this.newTask, {assignedUser})
  }

  changeStatus(status) {
    this.newTask = Object.assign({}, this.newTask, {status})
  }

  changeName(e) {
    this.newTask = Object.assign({}, this.newTask, {task: e.target.value})
  }

  saveChanges(id) {
    this.toggleTaskEdit(id, this.newTask)
    this.newTask = {}
  }

}
