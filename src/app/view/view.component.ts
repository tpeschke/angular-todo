import { Component, OnInit } from '@angular/core';
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

  public board = {}

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id')
    this.httpService.getBoard(id)
      .subscribe(board => {
        this.board = board
      })
  }

}
