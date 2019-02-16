import { Component, OnInit } from '@angular/core';
import { HttpcallsService } from '../httpcalls.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private httpService: HttpcallsService
  ) { }

  public boards: Array<any> = []
  public edit: Boolean | number = false
  public newName: string = ''

  ngOnInit(): void {
    this.httpService.getBoards(1)
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
      this.httpService.changeBoard(+id, name)
        .subscribe(boards => {
          this.boards = boards
          this.edit = false
        })
    }
  }

  addBoard(): void {
    this.httpService.addBoard()
      .subscribe(boards => {
        this.boards = boards
      })
  }

  removeBoard(id, e): void {
    e.stopPropagation()
    this.httpService.deleteBoard(1, id)
      .subscribe(boards => {
        this.boards = boards
      })
  }

  changeName(e): void {
    e.stopPropagation()
    this.newName = e.target.value
  }

}
