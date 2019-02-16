import { Component, OnInit, Output } from '@angular/core';
import { HttpcallsService } from '../httpcalls.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  constructor(
    private httpService: HttpcallsService,
    private route: ActivatedRoute
  ) { }

  public board: any = {}
  public edit: boolean = false
  public goalEdit: any = false
  public taskEdit: any = false
  public newName: string = ''
  public goalList: Array<number> = []

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id')
    this.httpService.getBoard(id)
      .subscribe(board => {
        this.board = board
        this.goalList = this.board.goals.map(val => val.id)
      })
  }

  toggleEdit(e, id) {
    e.stopPropagation()
    if (!this.edit && +id) {
      this.edit = true
    } else {
      let name = this.newName === '' ? this.board.name : this.newName
      this.httpService.changeBoard(+id, name)
        .subscribe(_ => {
          this.httpService.getBoard(+id)
            .subscribe(board => {
              this.board = board
              this.newName = ''
              this.edit = false
            })
        })
    }
  }

  toggleGoalEdit = (e, id, newName) => {
    e.stopPropagation()
    if (!this.goalEdit && +id) {
      this.goalEdit = +id
    } else {
      let name = this.newName === '' ? newName : this.newName
      this.httpService.changeGoal(+id, name)
        .subscribe(_ => {
          this.httpService.getBoard(+id)
            .subscribe(board => {
              this.board = board
              this.newName = ''
              this.goalEdit = false
            })
        })
    }
  }

  toggleTaskEdit = (id, body) => {
    if (!this.taskEdit && +id) {
      this.taskEdit = +id
    } else {
      this.httpService.changeTask({ id, ...body })
        .subscribe(boardId => {
          this.httpService.getBoard(boardId[0])
            .subscribe(board => {
              this.board = board
              this.taskEdit = false
            })
        })
    }
  }

  changeName = (e) => {
    e.stopPropagation()
    this.newName = e.target.value
  }

  addGoal() {
    this.httpService.addGoal(this.board.id)
      .subscribe(board => {
        this.board = board
      })
  }

  deleteGoal = (id) => {
    this.httpService.deleteGoal(id)
      .subscribe(board => {
        this.board = board
      })
  }

  addTask = (id) => {
    this.httpService.addTask(id)
      .subscribe(board => {
        this.board = board
      })
  }

  deleteTask = (id) => {
    this.httpService.deleteTask(id)
      .subscribe(board => {
        this.board = board
      })
  }

  updateOrder = (body) => {
    this.httpService.changeTask(body)
      .subscribe(boardId => {
        this.httpService.getBoard(boardId[0])
          .subscribe(board => {
            this.board = board
          })
      })
  }

}
