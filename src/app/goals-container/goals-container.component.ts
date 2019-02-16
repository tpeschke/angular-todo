import { Component, OnInit, Input } from '@angular/core';
import { HttpcallsService } from '../httpcalls.service';
import { transferArrayItem, moveItemInArray } from '@angular/cdk/drag-drop'

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
  @Input() goalList: Array<number>;

  public id: number = 0;
  public userDropdown = false;
  public statusDropdown = false;
  public mates = [];
  public newTask: any = {};

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
    if (e.previousContainer === e.container) {
      moveItemInArray(this.item.tasks, e.previousIndex, e.currentIndex)
      this.updateOrder({ id: this.id, update: true, newTasks: this.item.tasks})
    } else {
      console.log(e)
      transferArrayItem(e.previousContainer.data, e.container.data, e.previousIndex, e.currentIndex)
      this.updateOrder({ id: this.id, update: true, oldGoal: e.previousContainer.data.id, newGoal: e.container.data.id, oldIndex: e.previousIndex, newIndex: e.currentIndex})
    }
  }

  toggleUserDropdown() {
    this.userDropdown = !this.userDropdown
  }

  toggleStatusDropdown() {
    this.statusDropdown = !this.statusDropdown
  }

  changeUser(assignedUser) {
    this.newTask = Object.assign({}, this.newTask, { assignedUser })
  }

  changeStatus(status) {
    this.newTask = Object.assign({}, this.newTask, { status })
  }

  changeName(e) {
    this.newTask = Object.assign({}, this.newTask, { task: e.target.value })
  }

  saveChanges(id) {
    this.toggleTaskEdit(id, this.newTask)
    this.newTask = {}
  }

}
