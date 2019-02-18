import { Component, OnInit, Input } from '@angular/core';
import { HttpfacadeService } from 'src/app/httpFacade/httpfacade.service';

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.css']
})
export class TaskContainerComponent implements OnInit {

  constructor(
    private httpService: HttpfacadeService
  ) { }

  @Input() task: any;
  @Input() taskEdit: string | boolean;
  @Input() addTask: Function;
  @Input() deleteTask: Function;
  @Input() toggleTaskEdit: Function;
  @Input() updateOrder: Function;

  public newTask: any = {};
  public userDropdown: boolean | number = false;
  public statusDropdown: boolean | number = false;
  public mates: Array<string> = [];

  ngOnInit() {
    this.httpService.getsService.getTeamMates()
      .subscribe(mates => {
        this.mates = mates
      })
  }
 
  toggleUserDropdown(): void {
    this.userDropdown = !this.userDropdown
  }

  toggleStatusDropdown(): void {
    this.statusDropdown = !this.statusDropdown
  }

  saveChanges(id): void {
    // let {clearedUser, ...newTask} = this.newTask
    this.toggleTaskEdit(id, this.newTask)
    this.newTask = {}
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

}
