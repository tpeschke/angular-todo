import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoalHTTPService } from '../goal-http.service';
import { TaskHTTPService } from '../task-http.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private goalHTTPService: GoalHTTPService,
    private taskHTTPService: TaskHTTPService
  ) { }

  public board: any = {}
  public edit: boolean = false
  public goalEdit: boolean | number = false
  public taskEdit: boolean | number = false
  public newName: string = ''
  public goalList: Array<number> = []

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id')
    this.goalHTTPService.getBoard(id)
      .subscribe(board => {
        this.board = board
        this.goalList = this.board.goals.map(val => val.id)
      })
  }

  toggleEdit(e, id): void {
    e.stopPropagation()
    if (!this.edit && +id) {
      this.edit = true
    } else {
      let name = this.newName === '' ? this.board.name : this.newName
      this.goalHTTPService.changeBoard(+id, name, true)
        .subscribe(board => {
          this.board = board
          this.newName = ''
          this.edit = false
        })
    }
  }

  toggleGoalEdit = (e, id, newName): void => {
    e.stopPropagation()
    if (!this.goalEdit && +id) {
      this.goalEdit = +id
    } else {
      let name = this.newName === '' ? newName : this.newName
      this.goalHTTPService.changeGoal(+id, name)
        .subscribe(board => {
          this.board = board
          this.newName = ''
          this.goalEdit = false
        })
    }
  }

  toggleTaskEdit = (id, body): void => {
    if (!this.taskEdit && +id) {
      this.taskEdit = +id
    } else {
      this.taskHTTPService.changeTask({ id, ...body })
        .subscribe(board => {
          this.board = board
          this.taskEdit = false
        })
    }
  }

  changeName = (e): void => {
    e.stopPropagation()
    this.newName = e.target.value
  }

  addGoal(): void {
    this.goalHTTPService.addGoal(this.board.id)
      .subscribe(board => {
        this.board = board
      })
  }

  deleteGoal = (id): void => {
    this.goalHTTPService.deleteGoal(id)
      .subscribe(board => {
        this.board = board
      })
  }

  addTask = (id): void => {
    this.taskHTTPService.addTask(id)
      .subscribe(board => {
        this.board = board
      })
  }

  deleteTask = (id): void => {
    this.taskHTTPService.deleteTask(id)
      .subscribe(board => {
        this.board = board
      })
  }

  updateOrder = (body): void => {
    this.taskHTTPService.changeTask(body)
      .subscribe(board => {
        this.board = board
      })
  }
}