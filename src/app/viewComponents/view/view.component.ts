import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpfacadeService } from 'src/app/httpFacade/httpfacade.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  constructor(
    private httpService: HttpfacadeService,
    private route: ActivatedRoute
  ) { }

  public board: any = {}
  public edit: boolean = false
  public goalEdit: boolean | number = false
  public taskEdit: boolean | number = false
  public newName: string = ''
  public goalList: Array<number> = []

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id')
    this.httpService.getsService.getBoard(id)
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
      this.httpService.patchsService.changeBoard(+id, name, true)
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
      this.httpService.patchsService.changeGoal(+id, name)
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
      this.httpService.patchsService.changeTask({ id, ...body })
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
    this.httpService.postsService.addGoal(this.board.id)
      .subscribe(board => {
        this.board = board
      })
  }

  deleteGoal = (id): void => {
    this.httpService.deletesService.deleteGoal(id)
      .subscribe(board => {
        this.board = board
      })
  }

  addTask = (id): void => {
    this.httpService.postsService.addTask(id)
      .subscribe(board => {
        this.board = board
      })
  }

  deleteTask = (id): void => {
    this.httpService.deletesService.deleteTask(id)
      .subscribe(board => {
        this.board = board
      })
  }

  updateOrder = (body): void => {
    this.httpService.patchsService.changeTask(body)
      .subscribe(board => {
        this.board = board
      })
  }
}