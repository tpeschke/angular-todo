import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Board, SingleBoard, Goal } from './classes'

@Injectable({
  providedIn: 'root'
})

export class HttpcallsService {

  constructor(
    private http: HttpClient
  ) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed`, error)
      return of(result as T)
    }
  }

  getBoards(id): Observable<Board[]> {
    return this.http.get<Board[]>(`http://localhost:3434/teamBoards/${id}`)
      .pipe(
        tap(_ => console.log, catchError(this.handleError('get boards by team', [])))
      )
  }

  getBoard(id): Observable<SingleBoard> {
    return this.http.get<SingleBoard>(`http://localhost:3434/board/${id}`)
      .pipe(
        tap(_ => console.log, catchError(this.handleError('get board info', [])))
      )
  }

  getTeamMates(): Observable<string[]> {
    return this.http.get<string[]>(`http://localhost:3434/teamMates/1`)
      .pipe(
        tap(_ => console.log, catchError(this.handleError('get board info', [])))
      )
  }

  // POSTS

  addBoard(): Observable<Board[]> {
    return this.http.post<Board[]>(`http://localhost:3434/addBoard`, { teamId: 1 })
      .pipe(
        tap(_ => console.log, catchError(this.handleError('add board', [])))
      )
  }

  addGoal(boardId): Observable<Goal[]> {
    return this.http.post<Goal[]>(`http://localhost:3434/addGoal`, { boardId })
      .pipe(
        tap(_ => console.log, catchError(this.handleError('add goal', [])))
      )
  }

  addTask(goalId): Observable<Board[]> {
    return this.http.post<Board[]>(`http://localhost:3434/addTask`, { goalId })
      .pipe(
        tap(_ => console.log, catchError(this.handleError('add board', [])))
      )
  }

  // PATCH

  changeBoard(id, name, single): Observable<Board[]> {
    return this.http.patch<Board[]>(`http://localhost:3434/changeBoard`, { id, name, single })
      .pipe(
        tap(_ => console.log, catchError(this.handleError('change board', [])))
      )
  }

  changeGoal(id, name): Observable<Board[]> {
    return this.http.patch<Board[]>(`http://localhost:3434/changeGoal`, { id, name })
      .pipe(
        tap(_ => console.log, catchError(this.handleError('change goal', [])))
      )
  }

  changeTask(body): Observable<Board[]> {
    return this.http.patch<Board[]>(`http://localhost:3434/changeTask`, { body })
      .pipe(
        tap(_ => console.log, catchError(this.handleError('change task', [])))
      )
  }

  // DELETE

  deleteBoard(teamId, boardId): Observable<Board[]> {
    return this.http.delete<Board[]>(`http://localhost:3434/removeBoard/${teamId}?id=${boardId}`)
      .pipe(
        tap(_ => console.log, catchError(this.handleError('delete board', [])))
      )
  }

  deleteGoal(id): Observable<Board[]> {
    return this.http.delete<Board[]>(`http://localhost:3434/removeGoal/${id}`)
      .pipe(
        tap(_ => console.log, catchError(this.handleError('delete goal', [])))
      )
  }

  deleteTask(id): Observable<Board[]> {
    return this.http.delete<Board[]>(`http://localhost:3434/removeTask/${id}`)
      .pipe(
        tap(_ => console.log, catchError(this.handleError('delete task', [])))
      )
  }
}
