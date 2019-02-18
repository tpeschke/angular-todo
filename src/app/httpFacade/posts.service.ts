import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Board, Goal } from './classes'

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(
    private http: HttpClient
  ) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed`, error)
      return of(result as T)
    }
  }

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
}
