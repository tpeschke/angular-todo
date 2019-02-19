import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private http: HttpClient
  ) { }

  public boards: any = []
  public edit: boolean | number = false
  public newName: string = ''

  ngOnInit(): void {
    this.http.get(`http://localhost:3434/teamBoards/1`)
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
      this.http.patch(`http://localhost:3434/changeBoard`, { id, name, single: false })
        .subscribe(boards => {
          this.boards = boards
          this.edit = false
        })
    }
  }

  addBoard(): void {
    this.http.post(`http://localhost:3434/addBoard`, { teamId: 1 })
      .subscribe(boards => {
        this.boards = boards
      })
  }

  removeBoard(id, e): void {
    e.stopPropagation()
    this.http.delete(`http://localhost:3434/removeBoard/1?id=${id}`)
      .subscribe(boards => {
        this.boards = boards
      })
  }

  changeName(e): void {
    e.stopPropagation()
    this.newName = e.target.value
  }

}
