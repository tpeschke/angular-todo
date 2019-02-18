import { Component, OnInit } from '@angular/core';
import { HttpfacadeService } from '../httpFacade/httpfacade.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private httpService: HttpfacadeService
  ) { }

  public boards: Array<any> = []
  public edit: boolean | number = false
  public newName: string = ''

  ngOnInit(): void {
    this.httpService.getsService.getBoards(1)
      .subscribe(boards => {
        this.boards = boards
      })
  }

  toggleEdit(e, id): void {
    e.stopPropagation()
    if (!this.edit && +id) {
      this.edit = id
    } else {
      let name = this.newName === '' ? this.boards.filter(val => val.id === id)[0].name : this.newName
      this.httpService.patchsService.changeBoard(+id, name, false)
        .subscribe(boards => {
          this.boards = boards
          this.edit = false
        })
    }
  }

  addBoard(): void {
    this.httpService.postsService.addBoard()
      .subscribe(boards => {
        this.boards = boards
      })
  }

  removeBoard(id, e): void {
    e.stopPropagation()
    this.httpService.deletesService.deleteBoard(1, id)
      .subscribe(boards => {
        this.boards = boards
      })
  }

  changeName(e): void {
    e.stopPropagation()
    this.newName = e.target.value
  }

}
