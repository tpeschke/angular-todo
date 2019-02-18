import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Board } from './classes'

@Injectable({
  providedIn: 'root'
})
export class DeletesService {
  constructor(
    private http: HttpClient
  ) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed`, error)
      return of(result as T)
    }
  }

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
