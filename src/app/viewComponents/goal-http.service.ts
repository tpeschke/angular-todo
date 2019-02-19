import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Board, SingleBoard, Goal } from '../viewComponents/classes'

@Injectable()
export class GoalHTTPService {
  constructor(
    private http: HttpClient
  ) { }

  getBoard(id): Observable<SingleBoard> {
    return this.http.get<SingleBoard>(`http://localhost:3434/board/${id}`)
  }

  getTeamMates(): Observable<string[]> {
    return this.http.get<string[]>(`http://localhost:3434/teamMates/1`)
  }

  addGoal(boardId): Observable<Goal[]> {
    return this.http.post<Goal[]>(`http://localhost:3434/addGoal`, { boardId })
  }

  changeBoard(id, name, single): Observable<Board[]> {
    return this.http.patch<Board[]>(`http://localhost:3434/changeBoard`, { id, name, single })
  }

  changeGoal(id, name): Observable<Board[]> {
    return this.http.patch<Board[]>(`http://localhost:3434/changeGoal`, { id, name })
  }

  deleteGoal(id): Observable<Board[]> {
    return this.http.delete<Board[]>(`http://localhost:3434/removeGoal/${id}`)
  }

}
