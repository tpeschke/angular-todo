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

  public boards = []
  public edit: any = 1
  public newName = ''

  ngOnInit() {
    this.httpService.getBoards(1)
      .subscribe(boards => {
        this.boards = boards
      })
  }

  toggleEdit(e, id) {
    e.stopPropagation()
    if (!this.edit && +id) {
      this.edit = id
    } else {
      this.httpService.changeBoard(+id, this.newName)
        .subscribe(boards => {
          this.boards = boards
          this.edit = false
        })
    }
  }

  addBoard() {
    this.httpService.addBoard()
      .subscribe(boards => {
        this.boards = boards
      })
  }

  removeBoard(id, e) {
    e.stopPropagation()
    this.httpService.deleteBoard(1, id)
      .subscribe(boards => {
        this.boards = boards
      })
  }

  changeName(e) {
    e.stopPropagation()
    this.newName = e.target.value
  }

}
