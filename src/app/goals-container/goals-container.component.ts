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

  @Input() goal: any;
  @Input() goalEdit: string | boolean;
  @Input() taskEdit: string | boolean;
  @Input() deleteGoal: Function;
  @Input() addTask: Function;
  @Input() deleteTask: Function;
  @Input() toggleGoalEdit: Function;
  @Input() toggleTaskEdit: Function;
  @Input() updateOrder: Function;
  @Input() goalList: Array<number>;

  public userDropdown: boolean | number = false;
  public statusDropdown: boolean | number = false;
  public mates: Array<string> = [];
  public newTask: any = {};

  ngOnInit() {
    this.httpService.getTeamMates()
      .subscribe(mates => {
        this.mates = mates
      })
  }

  changeOrder(e): void {
    if (e.previousContainer === e.container) {
      moveItemInArray(this.goal.tasks, e.previousIndex, e.currentIndex)
      this.updateOrder({ id: e.previousContainer.data.tasks[e.previousIndex].id, newTasks: this.goal.tasks})
    } else {
      transferArrayItem(e.previousContainer.data, e.container.data, e.previousIndex, e.currentIndex)
      this.updateOrder({ id: e.previousContainer.data.tasks[e.previousIndex].id, oldGoal: e.previousContainer.data.id, newGoal: e.container.data.id, oldIndex: e.previousIndex, newIndex: e.currentIndex})
    }
  }

  toggleUserDropdown(): void {
    this.userDropdown = !this.userDropdown
  }

  toggleStatusDropdown(): void {
    this.statusDropdown = !this.statusDropdown
  }

  changeUser(assignedUser): void {
    let clearedUser = false
    if (!assignedUser) {
      clearedUser = true
    }
    this.newTask = Object.assign({}, this.newTask, { assignedUser, clearedUser })
  }

  changeStatus(status): void {
    this.newTask = Object.assign({}, this.newTask, { status })
  }

  changeName(e): void {
    this.newTask = Object.assign({}, this.newTask, { task: e.target.value })
  }

  saveChanges(id): void {
    let {clearedUser, ...newTask} = this.newTask
    this.toggleTaskEdit(id, newTask)
    this.newTask = {}
  }

}
