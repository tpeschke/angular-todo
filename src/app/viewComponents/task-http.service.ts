import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Board, SingleBoard, Goal } from '../viewComponents/classes'

@Injectable()
export class TaskHTTPService {
  constructor(
    private http: HttpClient
  ) { }

  addTask(goalId): Observable<Board[]> {
    return this.http.post<Board[]>(`http://localhost:3434/addTask`, { goalId })
  }

  changeTask(body): Observable<Board[]> {
    return this.http.patch<Board[]>(`http://localhost:3434/changeTask`, { body })
  }

  deleteTask(id): Observable<Board[]> {
    return this.http.delete<Board[]>(`http://localhost:3434/removeTask/${id}`)
  }
}
