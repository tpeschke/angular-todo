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

  ngOnInit() {
    this.httpService.getBoards(1)
      .subscribe(boards => {
        this.boards = boards
      })
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

}
